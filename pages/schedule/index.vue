<template>
  <view class="container">
    <!-- 状态切换 -->
    <u-tabs 
      :list="statusList"
      :current="currentStatus"
      @change="onStatusChange"
      :is-scroll="false"
    ></u-tabs>
    
    <!-- 订单列表 -->
    <view class="order-list">
      <view 
        class="order-item"
        v-for="order in orderList" 
        :key="order.id"
      >
        <view class="order-header">
          <text class="hospital">{{ order.hospital }}</text>
          <text class="status" :class="order.status">{{ order.statusText }}</text>
        </view>
        
        <view class="order-content">
          <view class="doctor-info">
            <image :src="order.doctorAvatar" class="avatar"></image>
            <view class="info">
              <view class="name">{{ order.doctorName }}</view>
              <view class="title">{{ order.doctorTitle }}</view>
              <view class="dept">{{ order.department }}</view>
            </view>
          </view>
          
          <view class="visit-info">
            <view class="time">
              <text>就诊时间：</text>
              <text>{{ order.visitDate }} {{ order.visitTime }}</text>
            </view>
            <view class="number">
              <text>就诊号：</text>
              <text>{{ order.visitNumber }}</text>
            </view>
          </view>
        </view>
        
        <view class="order-footer">
          <view class="price">￥{{ order.price }}</view>
          <view class="actions">
            <u-button 
              v-if="order.status === 'pending'" 
              type="primary" 
              size="mini"
              @click="handlePay(order)"
            >去支付</u-button>
            <u-button 
              v-if="order.status === 'paid'" 
              type="info" 
              size="mini"
              @click="handleCancel(order)"
            >取消预约</u-button>
            <u-button 
              v-if="order.status === 'completed'" 
              type="success" 
              size="mini"
              @click="handleComment(order)"
            >评价</u-button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <u-empty
      v-if="orderList.length === 0"
      mode="order"
      text="暂无相关订单"
    ></u-empty>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusList: [
        { name: '全部' },
        { name: '待支付' },
        { name: '待就诊' },
        { name: '已完成' },
        { name: '已取消' }
      ],
      currentStatus: 0,
      orderList: []
    }
  },
  onLoad() {
    this.loadOrders()
  },
  onPullDownRefresh() {
    this.loadOrders()
  },
  methods: {
    onStatusChange(index) {
      this.currentStatus = index
      this.loadOrders()
    },
    loadOrders() {
      // 模拟加载订单数据
      setTimeout(() => {
        this.orderList = [
          {
            id: 1,
            hospital: '北京协和医院',
            status: 'pending',
            statusText: '待支付',
            doctorAvatar: '/static/doctor-avatar.png',
            doctorName: '张医生',
            doctorTitle: '主任医师',
            department: '皮肤科',
            visitDate: '2024-02-08',
            visitTime: '上午',
            visitNumber: 'A1001',
            price: '90.00'
          },
          {
            id: 2,
            hospital: '北京协和医院',
            status: 'paid',
            statusText: '待就诊',
            doctorAvatar: '/static/doctor-avatar.png',
            doctorName: '李医生',
            doctorTitle: '副主任医师',
            department: '内科',
            visitDate: '2024-02-10',
            visitTime: '下午',
            visitNumber: 'B2001',
            price: '60.00'
          }
        ]
        
        uni.stopPullDownRefresh()
      }, 1000)
    },
    handlePay(order) {
      uni.navigateTo({
        url: `/pages/payment/index?orderId=${order.id}`
      })
    },
    handleCancel(order) {
      uni.showModal({
        title: '提示',
        content: '确定要取消预约吗？',
        success: (res) => {
          if (res.confirm) {
            // 调用取消API
            uni.showLoading({
              title: '取消中...'
            })
            setTimeout(() => {
              uni.hideLoading()
              this.loadOrders()
            }, 1000)
          }
        }
      })
    },
    handleComment(order) {
      uni.navigateTo({
        url: `/pages/comment/index?orderId=${order.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list {
  padding: 20rpx;
}

.order-item {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    
    .hospital {
      font-size: 32rpx;
      font-weight: bold;
    }
    
    .status {
      font-size: 28rpx;
      
      &.pending {
        color: #ff9900;
      }
      
      &.paid {
        color: #2979ff;
      }
      
      &.completed {
        color: #19be6b;
      }
      
      &.cancelled {
        color: #909399;
      }
    }
  }
  
  .order-content {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 20rpx 0;
    
    .doctor-info {
      display: flex;
      margin-bottom: 20rpx;
      
      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;
        margin-right: 20rpx;
      }
      
      .info {
        .name {
          font-size: 32rpx;
          font-weight: bold;
        }
        
        .title {
          font-size: 28rpx;
          color: #666;
        }
        
        .dept {
          font-size: 28rpx;
          color: #999;
        }
      }
    }
    
    .visit-info {
      font-size: 28rpx;
      color: #666;
      
      .time, .number {
        margin-bottom: 10rpx;
      }
    }
  }
  
  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20rpx;
    
    .price {
      font-size: 36rpx;
      color: #f56c6c;
      font-weight: bold;
    }
    
    .actions {
      display: flex;
      gap: 20rpx;
    }
  }
}
</style> 