import {reqAddress, reqFoodsCategory, reqShops} from '../api'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutation-type'

export default {
  // 获取地址
  async getAddress ({commit, state}) {
    // 获取数据
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    const {data, code} = result.data
    if (code === 0) {
      const address = data
      // commit
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 获取食品分类数组
  async getCategorys ({commit}) {
    const result = await reqFoodsCategory()
    const {data, code} = result.data
    if (code === 0) {
      const categorys = data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  // 根据经纬度获取商铺列表
  async getShops ({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    const {data, code} = result.data
    if (code === 0) {
      const shops = data
      commit(RECEIVE_SHOPS, {shops})
    }
  }

}
