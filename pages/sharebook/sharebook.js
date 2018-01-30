// sharebook.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbn: ''
  },
  sharebook: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        console.log(res);
        that.data.isbn = res.result;
        wx.navigateTo({
          url: './sharecode/sharecode?isbn=' + that.data.isbn
        })
      },
      fail: function (res) { wx.hideToast() }
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
      mask: true,
    })
  }, 
  shareHistory: function() {
    var that = this
        wx.navigateTo({
          url: './history/history' 
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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