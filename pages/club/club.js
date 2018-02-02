// club.js
var app = getApp();
import API from '../../shared/api/index';
import tools from '../../shared/utils/tools';

Page({
  data: {
    userInfo: {},
    history:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    API.getAllCircle({},function(res){
      let info = res.data;
      let temp = info.map((item)=>{
        API.getUserByOpenid({openid: item.openid},
        function(res){
          item.nickName = res.data[0].nickName; 
          item.avatarUrl = res.data[0].avatarUrl;
        })
        return item;
      })
      console.log(temp)
      that.setData({
        history: temp
      })
      console.log(that.data.history)
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