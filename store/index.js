import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: uni.getStorageSync('token') || '',
		userInfo: uni.getStorageSync('userInfo') || {}
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token
			uni.setStorageSync('token', token)
		},
		SET_USER_INFO(state, userInfo) {
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', userInfo)
		},
		CLEAR_USER(state) {
			state.token = ''
			state.userInfo = {}
			uni.removeStorageSync('token')
			uni.removeStorageSync('userInfo')
		}
	},
	actions: {
		// 登录
		login({ commit }, userInfo) {
			commit('SET_TOKEN', 'mock_token') // 这里应该是真实的登录逻辑
			commit('SET_USER_INFO', userInfo)
		},
		// 登出
		logout({ commit }) {
			commit('CLEAR_USER')
		}
	}
})
