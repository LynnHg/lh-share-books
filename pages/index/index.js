//index.js
//获取应用实例
var app = getApp();
import API from '../../shared/api/index';
import tools from '../../shared/utils/tools';
import getStar from '../../shared/utils/getStar';
var QQMapWX = require('../../shared/utils/qqmap-wx-jssdk.min.js');
var WxNotificationCenter = require('../../shared/utils/WxNotificationCenter.js');
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
    navbar: ['图书列表', '附近网点','所有网点'],
    storelist: [],
    allstorelist: [],
    location: [],
    hideLoading: true,
    maxRange: 30
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
  },
  onHide: function () {
    var that = this
    that.data.hideaddress = that.data.address
  },
  onShow: function () {
    var that = this
   that.onLoad();
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
      scanType: 'qrCode',
      success: (res) => {
        that.setData({
          scene: res.result
        })
        wx.navigateTo({
          url: '../lendbook/lendbook?scene=' + res.result
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
      toRe: getStar.toRefresh()
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
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000,
          mask: true,
        })
        const parmas = {
          latitude: that.data.location.lat,
          longitude: that.data.location.lng
        };
        API.getAllStore(parmas, function (res) {
          wx.hideToast();
          var storelist = [];
          var allstorelist = res.data;
          allstorelist.forEach(function (item) {
            if (item.distance <= that.data.maxRange) {
              storelist.push(item);
            }
          })
          //按距离排序
          storelist = storelist.sort(tools.compare('distance'));
          allstorelist = allstorelist.sort(tools.compare('distance'));
          that.setData({
            storelist: storelist,
            allstorelist: allstorelist,
          })
          console.log(storelist)
          app.globalData.storeLen = storelist.length; // 保存附近网点个数
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    API.getAllBook({}, function (res) {
      var types = res.data;
      for (var i = 0; i < types.length; ++i) {
        var book = types[i];
        book.block = getStar.get_star(book.average);
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
    API.getAllBook({}, function (res) {
      var types = res.data;
      for (var i = 0; i < types.length; ++i) {
        var book = types[i];
        book.block = getStar.get_star(book.average);
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
      toRe: getStar.toRefresh()
    });
    that.toHandel();
  },
  upper: function (e) {

  },
  lower: function (e) {
    var that = this;
    API.getAllBook({}, function (res) {
      var types = res.data;
      for (var i = 0; i < types.length; ++i) {
        var book = types[i];
        book.block = getStar.get_star(book.average);
      }
      if (types.length == 0) {
        return;
      }
      that.setData({ bookList: types, count: that.data.count + types.length });
    });
  }

})
