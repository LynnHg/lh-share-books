// pages/detail/detail.js
import API from '../../shared/api/index';
var star = require("../../utils/star");
Page({
  data:{
      bookid:"",
      bookInfo:[]
  },
  onLoad:function(options){
      // 页面初始化 options为页面跳转所带来的参数
      var that=this;
      that.setData({ bookid:options.bookid});
      API.getBookById({bookid:that.data.bookid},function(res){
        that.setData({ bookInfo: res.data[0], block: star.get_star(res.data[0].average)});
      });
  },
  onReady:function(){
    // 页面渲染完成
   wx.hideToast();
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})