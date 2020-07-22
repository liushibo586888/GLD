import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		num: 0
	},
	mutations: {
		changeNum(state, num) {
			state.num = num
		}
	},
	actions: {}
})

export default store
