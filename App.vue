<script>
	export default {
		// 此处globalData为了演示其作用，不是uView框架的一部分
		globalData: {
			username: '白居易',
			hospitals: [], // 医院列表
			departments: [], // 科室列表
			doctors: [], // 医生列表
		},
		onLaunch() {
			// 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
			// 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
			// import httpInterceptor from '@/common/http.interceptor.js'
			// Vue.use(httpInterceptor, app)
			// process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
			/**
			 * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
			 */
			// 初始化数据
			this.initAppData()
		},
		methods: {
			initAppData() {
				// 这里可以从后端API获取初始数据
				this.globalData.departments = [
					{ id: 1, name: '皮肤科', icon: '/static/icons/dermatology.png' },
					{ id: 2, name: '精神心理科', icon: '/static/icons/psychology.png' },
					{ id: 3, name: '骨科', icon: '/static/icons/orthopedics.png' },
					{ id: 4, name: '儿科', icon: '/static/icons/pediatrics.png' },
					{ id: 5, name: '眼科', icon: '/static/icons/ophthalmology.png' },
					// ... 其他科室
				]
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	page {
		background-color: #f5f5f5;
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
			Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
			sans-serif;
	}

	.container {
		min-height: 100vh;
	}

	/* 隐藏滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
	}

	.department-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 20rpx;
		padding: 20rpx;
	}

	.doctor-card {
		background: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
</style>