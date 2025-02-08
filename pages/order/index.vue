<template>
  <view class="container">
    <!-- 状态切换 -->
    <view class="tab-bar">
      <view 
        class="tab-item"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        {{ tab }}
      </view>
    </view>
    
    <!-- 订单列表 -->
    <view class="order-list">
      <view 
        class="order-card"
        v-for="order in filteredOrders"
        :key="order.id"
        @tap="toDetail(order)"
      >
        <!-- 状态栏 -->
        <view class="status-bar">
          <text class="time">{{ order.createTime }}</text>
          <text class="status">{{ orderStatus[order.status] }}</text>
        </view>
        
        <!-- 医生信息 -->
        <view class="doctor-info">
          <image :src="order.doctor.avatar" class="avatar"></image>
          <view class="info">
            <view class="name-title">
              <text class="name">{{ order.doctor.name }}</text>
              <text class="title">{{ order.doctor.title }}</text>
            </view>
            <view class="hospital">{{ order.doctor.hospital }}</view>
            <view class="department">{{ order.doctor.department }}</view>
          </view>
        </view>
        
        <!-- 就诊信息 -->
        <view class="visit-info">
          <text class="label">就诊时间：</text>
          <text class="value">{{ order.date }} {{ order.time }}</text>
        </view>
        
        <!-- 底部操作栏 -->
        <view class="action-bar">
          <text class="price">￥{{ order.price }}</text>
          <view class="btn-group">
            <button 
              class="btn cancel" 
              v-if="order.status === 'pending'"
              @tap.stop="cancelOrder(order)"
            >取消预约</button>
            <button 
              class="btn primary" 
              v-if="order.status === 'pending'"
              @tap.stop="payOrder(order)"
            >立即支付</button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view v-if="filteredOrders.length === 0" class="empty-state">
      <image src="/static/icons/empty.png" class="empty-icon"></image>
      <text class="empty-text">暂无预约记录</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: ['全部', '待支付', '待就诊', '已完成'],
      currentTab: 0,
      orderStatus: {
        pending: '待支付',
        paid: '待就诊',
        completed: '已完成',
        cancelled: '已取消'
      },
      orders: []
    }
  },
  computed: {
    filteredOrders() {
      if (this.currentTab === 0) return this.orders
      
      const statusMap = {
        1: 'pending',
        2: 'paid',
        3: 'completed'
      }
      
      return this.orders.filter(order => order.status === statusMap[this.currentTab])
    }
  },
  onShow() {
    this.loadOrders()
  },
  onPullDownRefresh() {
    this.loadOrders()
  },
  methods: {
    loadOrders() {
      // 模拟加载订单列表
      setTimeout(() => {
        this.orders = [
          {
            id: 1,
            status: 'pending',
            doctor: {
              name: '张医生',
              title: '主任医师',
              hospital: '北京协和医院',
              department: '内科',
              avatar: '/static/doctor-avatar.png'
            },
            date: '2024-1-24',
            time: '上午 8:00-10:00',
            createTime: '2024-01-24 12:00:00',
            price: 100
          },
          {
            id: 2,
            status: 'paid',
            doctor: {
              name: '李医生',
              title: '副主任医师',
              hospital: '北京大学第一医院',
              department: '外科',
              avatar: '/static/doctor-avatar.png'
            },
            date: '2024-1-25',
            time: '下午 14:00-16:00',
            createTime: '2024-01-24 10:00:00',
            price: 100
          }
        ]
        uni.stopPullDownRefresh()
      }, 500)
    },
    switchTab(index) {
      this.currentTab = index
    },
    toDetail(order) {
      uni.navigateTo({
        url: `/pages/order/detail?id=${order.id}`
      })
    },
    cancelOrder(order) {
      uni.showModal({
        title: '提示',
        content: '确定要取消预约吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showLoading({
              title: '取消中...'
            })
            
            setTimeout(() => {
              order.status = 'cancelled'
              uni.hideLoading()
              uni.showToast({
                title: '取消成功',
                icon: 'success'
              })
            }, 1000)
          }
        }
      })
    },
    payOrder(order) {
      uni.showLoading({
        title: '支付中...'
      })
      
      setTimeout(() => {
        order.status = 'paid'
        uni.hideLoading()
        uni.showToast({
          title: '支付成功',
          icon: 'success'
        })
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  background: #fff;
  padding: 20rpx 0;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    position: relative;
    
    &.active {
      color: #2979ff;
      font-weight: bold;
      
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -20rpx;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background: #2979ff;
        border-radius: 2rpx;
      }
    }
  }
}

.order-list {
  padding: 20rpx;
}

.order-card {
  background: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  
  .status-bar {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    background: #f8f8f8;
    
    .time {
      font-size: 24rpx;
      color: #999;
    }
    
    .status {
      font-size: 24rpx;
      color: #2979ff;
    }
  }
  
  .doctor-info {
    display: flex;
    padding: 20rpx;
    
    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50rpx;
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
  
  .visit-info {
    padding: 0 20rpx 20rpx;
    
    .label {
      font-size: 28rpx;
      color: #666;
    }
    
    .value {
      font-size: 28rpx;
      color: #333;
    }
  }
  
  .action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    border-top: 1rpx solid #f5f5f5;
    
    .price {
      font-size: 32rpx;
      color: #ff4d4f;
      font-weight: bold;
    }
    
    .btn-group {
      display: flex;
      gap: 20rpx;
      
      .btn {
        margin: 0;
        padding: 0 30rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 28rpx;
        border-radius: 30rpx;
        
        &.cancel {
          color: #666;
          background: #f5f5f5;
        }
        
        &.primary {
          color: #fff;
          background: #2979ff;
        }
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;
  
  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
  }
  
  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}
</style> 