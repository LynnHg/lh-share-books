// club.js
var app = getApp();
import API from '../../shared/api/index';
import tools from '../../shared/utils/tools';

Page({
  data: {
    userInfo: {},
    history: []
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
    });
    API.getAllUser({}, function (res) {
      that.setData({
        allUser: res.data
      })
    })
    API.getAllCircle({}, function (res) {
      let now = tools.getTime();
      let info = [];
      let clubs = [];
      res.data.forEach((item) => {
        item.time = new Date(item.circleTime);
        info.push(item);
      });
      info = info.sort(tools.recompare('time'));
      info.forEach((item)=>{
        const now = new Date();
        const time = new Date(item.time);
        const result = now.getTime() - time.getTime();
        //计算出相差天数
        let days = Math.floor(result / (24 * 3600 * 1000));
        //计算出小时数
        let leave1 = result % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000);
        if (days) {
          item.timeStamp = days + '天';
        } else if (hours) {
          item.timeStamp = hours + '小时';
        } else if (minutes) {
          item.timeStamp = minutes + '分钟';
        } else if (seconds) {
          item.timeStamp = seconds + '秒';
        }
        clubs.push(item);
      });
      that.setData({
        history: clubs
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