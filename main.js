import Vue from 'vue'
import App from './App'
import cuCustom from './ui/colorui/components/cu-custom.vue'
import uView from "./components/uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
Vue.component('cu-custom',cuCustom)
import utils from "./utils/index.js"
Vue.prototype.$utils = utils;
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$baseURL = '/static/'
App.mpType = 'app'

const app = new Vue({
    ...App,
	//挂载
	store
})
app.$mount()
