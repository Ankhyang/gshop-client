/* eslint-disable space-before-function-paren */
/* eslint-disable no-tabs */
/* eslint-disable indent */
import Vue from 'vue'
import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USER_INFO,
	REST_USER_INFO,
	RECEIVE_SHOP_INFO,
	RECEIVE_SHOP_GOODS,
	RECEIVE_SHOP_RATINGS,
	INCREMENT_FOOD_COUNT,
	DECREMENT_FOOD_COUNT,
	CLEAR_CART_FOODS,
	SEARCH_SHOP_LIST
} from './mutation-type'

export default {
	[RECEIVE_ADDRESS](state, { address }) {
		state.address = address
	},
	[RECEIVE_CATEGORYS](state, { categorys }) {
		state.categorys = categorys
	},
	[RECEIVE_SHOPS](state, { shops }) {
		state.shops = shops
	},
	[RECEIVE_USER_INFO](state, { userInfo }) {
		state.userInfo = userInfo
	},
	[REST_USER_INFO](state) {
		state.userInfo = {}
	},
	[RECEIVE_SHOP_INFO](state, { data }) {
		state.shopInfo = data
	},
	[RECEIVE_SHOP_GOODS](state, { data }) {
		state.shopGoods = data
	},
	[RECEIVE_SHOP_RATINGS](state, { data }) {
		state.shopRatings = data
	},
	[INCREMENT_FOOD_COUNT](state, { food }) {
		if (!food.count) {
			Vue.set(food, 'count', 1)
			state.cartFoods.push(food)
		} else {
			food.count++
		}
	},
	[DECREMENT_FOOD_COUNT](state, { food }) {
		if (food.count) {
			food.count--
			if (food.count === 0) {
				state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
			}
		}
	},
	[CLEAR_CART_FOODS](state) {
		// 清除count
		state.cartFoods.forEach((food) => (food.count = 0))
		// 清空数组
		state.cartFoods = []
	},
	[SEARCH_SHOP_LIST](state, { data }) {
		state.searchShopList = data
	}
}
