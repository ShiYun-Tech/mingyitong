<template>
	<view class="container">
		<!-- 用户信息卡片 -->
		<view class="user-card">
			<image :src="userInfo.avatar || '/static/default-avatar.png'" class="avatar"></image>
			<view class="info">
				<text class="name">{{ userInfo.name || '未登录' }}</text>
				<text class="phone" v-if="userInfo.phone">{{ userInfo.phone }}</text>
			</view>
		</view>
		
		<!-- 功能列表 -->
		<view class="menu-list">
			<view class="menu-item" @tap="toPatientList">
				<view class="left">
					<u-icon name="account" size="40" color="#2979ff"></u-icon>
					<text class="title">就诊人管理</text>
				</view>
				<u-icon name="arrow-right" color="#999"></u-icon>
			</view>
			
			<view class="menu-item" @tap="toOrderList">
				<view class="left">
					<u-icon name="calendar" size="40" color="#2979ff"></u-icon>
					<text class="title">我的预约</text>
				</view>
				<u-icon name="arrow-right" color="#999"></u-icon>
			</view>
			
			<view class="menu-item" @tap="toAuth" v-if="!userInfo.isAuth">
				<view class="left">
					<u-icon name="edit" size="40" color="#2979ff"></u-icon>
					<text class="title">实名认证</text>
				</view>
				<u-icon name="arrow-right" color="#999"></u-icon>
			</view>
		</view>
		
		<!-- 退出登录 -->
		<view class="action-list" v-if="userInfo.phone">
			<button class="action-btn logout" @tap="handleLogout">退出登录</button>
			<button class="action-btn delete" @tap="handleDeleteAccount">注销账户</button>
		</view>
		
		<!-- 登录按钮 -->
		<view class="action-list" v-else>
			<button class="action-btn primary" @tap="toLogin">立即登录</button>
		</view>
		
		<!-- 广告轮播图 -->
		<view class="ad-swiper">
			<swiper 
				class="swiper" 
				circular 
				autoplay 
				interval="3000" 
				duration="500"
				indicator-dots
				indicator-color="rgba(255, 255, 255, 0.6)"
				indicator-active-color="#ffffff"
			>
				<swiper-item v-for="(item, index) in adList" :key="index" @tap="handleAdClick(item)">
					<image :src="item.image" mode="aspectFill" class="ad-image"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatar: '',
					name: '',
					phone: '',
					isAuth: false
				},
				adList: [
					{
						id: 1,
						image: '/static/ads/ad1.png',
						url: 'https://example.com/ad1'
					},
					{
						id: 2,
						image: '/static/ads/ad2.png',
						url: 'https://example.com/ad2'
					},
					{
						id: 3,
						image: '/static/ads/ad3.png',
						url: 'https://example.com/ad3'
					}
				]
			}
		},
		onShow() {
			this.loadUserInfo()
		},
		methods: {
			loadUserInfo() {
				// 模拟获取用户信息
				const token = uni.getStorageSync('token')
				if (token) {
					this.userInfo = {
						avatar: '/static/default-avatar.png',
						name: '张三',
						phone: '138****8888',
						isAuth: true
					}
				} else {
					this.userInfo = {}
				}
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			toPatientList() {
				if (!this.userInfo.phone) {
					return this.toLogin()
				}
				uni.navigateTo({
					url: '/pages/patient/list'
				})
			},
			toOrderList() {
				if (!this.userInfo.phone) {
					return this.toLogin()
				}
				uni.switchTab({
					url: '/pages/order/index'
				})
			},
			toAuth() {
				if (!this.userInfo.phone) {
					return this.toLogin()
				}
				uni.navigateTo({
					url: '/pages/auth/index'
				})
			},
			handleLogout() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('token')
							this.userInfo = {}
							uni.showToast({
								title: '已退出登录',
								icon: 'success'
							})
						}
					}
				})
			},
			handleDeleteAccount() {
				uni.showModal({
					title: '警告',
					content: '账户注销后将无法恢复，确定要继续吗？',
					success: (res) => {
						if (res.confirm) {
							// 模拟注销账户
							setTimeout(() => {
								uni.removeStorageSync('token')
								this.userInfo = {}
								uni.showToast({
									title: '账户已注销',
									icon: 'success'
								})
							}, 1000)
						}
					}
				})
			},
			handleAdClick(ad) {
				// 处理广告点击
				uni.showModal({
					title: '提示',
					content: '是否查看详情？',
					success: (res) => {
						if (res.confirm) {
							// 这里可以根据实际需求处理广告跳转
							uni.navigateTo({
								url: `/pages/webview/index?url=${encodeURIComponent(ad.url)}`
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background: #f5f5f5;
}

.user-card {
	display: flex;
	align-items: center;
	padding: 40rpx;
	background: #fff;
	margin-bottom: 20rpx;
	
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		margin-right: 30rpx;
	}
	
	.info {
		.name {
			font-size: 32rpx;
			font-weight: bold;
			margin-bottom: 10rpx;
		}
		
		.phone {
			font-size: 28rpx;
			color: #666;
		}
	}
}

.menu-list {
	background: #fff;
	margin-bottom: 20rpx;
	
	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #f5f5f5;
		
		&:last-child {
			border-bottom: none;
		}
		
		.left {
			display: flex;
			align-items: center;
			
			.title {
				font-size: 30rpx;
				margin-left: 20rpx;
			}
		}
	}
}

.action-list {
	padding: 40rpx;
	
	.action-btn {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 30rpx;
		margin-bottom: 30rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
		
		&.primary {
			color: #fff;
			background: #2979ff;
		}
		
		&.logout {
			color: #2979ff;
			background: #fff;
			border: 1rpx solid #2979ff;
		}
		
		&.delete {
			color: #ff4d4f;
			background: #fff;
			border: 1rpx solid #ff4d4f;
		}
	}
}

.ad-swiper {
	margin: 20rpx;
	border-radius: 12rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	
	.swiper {
		height: 300rpx;
		
		.ad-image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
