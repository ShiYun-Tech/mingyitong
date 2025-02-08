<template>
  <view class="container">
    <!-- 就诊人列表 -->
    <view class="patient-list">
      <view 
        class="patient-item"
        v-for="patient in patients"
        :key="patient.id"
        @tap="selectPatient(patient)"
      >
        <view class="info">
          <view class="name">
            {{ patient.name }}
            <text class="tag" v-if="patient.isDefault">默认</text>
          </view>
          <view class="detail">
            {{ patient.idCard }}
            <text class="separator">|</text>
            {{ patient.phone }}
          </view>
        </view>
        <view class="actions">
          <view class="edit-btn" @tap.stop="editPatient(patient)">编辑</view>
          <view class="delete-btn" @tap.stop="deletePatient(patient)">删除</view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view v-if="patients.length === 0" class="empty-state">
      <image src="/static/icons/empty.png" class="empty-icon"></image>
      <text class="empty-text">暂无就诊人</text>
    </view>
    
    <!-- 底部按钮 -->
    <button class="add-btn" @tap="toAdd">
      添加就诊人
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      patients: []
    }
  },
  onShow() {
    this.loadPatients()
  },
  methods: {
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
          },
          {
            id: 2,
            name: '李四',
            idCard: '110101199001011235',
            phone: '13800138001',
            isDefault: false
          }
        ]
      }, 500)
    },
    selectPatient(patient) {
      // 如果是从预约确认页面跳转来的，选择后返回
      const pages = getCurrentPages()
      const prevPage = pages[pages.length - 2]
      if (prevPage && prevPage.route === 'pages/register/confirm') {
        // 设置选中的就诊人并返回
        prevPage.$vm.selectedPatient = patient
        uni.navigateBack()
      }
    },
    toAdd() {
      uni.navigateTo({
        url: '/pages/patient/add'
      })
    },
    editPatient(patient) {
      uni.navigateTo({
        url: `/pages/patient/add?id=${patient.id}`
      })
    },
    deletePatient(patient) {
      uni.showModal({
        title: '提示',
        content: '确定要删除该就诊人吗？',
        success: (res) => {
          if (res.confirm) {
            // 模拟删除
            uni.showLoading({
              title: '删除中...'
            })
            
            setTimeout(() => {
              this.patients = this.patients.filter(p => p.id !== patient.id)
              uni.hideLoading()
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              })
            }, 1000)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-list {
  background: #fff;
  margin-bottom: 120rpx;
}

.patient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
  
  .info {
    flex: 1;
    margin-right: 30rpx;
    
    .name {
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
    
    .detail {
      font-size: 28rpx;
      color: #666;
      
      .separator {
        margin: 0 20rpx;
        color: #ddd;
      }
    }
  }
  
  .actions {
    display: flex;
    align-items: center;
    
    .edit-btn, .delete-btn {
      padding: 10rpx 20rpx;
      font-size: 28rpx;
      border-radius: 30rpx;
      margin-left: 20rpx;
    }
    
    .edit-btn {
      color: #2979ff;
      background: #ecf5ff;
    }
    
    .delete-btn {
      color: #ff4d4f;
      background: #fff1f0;
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

.add-btn {
  position: fixed;
  left: 30rpx;
  right: 30rpx;
  bottom: 30rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  color: #fff;
  font-size: 32rpx;
  background: #2979ff;
  border-radius: 44rpx;
}
</style> 