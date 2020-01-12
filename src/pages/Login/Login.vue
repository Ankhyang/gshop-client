<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
          >短信登录</a>
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
          >密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone: rightPhone }"
                @click.prevent="getCode"
              >
                {{
                  computedTime > 0 ? `已发送（${computedTime}）s` : "获取验证码"
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                v-model="code"
                placeholder="验证码"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-if="showPwd"
                  v-model="password"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-else
                  v-model="password"
                />
                <div
                  class="switch_button off"
                  @click="showPwd = !showPwd"
                  :class="{ on: showPwd, off: !showPwd }"
                >
                  <div
                    class="switch_circle"
                    :class="{ right: showPwd }"
                  ></div>
                  <span class="switch_text">{{ showPwd ? "abc" : "..." }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  ref="captcha"
                  @click="getCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a
          href="javascript:;"
          class="about_us"
        >关于我们</a>
      </div>
      <a
        href="javascript:"
        class="go_back"
        @click="$router.back()"
      >
        <i class="iconfont icon-jiantouzuo"></i>
      </a>
    </div>
    <AlertTip
      :alertText="alertText"
      @closeTip="closeTip"
      v-show="alertShow"
    />
  </section>
</template>

<script type="text/javascript">
import AlertTip from '../../components/AlertTip/AlertTip'
import { reqSendCode, reqLoginPwd, reqLoginSMS } from '../../api'
export default {
  components: { AlertTip },
  data () {
    return {
      loginWay: true, // 默认短信登录
      phone: '',
      computedTime: 0, // 倒计时数字
      showPwd: false, // 是否显示密码
      password: '', // 用户密码
      code: '', // 手机验证码
      name: '', // 用户名
      captcha: '', // 用户验证码
      alertText: '', // 提示文字
      alertShow: false // 是否显示提示框
    }
  },
  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    async getCode () {
      if (this.computedTime === 0) {
        // 倒计时
        this.computedTime = 30
        this.intervalId = setInterval(() => {
          this.computedTime--
          if (this.computedTime === 0) {
            clearInterval(this.intervalId)
            this.intervalId = null
          }
        }, 1000)
        // 获取验证码
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          // 停止计时
          clearInterval(this.intervalId)
          this.showAlert('获取验证码失败')
          this.intervalId = null
        }
      }
    },
    showAlert (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    // 关闭提示框
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },
    // 登录
    async login () {
      let { loginWay } = this
      let result
      if (loginWay) {
        // 手机短信登录
        let { phone, code } = this
        if (!phone) {
          // 手机号不能为空
          this.showAlert('手机号不能为空')
        } else if (!code) {
          // 验证码不能为空
          this.showAlert('验证码不能为空')
        }
        // 手机登录
        result = await reqLoginSMS({ phone, code })
      } else {
        let { name, password, captcha } = this
        if (!name) {
          // 用户名不能为空
          this.showAlert('用户名不能为空')
        } else if (!password) {
          // 密码不能为空
          this.showAlert('密码不能为空')
        } else if (!captcha) {
          // 验证码不能为空
          this.showAlert('验证码不能为空')
        }
        // 用户名验证登录
        result = await reqLoginPwd({ name, password, captcha })
      }
      if (result.data.data !== undefined) {
        this.$store.dispatch('saveUserInfo', result.data.data)
        // 跳转到个人中心界面s
        this.$router.replace('/profile')
      }
    },
    // 获取图形验证码
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
*
  touch-action pan-y
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(30px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
