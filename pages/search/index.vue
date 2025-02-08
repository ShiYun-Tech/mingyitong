<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-header">
      <u-search
        v-model="keyword"
        placeholder="搜索医生姓名/医院/科室"
        :show-action="true"
        action-text="搜索"
        @search="handleSearch"
        @custom="handleSearch"
      ></u-search>
    </view>
    
    <!-- 筛选条件 -->
    <view class="filter-section">
      <view class="filter-row">
        <view 
          class="filter-item" 
          :class="{ active: hospital === item.value }"
          v-for="item in hospitals" 
          :key="item.value"
          @tap="hospital = item.value"
        >{{ item.label }}</view>
      </view>
      <view class="filter-row">
        <view 
          class="filter-item" 
          :class="{ active: department === item.value }"
          v-for="item in departments" 
          :key="item.value"
          @tap="selectDepartment(item)"
        >{{ item.label }}</view>
      </view>
      <view class="filter-row">
        <view 
          class="filter-item" 
          :class="{ active: title === item.value }"
          v-for="item in titles" 
          :key="item.value"
          @tap="title = item.value"
        >{{ item.label }}</view>
      </view>
    </view>
    
    <!-- 医生列表 -->
    <view class="doctor-list">
      <view 
        class="doctor-card" 
        v-for="doctor in doctors" 
        :key="doctor.id"
        @tap="navigateToDoctor(doctor)"
      >
        <view class="doctor-info">
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
        <view class="doctor-specialty">
          <text class="label">擅长：</text>
          <text class="content">{{ doctor.specialty }}</text>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view v-if="doctors.length === 0" class="empty-state">
      <image src="/static/icons/empty.png" class="empty-icon"></image>
      <text class="empty-text">暂无相关医生</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      hospital: '',
      department: '',
      title: '',
      hospitals: [
        { label: '全部医院', value: '' },
        { label: '北京协和医院', value: '北京协和医院' },
        { label: '北京大学第一医院', value: '北京大学第一医院' }
      ],
      departments: [
        { label: '全部科室', value: '' },
        { label: '心内科', value: '心内科' },
        { label: '消化内科', value: '消化内科' },
        { label: '神经内科', value: '神经内科' },
        { label: '呼吸内科', value: '呼吸内科' },
        { label: '普外科', value: '普外科' },
        { label: '骨科', value: '骨科' },
        { label: '神经外科', value: '神经外科' },
        { label: '心胸外科', value: '心胸外科' },
        { label: '妇产科', value: '妇产科' },
        { label: '儿科', value: '儿科' },
        { label: '眼科', value: '眼科' },
        { label: '口腔科', value: '口腔科' },
        { label: '皮肤科', value: '皮肤科' },
        { label: '耳鼻喉科', value: '耳鼻喉科' }
      ],
      titles: [
        { label: '全部职称', value: '' },
        { label: '主任医师', value: '主任医师' },
        { label: '副主任医师', value: '副主任医师' },
        { label: '主治医师', value: '主治医师' }
      ],
      doctors: []
    }
  },
  onLoad(options) {
    // 如果有科室参数，设置科室并加载医生
    if (options.department) {
      this.department = options.department
      this.loadDoctors()
    }
  },
  onShow() {
    // 从本地存储获取选中的科室
    const selectedDepartment = uni.getStorageSync('selected_department')
    if (selectedDepartment) {
      this.department = selectedDepartment
      // 清除存储的科室信息
      uni.removeStorageSync('selected_department')
      this.loadDoctors()
    }
  },
  methods: {
    loadDoctors() {
      // 模拟加载医生数据
      setTimeout(() => {
        const mockDoctors = [
          {
            id: 1,
            name: '张医生',
            title: '主任医师',
            hospital: '北京协和医院',
            department: '心内科',
            avatar: '/static/doctor-avatar.png',
            specialty: '擅长各种常见心血管疾病的诊治，尤其是冠心病、高血压的诊断和治疗。'
          },
          {
            id: 2,
            name: '李医生',
            title: '副主任医师',
            hospital: '北京大学第一医院',
            department: '消化内科',
            avatar: '/static/doctor-avatar.png',
            specialty: '擅长消化系统疾病的诊治，尤其是胃肠道疾病的诊断和治疗。'
          }
        ]
        
        // 根据筛选条件过滤
        this.doctors = mockDoctors.filter(doctor => {
          if (this.hospital && doctor.hospital !== this.hospital) return false
          if (this.department && doctor.department !== this.department) return false
          if (this.title && doctor.title !== this.title) return false
          if (this.keyword) {
            const searchStr = `${doctor.name}${doctor.hospital}${doctor.department}`
            return searchStr.includes(this.keyword)
          }
          return true
        })
      }, 500)
    },
    handleSearch() {
      this.loadDoctors()
    },
    navigateToDoctor(doctor) {
      uni.navigateTo({
        url: `/pages/doctor/detail?id=${doctor.id}`
      })
    },
    selectDepartment(department) {
      this.department = department.value
      this.loadDoctors()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-header {
  padding: 20rpx;
  background: #fff;
}

.filter-section {
  background: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
  
  .filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    margin-bottom: 20rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .filter-item {
    padding: 10rpx 30rpx;
    font-size: 28rpx;
    color: #666;
    background: #f5f5f5;
    border-radius: 30rpx;
    transition: all 0.3s;
    
    &.active {
      color: #2979ff;
      background: #ecf5ff;
      font-weight: bold;
      transform: scale(1.05);
    }
  }
}

.doctor-list {
  padding: 20rpx;
}

.doctor-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  
  .doctor-info {
    display: flex;
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
        margin-bottom: 10rpx;
      }
    }
  }
  
  .doctor-specialty {
    font-size: 26rpx;
    color: #666;
    
    .label {
      color: #999;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  
  .empty-icon {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 20rpx;
  }
  
  .empty-text {
    font-size: 28rpx;
    color: #666;
  }
}
</style> 