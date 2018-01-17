// club.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    history:[]
  },
  history:function(){
   wx.navigateTo({
     url: '../clubs/clubs',
   })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.activeName == "" ||
      e.detail.value.avtiveTime == ""||
      e.detail.value.activePlace == ""||
      e.detail.value.activeText == ""){
      wx.showToast({
        title: '请填写内容',
      })
    }else{
      wx.request({
        url: 'https://www.eton100.com/book/bookclub/add', //仅为示例，并非真实的接口地址
        method: 'GET',
        data: {
          activeName: e.detail.value.activeName,
          avtiveTime: e.detail.value.avtiveTime,
          activePlace: e.detail.value.activePlace,
          activeText: e.detail.value.activeText,
          openid: app.globalData.openid,
          activeState: 1
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '发布成功',
            duration: 1000
          })
          wx.navigateBack({

          })
        }
      })
    }
    
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