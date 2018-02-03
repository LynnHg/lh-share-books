// clubs.js
import API from '../../shared/api/index';

Page({
  data: {
    history:""
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  addAct: function() {
    wx.navigateTo({
      url: './addact/addact',
    })
  },

  onLoad: function (options) {
    var that = this;
    API.getAllAct({}, function (res) {
      that.setData({
        history: res.data
      })
    });
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
    var that = this;
    API.getAllAct({}, function (res) {
      that.setData({
        history: res.data
      })
    });
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