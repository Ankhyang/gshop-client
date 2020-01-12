/* eslint-disable no-tabs */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import {
	reqAddress,
	reqFoodsCategory,
	reqShops,
	reqUserInfo,
	reqLogOut,
	reqShopInfo,
	reqShopGoods,
	reqShopRatings
} from '../api'
import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USER_INFO,
	REST_USER_INFO,
	RECEIVE_SHOP_INFO,
	RECEIVE_SHOP_GOODS,
	RECEIVE_SHOP_RATINGS
} from './mutation-type'

export default {
	// 获取地址
	async getAddress({ commit, state }) {
		// 获取数据
		const geohash = state.latitude + ',' + state.longitude
		const result = await reqAddress(geohash)
		const { data, code } = result.data
		if (code === 0) {
			const address = data
			// commit
			commit(RECEIVE_ADDRESS, { address })
		}
	},

	// 获取食品分类数组
	async getCategorys({ commit }) {
		const result = await reqFoodsCategory()
		const { data, code } = result.data
		if (code === 0) {
			const categorys = data
			commit(RECEIVE_CATEGORYS, { categorys })
		}
	},

	// 根据经纬度获取商铺列表
	async getShops({ commit, state }) {
		const { longitude, latitude } = state
		const result = await reqShops(longitude, latitude)
		const { data, code } = result.data
		if (code === 0) {
			const shops = data
			commit(RECEIVE_SHOPS, { shops })
		}
	},

	// 存取用户信息
	saveUserInfo({ commit }, userInfo) {
		commit(RECEIVE_USER_INFO, { userInfo })
	},

	// 获取用户信息
	async getUserInfo({ commit }) {
		const result = await reqUserInfo()
		if (result.data.code === 0) {
			const userInfo = result.data.data.data
			commit(RECEIVE_USER_INFO, { userInfo })
		}
	},

	// 退出登录
	async logout({ commit }) {
		const result = await reqLogOut()
		if (result.data.code === 0) {
			commit(REST_USER_INFO)
		}
	},

	async getShopInfo({ commit }) {
		const result = await reqShopInfo()
		const { code, data } = result.data
		if (code === 0) {
			commit(RECEIVE_SHOP_INFO, { data })
		}
	},

	async getShopGoods({ commit }) {
		const result = await reqShopGoods()
		const { code, data } = result.data
		if (code === 0) {
			commit(RECEIVE_SHOP_GOODS, { data })
		}
	},

	async getShopRatings({ commit }) {
		const result = await reqShopRatings()
		const { code, data } = result.data
		if (code === 0) {
			commit(RECEIVE_SHOP_RATINGS, { data })
		}
	}
}
