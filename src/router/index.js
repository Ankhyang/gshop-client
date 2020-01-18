/* eslint-disable indent */
/* eslint-disable no-tabs */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
// import Msite from '../pages/Msite/Msite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'

const Msite = () => import('../pages/Msite/Msite.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Search = () => import('../pages/Search/Search.vue')

Vue.use(Router)

export default new Router({
	routes: [
		{
			// eslint-disable-next-line indent
			path: '/msite',
			component: Msite,
			meta: {
				showFooter: true
			}
		},
		{
			path: '/order',
			component: Order,
			meta: {
				showFooter: true
			}
		},
		{
			path: '/profile',
			component: Profile,
			meta: {
				showFooter: true
			}
		},
		{
			path: '/search',
			component: Search,
			meta: {
				showFooter: true
			}
		},
		{
			path: '/',
			redirect: '/msite'
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/shop',
			component: Shop,
			children: [
				{
					path: '/shop/goods',
					component: ShopGoods
				},
				{
					path: '/shop/info',
					component: ShopInfo
				},
				{
					path: '/shop/ratings',
					component: ShopRatings
				},
				{
					path: '',
					redirect: '/shop/goods'
				}
			]
		}
	]
})
