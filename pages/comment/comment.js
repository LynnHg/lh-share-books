// comment.js
var app = getApp();
import API from '../../shared/api/index';
import tools from '../../shared/utils/tools';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookid:"",
    comment:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit: function (e) {
    var that = this;
    var commentTime = tools.getTime();
    API.addComment({
      commentTime,
      commentText: e.detail.value.commentText,
      commentState: 0,
      bookid: that.data.bookid,
      openid: app.globalData.openid,
      nickName: that.data.userInfo.nickName,
      avatarUrl: that.data.userInfo.avatarUrl
    },function(res){
      wx.showToast({
        title: '已提交评论',
        icon: 'success',
        duration: 1000
      });
      setTimeout(function(){
        wx.navigateBack({
          delta: 1
        })
      },1000)
    });
  },
  formReset: function (e) {
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      bookid: options.bookid
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    API.getCommentByBookid({ bookid: options.bookid},function (res){
      that.setData({
        comment: res.data,
      })
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
    this.onLoad();
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