/* eslint-disable space-before-function-paren */
/* eslint-disable no-tabs */
/* eslint-disable indent */
export default {
	totalCount(state) {
		return state.cartFoods.reduce((preValue, food) => preValue + food.count, 0)
	},
	totalPrice(state) {
		return state.cartFoods.reduce((preValue, food) => preValue + food.count * food.price, 0)
	}
}
