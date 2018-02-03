import API from '../../../shared/api/index';
const WxNotificationCenter = require('../../../shared/utils/WxNotificationCenter.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  setName: function(e) {
    const that = this;
    that.setData({
      activeName: e.detail.value
    })
  },
  setText: function (e) {
    const that = this;
    that.setData({
      activeText: e.detail.value
    })
  },
  setTime: function (e) {
    const that = this;
    that.setData({
      activeTime: e.detail.value
    })
  },
  navigateToSearch: function () {
    wx.navigateTo({
      url: '../../location/location'
    });
  },
  getAddress: function (address) {
    const that = this;
    that.setData({
      address: address
    });
  },
  handleadd: function() {
    const that = this;
    API.addAct({
      openid: app.globalData.openid,
      activeName: that.data.activeName,
      activeText: that.data.activeText,
      activeTime: that.data.activeTime,
      activePlace: that.data.address
    },function(res) {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function(){
        wx.navigateBack({
          delta: 1
        })
      },2000)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    WxNotificationCenter.addNotification("addressSelectedNotification", that.getAddress, that);
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