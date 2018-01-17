//app.js
App({
  onLaunch: function() {
    var that = this
    //调用API从本地缓存中获取数据
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.eton100.com/book/openid',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function(res) {
              console.log('openid:'+res.data.openid)
              that.globalData.openid = res.data.openid

            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          console.log(res)
          that.globalData.userInfo = res.userInfo
          console.log(that.globalData.userInfo)
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    openid : null
  }
})
