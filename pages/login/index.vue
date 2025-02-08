<template>
  <view class="container">
    <view class="login-box">
      <view class="title">登录</view>
      
      <u-form :model="form" ref="uForm">
        <u-form-item label="手机号" prop="phone">
          <u-input 
            v-model="form.phone"
            placeholder="请输入手机号"
            type="number"
            maxlength="11"
          />
        </u-form-item>
        
        <u-form-item label="密码" prop="password">
          <u-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </u-form-item>
      </u-form>

      <view class="actions">
        <u-button type="primary" @click="handleLogin">登录</u-button>
        <view class="links">
          <text @click="toRegister">注册账号</text>
          <text @click="toForgetPassword">忘记密码</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, max: 20, message: '密码长度在6-20个字符之间' }
        ]
      }
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    handleLogin() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          // 调用登录API
          uni.showLoading({
            title: '登录中...'
          })
          
          // 模拟API调用
          setTimeout(() => {
            uni.hideLoading()
            uni.setStorageSync('token', 'mock_token')
            uni.switchTab({
              url: '/pages/home/home'
            })
          }, 1500)
        }
      })
    },
    toRegister() {
      uni.navigateTo({
        url: '/pages/register/index'
      })
    },
    toForgetPassword() {
      uni.navigateTo({
        url: '/pages/login/forget'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  padding: 40rpx;
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 60rpx;
  }
  
  .actions {
    margin-top: 60rpx;
    
    .links {
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
      color: #666;
      font-size: 28rpx;
      
      text {
        color: #2979ff;
      }
    }
  }
}
</style> 