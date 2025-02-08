import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import store from '@/store';
import httpInterceptor from '@/common/http.interceptor.js';
import httpApi from '@/common/http.api.js';

// 关闭生产提示
Vue.config.productionTip = false;

// 使用 uView
Vue.use(uView);

// 设置 app 类型
App.mpType = 'app';

// 创建 Vue 实例
const app = new Vue({
	store,
	...App
});

// 注册 http 拦截器
Vue.use(httpInterceptor, app);

// 注册 API 接口
Vue.use(httpApi, app);

// 挂载应用
app.$mount();
