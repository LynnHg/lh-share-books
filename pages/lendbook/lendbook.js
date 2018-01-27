// lendbook.js
var app = getApp();
const getTime = require("../../utils/getTime");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene: '',
    userState: null,
    orders: []
  },

  lendBook: function () {
    var that = this
    wx.request({
      url: "http://l1669f6515.iok.la/book/user/searchByOpenid",
      method: 'GET',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var info = res.data[0];
        that.setData({
          userState: info.userState
        });
        wx.request({
          url: 'http://l1669f6515.iok.la/book/order/getorderbyopenid',
          method: 'GET',
          data: {
            openid: app.globalData.openid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var types = res.data;
            var pending = [];
            types = types.length ? types.forEach(function (item) {
              if (item.orderState === 1) {
                item.state = '待付款';
                pending.push(item);
              }
            }) : null;
            if (info.userState === 1) {//不可借
              wx.showModal({
                title: '未交押金',
                content: '立即充值押金?',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../wallet/wallet'
                    })
                  } else if (res.cancel) {
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                }
              })
            } else if (info.userState === 0 && pending.length === 0) {//可借
              var startTime = getTime.getTime();
              var openid = app.globalData.openid;
              wx.request({
                url: 'http://l1669f6515.iok.la/book/store/searchById',
                method: 'GET',
                data: {
                  storeid: that.data.bookInfo.storeid
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  var storeInfo = res.data[0]; // 书籍所在网点信息
                  var orderState = 1;
                  var startTime = getTime.getTime();
                  var endTime = '';
                  var bookName = that.data.bookInfo.bookname;
                  var bookStartPlace = storeInfo.storePlace;
                  var bookEndPlace = '';
                  var orderMoney = 2;
                  var openid = app.globalData.openid;
                  var bookid = that.data.bookInfo.bookid;
                  var payTime = '';
                  var bookimgurl = that.data.bookInfo.bookimgurl;
                  var addOrder = {
                    orderState: 1,
                    startTime: startTime,
                    endTime: '',
                    bookName: that.data.bookInfo.bookName,
                    bookStartPlace: storeInfo.storePlace,
                    bookEndPlace: '',
                    orderMoney: 2,
                    openid: app.globalData.openid,
                    bookid: that.data.bookInfo.bookid,
                    payTime: '',
                    bookimgurl: that.data.bookInfo.bookimgurl
                  }
                  wx.request({
                    url: 'http://l1669f6515.iok.la/book/order/add',
                    method: 'GET',
                    data: addOrder,
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      console.log(res)
                    }
                  });
                }
              })
              wx.showModal({
                title: '借书成功',
                content: '立即查看订单？',
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../orderlist/orderlist',
                    })
                  } else if (res.cancel) {
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                }
              })
            } else if (pending.length !== 0) {
              wx.showModal({
                title: '有未付款订单',
                content: '立即支付?',
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../orderlist/orderlist',
                    })
                  } else if (res.cancel) {
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                }
              })
            }
          }
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ scene: options.scene });
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1001
    })
    wx.request({
      url: 'http://l1669f6515.iok.la/book/searchbyid',
      data: {
        bookid: that.data.scene
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function (res) {
        that.setData({
          bookInfo: res.data[0]
        })
      },
      fail: function (res) { },
      complete: function (res) { },
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