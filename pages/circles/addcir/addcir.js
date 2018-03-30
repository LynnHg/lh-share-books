import API from '../../../shared/api/index';
import tools from '../../../shared/utils/tools';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: { 
  }, 
  setText: function (e) {
    const that = this;
    that.setData({
      circleText: e.detail.value
    })
  },
  handleadd: function() {
    const that = this;
    var circleTime = tools.getTime();
    API.addCircle({
      openid: app.globalData.openid,
      circleText: that.data.circleText,
      circleState: 0,
      circleTime,
      nickName: that.data.userInfo.nickName,
      avatarUrl: that.data.userInfo.avatarUrl
    },function(res) {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(function(){
        wx.navigateBack({
          delta: 1
        })
      },1000)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
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