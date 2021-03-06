// lendbook.js
var app = getApp();
import API from '../../shared/api/index';
import tools from '../../shared/utils/tools';
Page({
  data: {
    scene: '',
    userState: null,
    orders: []
  },
  lendBook: function () {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
      mask: true,
    })
    API.getAllUser({}, function (res) {
      var isReged = res.data.some(function (item) {
        return item.openid === app.globalData.openid
      });
      if (!isReged) { // 未注册
        wx.showModal({
          title: '未注册',
          content: '立即注册?',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../personinfo/personinfo'
              })
            } else if (res.cancel) {
              wx.switchTab({
                url: '../index/index',
              })
            }
          }
        })
      } else { //已注册
        API.getUserByOpenid({
          openid: app.globalData.openid
        }, function (res) {
          var info = res.data[0];
          that.setData({
            userState: info.userState
          });
          API.getOrderByOpenid({
            openid: app.globalData.openid
          }, function (res) {
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
              var startTime = tools.getTime();
              var openid = app.globalData.openid;
              API.getStoreById({
                storeid: that.data.bookInfo.storeid
              }, function (res) {
                var storeInfo = res.data[0]; // 书籍所在网点信息
                var startTime = tools.getTime();
                var params = {
                  orderState: 1,
                  startTime: startTime,
                  endTime: '',
                  bookName: that.data.bookInfo.bookname,
                  bookStartPlace: storeInfo.storePlace,
                  bookEndPlace: '',
                  orderMoney: that.data.bookInfo.bookMoney,
                  openid: app.globalData.openid,
                  bookid: that.data.bookInfo.bookid,
                  payTime: '',
                  bookimgurl: that.data.bookInfo.bookimgurl
                }
                API.addOrder(params, function (res) {
                  wx.hideToast();
                  wx.showModal({
                    title: '借书成功',
                    content: '立即查看订单？',
                    success: function (res) {
                      if (res.confirm) {
                        wx.reLaunch({
                          url: '../orderlist/orderlist',
                        })
                      } else if (res.cancel) {
                        wx.switchTab({
                          url: '../index/index',
                        })
                      }
                    }
                  })
                })
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
          })
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
    API.getBookById({ bookid: that.data.scene }, function (res) {
      that.setData({
        bookInfo: res.data[0]
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