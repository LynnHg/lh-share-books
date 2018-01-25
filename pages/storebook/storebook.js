// storebook.js
const request = require("../../utils/requests");
var star = require("../../utils/star");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeid:"",
    value: "",
    bookList: [],
    count: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.storeid)
    that.setData({ storeid: options.storeid });
    wx.request({
      url: 'http://l1669f6515.iok.la/book/SearchBookByStoreid',
      method: 'GET',
      data: {
        storeid: that.data.storeid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var types = res.data;
        for (var i = 0; i < types.length; ++i) {
          var book = types[i];
          if (book.bookState === 0) {
            book.state = '未入库';
          } else if (book.bookState === 1) {
            book.state = '在馆';
          } else if (book.bookState === 2) {
            book.state = '借出';
          }
          book.block = star.get_star(book.average);
        }
        if (types.length == 0) {
          return;
        }
        that.setData({ bookList: types, count: that.data.count + types.length });
        console.log(that.data.bookList);
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