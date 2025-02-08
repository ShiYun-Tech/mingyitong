<template>
  <view class="container">
    <view class="form-group">
      <view class="form-item">
        <text class="label">姓名</text>
        <input 
          type="text"
          v-model="form.name"
          placeholder="请输入真实姓名"
          placeholder-class="placeholder"
        />
      </view>
      <view class="form-item">
        <text class="label">身份证号</text>
        <input 
          type="idcard"
          v-model="form.idCard"
          placeholder="请输入身份证号码"
          placeholder-class="placeholder"
        />
      </view>
      <view class="form-item">
        <text class="label">手机号</text>
        <input 
          type="number"
          v-model="form.phone"
          placeholder="请输入手机号码"
          placeholder-class="placeholder"
          maxlength="11"
        />
      </view>
      <view class="form-item switch-item">
        <text class="label">设为默认</text>
        <switch 
          :checked="form.isDefault"
          @change="e => form.isDefault = e.detail.value"
          color="#2979ff"
        />
      </view>
    </view>
    
    <button 
      class="submit-btn" 
      :disabled="!isValid"
      @tap="handleSubmit"
    >
      保存
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        idCard: '',
        phone: '',
        isDefault: false
      }
    }
  },
  computed: {
    isValid() {
      const { name, idCard, phone } = this.form
      return name && idCard && phone
    }
  },
  methods: {
    handleSubmit() {
      if (!this.isValid) return
      
      uni.showLoading({
        title: '保存中...'
      })
      
      // 模拟保存
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        })
        
        // 返回上一页
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  background: #fff;
  margin-bottom: 30rpx;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
  
  .label {
    width: 160rpx;
    font-size: 28rpx;
    color: #333;
  }
  
  input {
    flex: 1;
    font-size: 28rpx;
  }
  
  &.switch-item {
    justify-content: space-between;
    
    .label {
      width: auto;
    }
  }
}

.placeholder {
  color: #999;
}

.submit-btn {
  margin: 40rpx 30rpx;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
  color: #fff;
  background: #2979ff;
  border-radius: 44rpx;
  
  &[disabled] {
    opacity: 0.5;
  }
}
</style> 