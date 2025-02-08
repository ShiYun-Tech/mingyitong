<template>
  <view class="container">
    <view class="register-box">
      <view class="title">注册</view>
      
      <u-form :model="form" ref="uForm">
        <u-form-item label="手机号" prop="phone">
          <u-input 
            v-model="form.phone"
            placeholder="请输入手机号"
            type="number"
            maxlength="11"
          />
        </u-form-item>
        
        <u-form-item label="验证码" prop="code">
          <view class="code-input">
            <u-input
              v-model="form.code"
              placeholder="请输入验证码"
              type="number"
              maxlength="6"
            />
            <u-button 
              size="mini"
              :disabled="!!timer"
              @click="sendCode"
            >{{ timer ? `${countdown}s` : '获取验证码' }}</u-button>
          </view>
        </u-form-item>
        
        <u-form-item label="密码" prop="password">
          <u-input
            v-model="form.password"
            type="password"
            placeholder="请设置6-20位密码"
          />
        </u-form-item>
        
        <u-form-item label="邀请码" prop="inviteCode">
          <u-input
            v-model="form.inviteCode"
            placeholder="选填"
          />
        </u-form-item>
      </u-form>

      <view class="actions">
        <u-button type="primary" @click="handleRegister">注册</u-button>
        <view class="login-link">
          已有账号？<text @click="toLogin">去登录</text>
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
        code: '',
        password: '',
        inviteCode: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { len: 6, message: '验证码为6位数字' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, max: 20, message: '密码长度在6-20个字符之间' }
        ]
      },
      timer: null,
      countdown: 60
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    sendCode() {
      if (!this.form.phone) {
        uni.showToast({
          title: '请先输入手机号',
          icon: 'none'
        })
        return
      }
      
      // 调用发送验证码API
      this.startCountdown()
    },
    startCountdown() {
      this.countdown = 60
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    handleRegister() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          // 调用注册API
          uni.showLoading({
            title: '注册中...'
          })
          
          // 模拟API调用
          setTimeout(() => {
            uni.hideLoading()
            uni.navigateTo({
              url: '/pages/auth/index'
            })
          }, 1500)
        }
      })
    },
    toLogin() {
      uni.navigateBack()
    }
  },
  onUnmounted() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
.register-box {
  padding: 40rpx;
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 60rpx;
  }
  
  .code-input {
    display: flex;
    align-items: center;
    gap: 20rpx;
  }
  
  .actions {
    margin-top: 60rpx;
    
    .login-link {
      text-align: center;
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