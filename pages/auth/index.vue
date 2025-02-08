<template>
  <view class="container">
    <view class="auth-box">
      <view class="title">实名认证</view>
      
      <u-form :model="form" ref="uForm">
        <u-form-item label="姓名" prop="name">
          <u-input 
            v-model="form.name"
            placeholder="请输入真实姓名"
          />
        </u-form-item>
        
        <u-form-item label="身份证号" prop="idCard">
          <u-input
            v-model="form.idCard"
            placeholder="请输入身份证号"
            maxlength="18"
          />
        </u-form-item>
      </u-form>

      <view class="tips">
        <u-icon name="info-circle" color="#999" size="28"></u-icon>
        <text>请确保信息真实有效，认证后不可修改</text>
      </view>

      <view class="actions">
        <u-button type="primary" @click="handleAuth">提交认证</u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        idCard: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确' }
        ]
      }
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    handleAuth() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          // 调用认证API
          uni.showLoading({
            title: '认证中...'
          })
          
          // 模拟API调用
          setTimeout(() => {
            uni.hideLoading()
            uni.showToast({
              title: '认证成功',
              icon: 'success'
            })
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/home/home'
              })
            }, 1500)
          }, 1500)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-box {
  padding: 40rpx;
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 60rpx;
  }
  
  .tips {
    display: flex;
    align-items: center;
    gap: 10rpx;
    color: #999;
    font-size: 24rpx;
    margin: 30rpx 0;
  }
  
  .actions {
    margin-top: 60rpx;
  }
}
</style> 