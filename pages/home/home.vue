<template>
	<view class="container">
	  <!-- 搜索栏 -->
	  <view class="search-bar" @tap="toSearch">
		<u-search
		  v-model="keyword"
		  placeholder="搜索医生姓名/医院/科室"
		  disabled
		  :show-action="false"
		></u-search>
	  </view>
	  
	  <!-- 科室导航 -->
	  <view class="department-grid">
		<view 
		  class="department-item"
		  v-for="item in departments"
		  :key="item.id"
		  @tap="toDepartment(item)"
		>
		  <image :src="item.icon" class="icon"></image>
		  <text class="name">{{ item.name }}</text>
		</view>
	  </view>
	  
	  <!-- 推荐医生 -->
	  <view class="section">
		<view class="section-header">
		  <text class="title">推荐医生</text>
		  <text class="more" @tap="toSearch">查看更多</text>
		</view>
		<view class="doctor-list">
		  <view 
			class="doctor-card"
			v-for="doctor in doctors"
			:key="doctor.id"
			@tap="toDoctor(doctor)"
		  >
			<image :src="doctor.avatar" class="avatar"></image>
			<view class="info">
			  <view class="name-title">
				<text class="name">{{ doctor.name }}</text>
				<text class="title">{{ doctor.title }}</text>
			  </view>
			  <view class="hospital">{{ doctor.hospital }}</view>
			  <view class="department">{{ doctor.department }}</view>
			</view>
		  </view>
		</view>
	  </view>
	</view>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		keyword: '',
		departments: [
		  { id: 101, name: '心内科', icon: '/static/icons/cardiology.png' },
		  { id: 102, name: '消化内科', icon: '/static/icons/gastroenterology.png' },
		  { id: 201, name: '普外科', icon: '/static/icons/surgery.png' },
		  { id: 301, name: '妇产科', icon: '/static/icons/gynecology.png' },
		  { id: 302, name: '儿科', icon: '/static/icons/pediatrics.png' },
		  { id: 303, name: '眼科', icon: '/static/icons/ophthalmology.png' },
		  { id: 304, name: '口腔科', icon: '/static/icons/dental.png' },
		  { id: 0, name: '更多科室', icon: '/static/icons/more.png' }
		],
		doctors: []
	  }
	},
	onShow() {
	  this.loadDoctors()
	},
	methods: {
	  loadDoctors() {
		// 模拟加载推荐医生数据
		setTimeout(() => {
		  this.doctors = [
			{
			  id: 1,
			  name: '张医生',
			  title: '主任医师',
			  hospital: '北京协和医院',
			  department: '内科',
			  avatar: '/static/doctor-avatar.png'
			},
			{
			  id: 2,
			  name: '李医生',
			  title: '副主任医师',
			  hospital: '北京大学第一医院',
			  department: '外科',
			  avatar: '/static/doctor-avatar.png'
			}
		  ]
		}, 500)
	  },
	  toSearch() {
		uni.switchTab({
		  url: '/pages/search/index'
		})
	  },
	  toDepartment(department) {
		if (department.id === 0) {
		  // 更多科室
		  uni.navigateTo({
			url: '/pages/department/list'
		  })
		} else {
		  // 将选中的科室存储到本地
		  uni.setStorageSync('selected_department', department.name)
		  uni.switchTab({
			url: '/pages/search/index'
		  })
		}
	  },
	  toDoctor(doctor) {
		uni.navigateTo({
		  url: `/pages/doctor/detail?id=${doctor.id}`
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
  
  .search-bar {
	position: sticky;
	top: 0;
	z-index: 100;
	background: #fff;
	padding: 20rpx;
  }
  
  .department-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 20rpx;
	padding: 30rpx 20rpx;
	background: #fff;
  }
  
  .department-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.icon {
	  width: 80rpx;
	  height: 80rpx;
	  margin-bottom: 10rpx;
	}
	
	.name {
	  font-size: 24rpx;
	  color: #333;
	}
  }
  
  .section {
	margin-top: 20rpx;
	background: #fff;
	padding: 20rpx;
	
	.section-header {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-bottom: 20rpx;
	  
	  .title {
		font-size: 32rpx;
		font-weight: bold;
	  }
	  
	  .more {
		font-size: 24rpx;
		color: #666;
	  }
	}
  }
  
  .doctor-list {
	.doctor-card {
	  display: flex;
	  padding: 20rpx 0;
	  border-bottom: 1rpx solid #f5f5f5;
	  
	  &:last-child {
		border-bottom: none;
	  }
	  
	  .avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		margin-right: 20rpx;
	  }
	  
	  .info {
		flex: 1;
		
		.name-title {
		  margin-bottom: 10rpx;
		  
		  .name {
			font-size: 32rpx;
			font-weight: bold;
			margin-right: 20rpx;
		  }
		  
		  .title {
			font-size: 28rpx;
			color: #666;
		  }
		}
		
		.hospital, .department {
		  font-size: 28rpx;
		  color: #666;
		  margin-bottom: 6rpx;
		}
	  }
	}
  }
  </style> 