
var star = require("../../../utils/star");
const util = require("../../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbn: '',
    bookinfo: []
  },

  formSubmit: function (e) {
    var that = this;
    var storeLen = app.globalData.storeLen;
    var storeid = Math.ceil(Math.random() * storeLen); // 随机网点id
    var sharedTime = util.getTime();
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'http://l1669f6515.iok.la/book/book/shareAdd', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        bookname: that.data.bookinfo.title,
        author: that.data.bookinfo.author,
        bookManPhone: e.detail.value.bookManPhone,
        bookState: 1,
        bookMoney: 2,
        bookcount: 0,
        bookIntroduce: that.data.bookinfo.summary,
        amount: 1,
        storeid: storeid,
        bookimgurl: that.data.bookinfo.image,
        average: that.data.bookinfo.rating.average,
        publisher: that.data.bookinfo.publisher,
        pubdate: that.data.bookinfo.pubdate,
        tags0: that.data.bookinfo.tags[0].title,
        tags1: that.data.bookinfo.tags[1].title,
        tags2: that.data.bookinfo.tags[2].title,
        bookProvider: e.detail.value.bookProvider,
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if ( res.statusCode === 200) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          wx.navigateTo({
            url: '../history/history',
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000,
      mask: true,
    })
    wx.request({
      url: 'http://l1669f6515.iok.la/book/searchByIsbn/',
      header: {
        "Content-Type": "json"
      },
      data: {
        isbn: options.isbn
      },
      success: function (res) {
        wx.hideToast();
        if (res.statusCode == 404) {
          wx.redirectTo({
            url: '../addbook/addbook'
          })
        }
        that.setData({
          bookinfo: res.data,
          block: '../' + star.get_star(res.data.rating.average)
        })
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