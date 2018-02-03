// pages/detail/detail.js
import API from '../../shared/api/index';
import getStar from '../../shared/utils/getStar';
Page({
  data: {
    bookid: "",
    bookInfo: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({ bookid: options.bookid });
    API.getBookById({ bookid: that.data.bookid }, function (res) {
      that.setData({ bookInfo: res.data[0], block: getStar.get_star(res.data[0].average) });
    });
    API.getAllBook({},function(res){
      const len = res.data.length;
      let recommendBooks = [];
      for (let i=0; i<3; i++) {
        let random = Math.floor(Math.random()*len);
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