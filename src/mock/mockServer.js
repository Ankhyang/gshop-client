import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/shopInfo', {code: 0, data: data.info})
Mock.mock('/shopGoods', {code: 0, data: data.goods})
Mock.mock('/shopRatings', {code: 0, data: data.ratings})
