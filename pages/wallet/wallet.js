// wallet.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wallet: null
  },
  depositpay: function (res) {
    var that = this
    //生成随机字符串、订单号、签名接口
    wx.request({
      url: 'http://l1669f6515.iok.la/book/user/changeDeposit',
      method: 'GET',
      data: {
        openid: app.globalData.openid,
        deposit: 99
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          wx.showModal({
            title: '通知',
            content: '押金充值成功！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '押金充值失败',
            image: '../../assets/images/failed.png',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://l1669f6515.iok.la/book/user/searchByOpenid',
      data: {
        openid: app.globalData.openid
      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var info = res.data[0];
        that.setData({
          'wallet.deposit': info.deposit,
          'wallet.money': info.money,
          'wallet.point': info.point
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },

  returndeposit: function () {
    var that = this;
    if (that.data.deposit == 0) {
      wx.showModal({
        title: '提示',
        content: '无押金可退',
        showCancel: false,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '押金将原路返还，确认退回吗？',
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: 'https://www.eton100.com/book/refund',
              data: { openid: app.globalData.openid },
              method: 'POST',
              header: { 'content-type': 'application/json' },

              success: function (res) {
                console.log(res)
                if (res.data == 1) {
                  wx.showToast({
                    title: '申请退款成功',
                    icon: 'SUCCESS',
                    duration: 1000,
                    mask: true,
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '当前还有未付款订单',
                    showCancel: false,
                  })
                }
              },
              fail: function (res) { },
              complete: function (res) {
                that.onLoad();
              },
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})