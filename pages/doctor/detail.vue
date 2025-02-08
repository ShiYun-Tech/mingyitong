<template>
  <view class="container">
    <!-- 医生基本信息 -->
    <view class="doctor-info">
      <image :src="doctor.avatar" class="avatar"></image>
      <view class="info">
        <view class="name-title">
          <text class="name">{{ doctor.name }}</text>
          <text class="title">{{ doctor.title }}</text>
        </view>
        <view class="hospital">{{ doctor.hospital }}</view>
        <view class="department">{{ doctor.department }}</view>
        <view class="tags">
          <view class="tag" v-for="tag in doctor.tags" :key="tag">{{ tag }}</view>
        </view>
      </view>
    </view>
    
    <!-- 医生介绍 -->
    <view class="section">
      <view class="section-title">医生简介</view>
      <view class="content">{{ doctor.introduction }}</view>
    </view>
    
    <!-- 擅长领域 -->
    <view class="section">
      <view class="section-title">擅长领域</view>
      <view class="content">{{ doctor.specialty }}</view>
    </view>
    
    <!-- 出诊时间 -->
    <view class="section">
      <view class="section-title">出诊时间</view>
      <view class="schedule-list">
        <view 
          class="schedule-item"
          v-for="schedule in schedules"
          :key="schedule.date"
        >
          <view class="date-info">
            <text class="date">{{ schedule.date }}</text>
            <text class="week">{{ schedule.week }}</text>
          </view>
          <view class="period-list">
            <view 
              class="period-item"
              v-for="period in schedule.periods"
              :key="period.id"
              :class="{ 
                'disabled': period.remaining === 0,
                'selected': selectedPeriod && selectedPeriod.id === period.id 
              }"
              @tap="selectPeriod(period, schedule)"
            >
              <text class="time">{{ period.time }}</text>
              <text class="remaining">余号{{ period.remaining }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="price-info" v-if="selectedPeriod">
        <text class="label">挂号费：</text>
        <text class="price">￥{{ selectedPeriod.price }}</text>
      </view>
      <button 
        class="submit-btn" 
        :disabled="!selectedPeriod"
        @tap="handleSubmit"
      >
        立即预约
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      doctor: {
        id: 0,
        name: '',
        title: '',
        hospital: '',
        department: '',
        avatar: '',
        tags: [],
        introduction: '',
        specialty: ''
      },
      schedules: [],
      selectedPeriod: null,
      selectedDate: null
    }
  },
  onLoad(options) {
    const { id } = options
    this.loadDoctorDetail(id)
    this.loadSchedules(id)
  },
  methods: {
    loadDoctorDetail(id) {
      // 模拟加载医生详情
      setTimeout(() => {
        this.doctor = {
          id,
          name: '张医生',
          title: '主任医师',
          hospital: '北京协和医院',
          department: '内科',
          avatar: '/static/doctor-avatar.png',
          tags: ['医保', '知名专家'],
          introduction: '张医生从事临床工作20余年，在内科疾病的诊治方面积累了丰富的经验。',
          specialty: '擅长各种常见内科疾病的诊治，尤其是心血管疾病的诊断和治疗。'
        }
      }, 500)
    },
    loadSchedules(doctorId) {
      // 模拟加载排班数据
      setTimeout(() => {
        const today = new Date()
        this.schedules = Array.from({ length: 7 }, (_, index) => {
          const date = new Date(today.getTime() + index * 24 * 60 * 60 * 1000)
          return {
            date: `${date.getMonth() + 1}月${date.getDate()}日`,
            week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()],
            periods: [
              {
                id: `${index}-1`,
                time: '上午 8:00-10:00',
                remaining: Math.floor(Math.random() * 10),
                price: 100
              },
              {
                id: `${index}-2`,
                time: '下午 14:00-16:00',
                remaining: Math.floor(Math.random() * 10),
                price: 100
              }
            ]
          }
        })
      }, 500)
    },
    selectPeriod(period, schedule) {
      if (period.remaining === 0) return
      this.selectedPeriod = period
      this.selectedDate = schedule
    },
    handleSubmit() {
      if (!this.selectedPeriod) return
      
      const params = {
        doctorId: this.doctor.id,
        date: this.selectedDate.date,
        periodId: this.selectedPeriod.id,
        price: this.selectedPeriod.price
      }
      
      uni.navigateTo({
        url: `/pages/register/confirm?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 120rpx;
}

.doctor-info {
  display: flex;
  padding: 40rpx;
  background: #fff;
  margin-bottom: 20rpx;
  
  .avatar {
    width: 160rpx;
    height: 160rpx;
    border-radius: 80rpx;
    margin-right: 30rpx;
  }
  
  .info {
    flex: 1;
    
    .name-title {
      margin-bottom: 20rpx;
      
      .name {
        font-size: 36rpx;
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
      margin-bottom: 10rpx;
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10rpx;
      margin-top: 10rpx;
      
      .tag {
        padding: 4rpx 16rpx;
        font-size: 24rpx;
        color: #2979ff;
        background: #ecf5ff;
        border-radius: 20rpx;
      }
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
  
  .content {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
  }
}

.schedule-list {
  .schedule-item {
    margin-bottom: 30rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .date-info {
      margin-bottom: 20rpx;
      
      .date {
        font-size: 28rpx;
        font-weight: bold;
        margin-right: 20rpx;
      }
      
      .week {
        font-size: 28rpx;
        color: #666;
      }
    }
    
    .period-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;
      
      .period-item {
        flex: 1;
        min-width: 200rpx;
        padding: 20rpx;
        background: #f5f5f5;
        border-radius: 8rpx;
        text-align: center;
        
        &.disabled {
          opacity: 0.5;
        }
        
        &.selected {
          background: #ecf5ff;
          border: 2rpx solid #2979ff;
        }
        
        .time {
          display: block;
          font-size: 28rpx;
          margin-bottom: 10rpx;
        }
        
        .remaining {
          display: block;
          font-size: 24rpx;
          color: #666;
        }
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
    
    .label {
      font-size: 28rpx;
      color: #666;
    }
    
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