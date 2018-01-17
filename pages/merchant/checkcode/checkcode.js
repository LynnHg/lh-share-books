// checkcode.js
var star = require("../../../utils/star");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareCode:"",
    bookinfo: []
  },

  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'https://www.eton100.com/book/addbookAgain', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        scene: e.detail.value.scene,
        storeid: that.data.storeid,
        shareCode: that.data.shareCode
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.request({
          url: 'http://localhost:8080/book/addPoint', //仅为示例，并非真实的接口地址
          method: 'GET',
          data: {
            openid: app.globalData.openid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {

          }
        })
        wx.redirectTo({
          url: '../../success/success',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.shareCode)
    var that = this
    that.setData({
      shareCode: options.shareCode
    })
    wx.request({
      url: 'https://www.eton100.com/book/IdFormat',
      method: 'GET',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          storeid: res.data
        })
      }
    })
    wx.request({
      url: 'https://www.eton100.com/book/SearchBookBySharecode',
      method: 'POST',
      data: {
        shareCode: that.data.shareCode
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ bookinfo: res.data });
      }
    })
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