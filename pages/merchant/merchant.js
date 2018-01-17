
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '共享图书商户版',
    userInfo: {},
    isbn: ''
  },
  //事件处理函数
  onShow: function () {
    wx.hideToast()
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value.shareCode)
    wx.navigateTo({
      url: './checkcode/checkcode?shareCode=' + e.detail.value.shareCode,
    })
    
  },
  addbook: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        console.log(res);
        that.data.isbn = res.result;
        wx.navigateTo({
          url: './addbookauto/addbookauto?isbn=' + that.data.isbn
        })
      },
      fail: function (res) { wx.hideToast() }
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000,
      mask: true,
    })
  },
  
  returnbook: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        console.log(res)
        wx.request({
          url: 'https://www.eton100.com/book/scanCode',
          method: 'POST',
          data: {
            openid: app.globalData.openid,
            scene: res.path.substring(24)
          },
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            wx.showToast({
              title: '还书成功',
              icon: 'success',
              duration: 100,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})
