<template>
  <view class="container">
    <!-- 医生信息 -->
    <view class="doctor-card">
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
    
    <!-- 就诊信息 -->
    <view class="section">
      <view class="section-title">就诊信息</view>
      <view class="info-item">
        <text class="label">就诊时间</text>
        <text class="value">{{ date }} {{ period.time }}</text>
      </view>
      <view class="info-item">
        <text class="label">就诊费用</text>
        <text class="value price">￥{{ period.price }}</text>
      </view>
    </view>
    
    <!-- 就诊人信息 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">就诊人信息</text>
        <text class="add-btn" @tap="toAddPatient" v-if="!selectedPatient">添加就诊人</text>
      </view>
      <view v-if="selectedPatient" class="patient-info">
        <view class="patient-name">
          {{ selectedPatient.name }}
          <text class="tag" v-if="selectedPatient.isDefault">默认</text>
        </view>
        <view class="patient-detail">
          {{ selectedPatient.idCard }}
          <text class="separator">|</text>
          {{ selectedPatient.phone }}
        </view>
      </view>
      <view v-else class="no-patient" @tap="toAddPatient">
        <text>请添加就诊人</text>
        <text class="arrow">></text>
      </view>
    </view>
    
    <!-- 注意事项 -->
    <view class="section notice">
      <view class="section-title">注意事项</view>
      <view class="notice-list">
        <view class="notice-item">1. 请确保就诊人信息真实准确</view>
        <view class="notice-item">2. 请按时就医，若需取消请提前操作</view>
        <view class="notice-item">3. 建议提前15分钟到达医院</view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="price-info">
        <text>实付款：</text>
        <text class="price">￥{{ period.price }}</text>
      </view>
      <button 
        class="submit-btn" 
        :disabled="!selectedPatient"
        @tap="handleSubmit"
      >
        确认预约
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      doctor: {},
      date: '',
      period: {},
      selectedPatient: null,
      patients: []
    }
  },
  onLoad(options) {
    const { doctorId, date, periodId, price } = options
    this.loadDoctorDetail(doctorId)
    this.date = date
    this.period = {
      id: periodId,
      time: this.getTimeByPeriodId(periodId),
      price: Number(price)
    }
    this.loadPatients()
  },
  methods: {
    loadDoctorDetail(id) {
      // 模拟加载医生信息
      setTimeout(() => {
        this.doctor = {
          id,
          name: '张医生',
          title: '主任医师',
          hospital: '北京协和医院',
          department: '内科',
          avatar: '/static/doctor-avatar.png'
        }
      }, 500)
    },
    loadPatients() {
      // 模拟加载就诊人列表
      setTimeout(() => {
        this.patients = [
          {
            id: 1,
            name: '张三',
            idCard: '110101199001011234',
            phone: '13800138000',
            isDefault: true
          }
        ]
        this.selectedPatient = this.patients.find(p => p.isDefault)
      }, 500)
    },
    getTimeByPeriodId(id) {
      // 根据时段ID返回具体时间
      const timeMap = {
        '0-1': '上午 8:00-10:00',
        '0-2': '下午 14:00-16:00'
      }
      return timeMap[id] || ''
    },
    toAddPatient() {
      uni.navigateTo({
        url: '/pages/patient/add'
      })
    },
    handleSubmit() {
      if (!this.selectedPatient) {
        uni.showToast({
          title: '请先添加就诊人',
          icon: 'none'
        })
        return
      }
      
      // 模拟提交预约
      uni.showLoading({
        title: '提交中...'
      })
      
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '预约成功',
          icon: 'success'
        })
        
        // 延迟跳转到订单详情页
        setTimeout(() => {
          uni.redirectTo({
            url: '/pages/order/detail?id=123'
          })
        }, 1500)
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 120rpx;
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
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    
    .add-btn {
      font-size: 28rpx;
      color: #2979ff;
    }
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

.patient-info {
  .patient-name {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
    
    .tag {
      font-size: 24rpx;
      color: #2979ff;
      background: #ecf5ff;
      padding: 2rpx 12rpx;
      border-radius: 20rpx;
      margin-left: 20rpx;
      font-weight: normal;
    }
  }
  
  .patient-detail {
    font-size: 28rpx;
    color: #666;
    
    .separator {
      margin: 0 20rpx;
      color: #ddd;
    }
  }
}

.no-patient {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
  font-size: 28rpx;
  color: #999;
  
  .arrow {
    color: #ccc;
  }
}

.notice {
  .notice-list {
    .notice-item {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 10rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .price-info {
    flex: 1;
    font-size: 28rpx;
    
    .price {
      font-size: 36rpx;
      color: #ff4d4f;
      font-weight: bold;
    }
  }
  
  .submit-btn {
    width: 240rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #fff;
    font-size: 32rpx;
    background: #2979ff;
    border-radius: 40rpx;
    
    &[disabled] {
      opacity: 0.5;
    }
  }
}
</style> 