// pages/search/search.js
const request = require("../../utils/requests");
var star = require("../../utils/star");
Page({
  data: {
    value: "",
    bookList: [],
    count: 0
  },
  changeValue: function (e) {
    this.setData({ value: e.detail.value });
    var that = this;
    that.searchHandel();
  },
  searchHandel: function () {
    var that = this;
    if (that.data.value.replace(/\s/g, "")) {
      request.searchBook({ bookname: that.data.value }, function (res) {
        var types = res.data;
        for (var i = 0; i < types.length; ++i) {
          var book = types[i];
          book.block = star.get_star(book.average);
        }
        if (types.length == 0) {
          that.setData({
            bookList: null
          })
          return; }
        that.setData({ bookList: types, count: that.data.count + types.length });
      })
    }
    else {
      that.setData({
        bookList: null
      })
    }
  },
  toSearch: function () {
    var that = this;
    that.searchHandel();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
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