import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER_INFO, REST_USER_INFO,
  RECEIVE_SHOP_INFO, RECEIVE_SHOP_GOODS, RECEIVE_SHOP_RATINGS} from './mutation-type'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [REST_USER_INFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_SHOP_INFO] (state, {data}) {
    state.shopInfo = data
  },
  [RECEIVE_SHOP_GOODS] (state, {data}) {
    state.shopGoods = data
  },
  [RECEIVE_SHOP_RATINGS] (state, {data}) {
    state.shopRatings = data
  }
}
