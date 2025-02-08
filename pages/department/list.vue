<template>
  <view class="container">
    <!-- 科室列表 -->
    <view class="department-list">
      <view 
        class="department-section" 
        v-for="section in departmentList" 
        :key="section.title"
      >
        <view class="section-title">{{ section.title }}</view>
        <view class="section-content">
          <view 
            class="department-item"
            v-for="item in section.items"
            :key="item.id"
            @tap="toDepartment(item)"
          >
            <image :src="item.icon" class="icon"></image>
            <text class="name">{{ item.name }}</text>
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
      departmentList: [
        {
          title: '内科',
          items: [
            { id: 101, name: '心内科', icon: '/static/icons/cardiology.png' },
            { id: 102, name: '消化内科', icon: '/static/icons/gastroenterology.png' },
            { id: 103, name: '神经内科', icon: '/static/icons/neurology.png' },
            { id: 104, name: '呼吸内科', icon: '/static/icons/respiratory.png' }
          ]
        },
        {
          title: '外科',
          items: [
            { id: 201, name: '普外科', icon: '/static/icons/surgery.png' },
            { id: 202, name: '骨科', icon: '/static/icons/orthopedics.png' },
            { id: 203, name: '神经外科', icon: '/static/icons/neurosurgery.png' },
            { id: 204, name: '心胸外科', icon: '/static/icons/cardiothoracic.png' }
          ]
        },
        {
          title: '专科',
          items: [
            { id: 301, name: '妇产科', icon: '/static/icons/gynecology.png' },
            { id: 302, name: '儿科', icon: '/static/icons/pediatrics.png' },
            { id: 303, name: '眼科', icon: '/static/icons/ophthalmology.png' },
            { id: 304, name: '口腔科', icon: '/static/icons/dental.png' },
            { id: 305, name: '皮肤科', icon: '/static/icons/dermatology.png' },
            { id: 306, name: '耳鼻喉科', icon: '/static/icons/ent.png' }
          ]
        }
      ]
    }
  },
  methods: {
    toDepartment(department) {
      // 将选中的科室存储到本地
      uni.setStorageSync('selected_department', department.name)
      uni.switchTab({
        url: '/pages/search/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.department-list {
  padding: 20rpx;
}

.department-section {
  margin-bottom: 30rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    padding: 20rpx;
    background: #fff;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
  }
  
  .section-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
  }
  
  .department-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30rpx;
    background: #fff;
    border-radius: 12rpx;
    
    .icon {
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 20rpx;
    }
    
    .name {
      font-size: 28rpx;
      color: #333;
    }
  }
}
</style> 