// location.js
var QQMapWX = require('../../shared/utils/qqmap-wx-jssdk.min.js');
var WxNotificationCenter = require('../../shared/utils/WxNotificationCenter.js');
var that;
var qqmapsdk;
Page({
  onLoad: function (options) {
    that = this;
    qqmapsdk = new QQMapWX({
      key: 'JXCBZ-ADZCS-HRPO3-6A7GI-OPPOH-6CBKH'
    });
    that.reloadCurrent();
  },
  keywordTyping: function (e) {
    // 键盘不断录入绑定取值
    var keyword = e.detail.value;
    // 向腾讯地图接口发送请求
    qqmapsdk.getSuggestion({
      keyword: keyword,
      region: that.data.city,
      success: function (res) {
        // 保存地址数组
        that.setData({
          result: res.data
        });
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    });
  },
  addressTapped: function (res) {
    var title = res.currentTarget.dataset.title;
    var location = res.currentTarget.dataset.location;
    // 取出点中的地址，然后使用WxNotification回传给首页
    WxNotificationCenter.postNotificationName("addressSelectedNotification", title);
    WxNotificationCenter.postNotificationName("locationSelectedNotification", location);
    wx.navigateBack();

  },
  geoTapped: function () {
    var title = that.data.address;
    WxNotificationCenter.postNotificationName("addressSelectedNotification", title);
    wx.navigateBack();

  },
  reloadCurrent: function () {
    that.setData({
      address: '定位中...',
    });
    // 调用接口
    qqmapsdk.reverseGeocoder({
      poi_options: 'policy=2',
      get_poi: 1,
      success: function (res) {
        console.log(res)
        // 渲染给页面
        that.setData({
          address: res.result.formatted_addresses.recommend,
          result: res.result.pois,
          city: res.result.address_component.city
        });
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    });
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