
var star = require("../../../utils/star");
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
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'https://www.eton100.com/book/addbook02', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        bookimgurl: that.data.bookinfo.image,
        bookname: that.data.bookinfo.title,
        author: that.data.bookinfo.author,
        scene: e.detail.value.scene,
        storeid: that.data.storeid,
        publisher: that.data.bookinfo.publisher,
        pubdate: that.data.bookinfo.pubdate,
        average: that.data.bookinfo.rating.average,
        summary: that.data.bookinfo.summary,
        tags0: that.data.bookinfo.tags[0].title,
        tags1: that.data.bookinfo.tags[1].title,
        tags2: that.data.bookinfo.tags[2].title,
        isbn10: that.data.bookinfo.isbn10,
        isbn13: that.data.bookinfo.isbn13
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        wx.navigateBack({

        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://api.douban.com/v2/book/isbn/' + options.isbn,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res.statusCode)
        if (res.statusCode == 404) {
          wx.redirectTo({
            url: '../addbook/addbook'
          })
        }
        that.setData({
          bookinfo: res.data,
          block: '../'+star.get_star(res.data.rating.average)
        })
        console.log(that.data.bookinfo)
      }

    })
    //获取storeid
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