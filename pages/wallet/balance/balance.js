// balance.js
var app = getApp();
import API from '../../../shared/api/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    money:0
  },
  changeValue: function (e) {
    this.setData({ money: e.detail.value });
  },
  recharge:function(){
   var that =this
   if(that.data.money!=0){
     API.changeMoney({
       openid: app.globalData.openid,
       money: that.data.money
     }, function (res) {
       if (res.statusCode === 200) {
         wx.showModal({
           title: '通知',
           content: '余额充值成功！',
           showCancel: false,
           success: function (res) {
             if (res.confirm) {
               wx.navigateBack({
                 delta: 1
               })
             }
           }
         })
       } else {
         wx.showToast({
           title: '余额充值失败',
           image: '../../assets/images/failed.png',
           duration: 2000
         })
       }
     });
   }else{
     wx.showModal({
       title: '提示',
       content: '请输入充值金额',
       showCancel: false,
     })
   }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       balance:options.money
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