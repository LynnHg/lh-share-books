//index.js
//获取应用实例
var app = getApp()
const request = require("../../utils/requests");
var star = require("../../utils/star");
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var qqmapsdk;
Page({
  data: {
    motto: 'L H\n共 享 图 书',
    userInfo: '',
    scene: null,
    value: '',
    count: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    toRe: 0,
    address: '',
    hideaddress: '',
    currentTab: 0,
    navbar: ['图书列表', '附近网点'],
    storelist: [],
    location: []
  },
  comment: function () {
    wx.showToast({
      title: '查看评论',
    })
  },
  navbarTap: function (e) {
    var that = this
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if (that.data.currentTab == 1) {
      //storellist

    }
  },
  onHide: function () {
    var that = this
    that.data.hideaddress = that.data.address
  },
  onShow: function () {
    var that = this
    if (that.data.hideaddress && that.data.hideaddress != that.data.address) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        image: '',
        duration: 1000,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      wx.request({
        url: 'http://l1669f6515.iok.la/book/store/allstorelist',
        method: 'GET',
        data: {//经纬度city
          city: "株洲",
          latitude: that.data.location.lat,
          longitude: that.data.location.lng
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            storelist: res.data
          })
        }
      })
    }
  },
  changeValue: function (e) {
    this.setData({ value: e.detail.value });
  },
  toSearch: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  change: function () {
  },
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        that.data.scene = res.path.substring(24)
        wx.navigateTo({
          url: '../lendbook/lendbook?scene=' + that.data.scene
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    if (that.data.scene) {
      wx.navigateTo({
        url: '../lendbook/lendbook?scene=' + that.data.scene
      })
    }

    that.setData({
      toRe: star.toRefresh()
    });
    //定位
    qqmapsdk = new QQMapWX({
      key: 'BJFBZ-ZFTHW-Y2HRO-RL2UZ-M6EC3-GMF4U'
    });
    that.setData({
      address: '正在定位中...',
    });
    // 调用接口
    qqmapsdk.reverseGeocoder({
      poi_options: 'policy=2',
      get_poi: 1,
      success: function (res) {
        // 渲染给页面
        that.setData({
          address: res.result.formatted_addresses.recommend,
          result: res.result.pois,
          city: res.result.address_component.city,
          location: res.result.location
        });
        wx.request({
          url: 'http://l1669f6515.iok.la/book/store/allstorelist',
          method: 'GET',
          data: {//经纬度city
            city: "株洲",
            latitude: that.data.location.lat,
            longitude: that.data.location.lng
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.setData({
              storelist: res.data
            })
          }
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    });
    // 注册通知
    WxNotificationCenter.addNotification("addressSelectedNotification", that.getAddress, that)
    // 注册通知
    WxNotificationCenter.addNotification("locationSelectedNotification", that.getLocation, that)
    //获取图书列表
    request.getBookList({ str: "" }, function (res) {
      var types = res.data;
      console.log('books list:')
      console.log(types)
      for (var i = 0; i < types.length; ++i) {
        var book = types[i];
        book.block = star.get_star(book.average);
      }
      if (types.length == 0) {
        return;
      }
      that.setData({ bookList: types, count: that.data.count + types.length });
    });


  },
  navigateToSearch: function () {
    wx.navigateTo({
      url: '../location/location'
    });
  },
  getAddress: function (address) {
    var that = this
    that.setData({
      address: address
    });
  },
  getLocation: function (location) {
    var that = this
    that.setData({
      location: location
    });
  },


  toHandel: function () {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    request.getBookList({ str: "" }, function (res) {
      var types = res.data;
      for (var i = 0; i < types.length; ++i) {
        var book = types[i];
        book.block = star.get_star(book.average);
      }
      if (types.length == 0) {
        return;
      }
      that.setData({ bookList: types, count: that.data.count + types.length });
    });
  },


  toRefresh: function (e) {
    var that = this;
    this.setData({
      toRe: star.toRefresh()
    });
    that.toHandel();
  },

  upper: function (e) {

  },


  lower: function (e) {
    var that = this;
    request.getBookList(function (res) {
      var types = res.data;
      console.log('books list:')
      console.log(types)
      // for (var i = 0; i < types.length; ++i) {
      //   var book = types[i];
      //   book.block = star.get_star(book.average);
      // }
      // if (types.length == 0) {
      //   return;
      // }
      // that.setData({ bookList: types, count: that.data.count + types.length });
    });
  }

})
