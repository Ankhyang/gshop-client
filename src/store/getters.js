/* eslint-disable space-before-function-paren */
/* eslint-disable no-tabs */
/* eslint-disable indent */
export default {
	totalCount(state) {
		return state.cartFoods.reduce((preValue, food) => preValue + food.count, 0)
	},
	totalPrice(state) {
		return state.cartFoods.reduce((preValue, food) => preValue + food.count * food.price, 0)
	},
	positiveSize(state) {
		return state.shopRatings.reduce((preValue, rate) => preValue + (rate.rateType === 0 ? 1 : 0), 0)
	}
}
