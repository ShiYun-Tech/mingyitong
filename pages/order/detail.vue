<template>
  <view class="container">
    <!-- 订单状态 -->
    <view class="status-section">
      <view class="status">{{ orderStatus[order.status] }}</view>
      <view class="desc">{{ getStatusDesc(order.status) }}</view>
    </view>
    
    <!-- 医生信息 -->
    <view class="doctor-card">
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
    <view class="section">
      <view class="section-title">就诊信息</view>
      <view class="info-item">
        <text class="label">就诊时间</text>
        <text class="value">{{ order.date }} {{ order.time }}</text>
      </view>
      <view class="info-item">
        <text class="label">就诊人</text>
        <text class="value">{{ order.patient.name }}</text>
      </view>
      <view class="info-item">
        <text class="label">就诊卡号</text>
        <text class="value">{{ order.cardNo }}</text>
      </view>
    </view>
    
    <!-- 订单信息 -->
    <view class="section">
      <view class="section-title">订单信息</view>
      <view class="info-item">
        <text class="label">订单编号</text>
        <text class="value">{{ order.orderNo }}</text>
      </view>
      <view class="info-item">
        <text class="label">下单时间</text>
        <text class="value">{{ order.createTime }}</text>
      </view>
      <view class="info-item">
        <text class="label">支付方式</text>
        <text class="value">{{ order.payMethod }}</text>
      </view>
      <view class="info-item">
        <text class="label">挂号费</text>
        <text class="value price">￥{{ order.price }}</text>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar" v-if="order.status === 'pending'">
      <button class="cancel-btn" @tap="cancelOrder">取消预约</button>
      <button class="pay-btn" @tap="payOrder">立即支付</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orderStatus: {
        pending: '待支付',
        paid: '待就诊',
        completed: '已完成',
        cancelled: '已取消'
      },
      order: {
        id: '',
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
        patient: {
          name: '张三',
          idCard: '110101199001011234'
        },
        cardNo: '1234567890',
        orderNo: 'O2024012412345',
        createTime: '2024-01-24 12:00:00',
        payMethod: '微信支付',
        price: 100
      }
    }
  },
  onLoad(options) {
    const { id } = options
    this.loadOrderDetail(id)
  },
  methods: {
    loadOrderDetail(id) {
      // 模拟加载订单详情
      this.order.id = id
    },
    getStatusDesc(status) {
      const descMap = {
        pending: '请在15分钟内完成支付',
        paid: '请按时就医',
        completed: '就诊已完成',
        cancelled: '预约已取消'
      }
      return descMap[status] || ''
    },
    cancelOrder() {
      uni.showModal({
        title: '提示',
        content: '确定要取消预约吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showLoading({
              title: '取消中...'
            })
            
            setTimeout(() => {
              this.order.status = 'cancelled'
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
    payOrder() {
      uni.showLoading({
        title: '支付中...'
      })
      
      setTimeout(() => {
        this.order.status = 'paid'
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
.status-section {
  background: #2979ff;
  padding: 40rpx 30rpx;
  color: #fff;
  
  .status {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  
  .desc {
    font-size: 28rpx;
    opacity: 0.9;
  }
}

.doctor-card {
  display: flex;
  padding: 30rpx;
  background: #fff;
  margin-bottom: 20rpx;
  
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

.section {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .label {
    font-size: 28rpx;
    color: #666;
  }
  
  .value {
    font-size: 28rpx;
    
    &.price {
      color: #ff4d4f;
      font-weight: bold;
    }
  }
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 20rpx 30rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .cancel-btn, .pay-btn {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 32rpx;
    border-radius: 40rpx;
  }
  
  .cancel-btn {
    margin-right: 20rpx;
    color: #666;
    background: #f5f5f5;
  }
  
  .pay-btn {
    color: #fff;
    background: #2979ff;
  }
}
</style> 