// addbook.js
var app = getApp();
import API from '../../shared/api/index';
import tools from '../../shared/utils/tools';

Page({
  data: {
  },
  formSubmit: function (e) {
    const sharedTime = tools.getTime();
    API.manualAddBook({
      bookimgurl: e.detail.value.imgurl,
      bookname: e.detail.value.bookname,
      author: e.detail.value.bookauthor,
      bookProvider: e.detail.value.bookProvider,
      bookManPhone: e.detail.value.bookManPhone,
      openid: app.globalData.openid,
      sharedTime: sharedTime
    }, function (res) {
      if (res.statusCode === 200) {
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000,
          mask: true,
        })
        wx.navigateTo({
          url: '../sharebook/history/history',
        })
      }
    });
  },
  formReset: function (e) {
    this.setData({
      chosen: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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