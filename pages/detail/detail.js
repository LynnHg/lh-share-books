// pages/detail/detail.js
import API from '../../shared/api/index';
import getStar from '../../shared/utils/getStar';
const app = getApp();
Page({
  data: {
    bookid: "",
    bookInfo: [],
    love: false
  },
  addLove: function () {
    const that = this;
    that.setData({
      love: !that.data.love
    });
    if (that.data.love) {

      API.addLovingbook({
        openid: app.globalData.openid,
        bookid: that.data.bookInfo.bookid
      }, function (res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '已收藏',
            icon: 'success',
            duration: 1000
          });
        }
      })
    } else {
      wx.showToast({
        title: '已取消收藏',
        icon: 'success',
        duration: 1000
      })
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({ bookid: options.bookid });
    API.getBookById({ bookid: that.data.bookid }, function (res) {
      that.setData({ bookInfo: res.data[0], block: getStar.get_star(res.data[0].average) });
    });

    //随机推荐
    API.getAllBook({}, function (res) {
      const len = res.data.length;
      let recommendBooks = [];
      for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * len);
        recommendBooks.push(res.data[random]);
      }
      for (let i = 0; i < recommendBooks.length; ++i) {
        let book = recommendBooks[i];
        book.block = getStar.get_star(book.average);
      }
      that.setData({
        recommendBooks
      })
    });

  },
  onReady: function () {
    // 页面渲染完成
    wx.hideToast();
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})