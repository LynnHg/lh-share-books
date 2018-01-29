// orderdetail.js
var app = getApp();
const util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: "",
    details: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */

  backTo: function () {
    wx.navigateBack({
    })
  },
  bindpay: function (res) { // 付款
    var that = this;
    var orderMoney = that.data.details.orderMoney;
    var orderid = that.data.details.orderid;
    wx.showModal({
      title: '提示',
      content: '优先从余额扣款，确定支付吗？',
      success: function (res) {
        if (res.confirm) {
          //查询余额
          wx.request({
            url: 'http://l1669f6515.iok.la/book/user/searchByOpenid',
            data: {
              openid: app.globalData.openid,
            },
            method: 'GET',
            success: function (res) {
              var money = res.data[0].money;
              that.setData({
                money: money,
              })
              if (money >= orderMoney) {
                wx.request({
                  url: 'http://l1669f6515.iok.la/book/user/changeMoney',
                  data: {
                    openid: app.globalData.openid,
                    money: -orderMoney
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    if (res.statusCode === 200) {
                      var payTime = util.getTime();
                      wx.request({
                        url: 'http://l1669f6515.iok.la/book/order/updateorder',
                        data: {
                          orderid: orderid,
                          orderState: 2,// 待付款->已付款
                          orderMoney: orderMoney,
                          payTime: payTime
                        },
                        method: 'GET',
                        header: {
                          'content-type': 'application/json'
                        },
                        success: function (res) {
                          if (res.statusCode === 200) {
                            wx.showModal({
                              title: '通知',
                              content: '支付成功！',
                              showCancel: false,
                              success: function (res) {
                                if (res.confirm) {
                                  wx.reLaunch({
                                    url: '../orderlist/orderlist'
                                  })
                                }
                              }
                            })
                          }
                        }
                      });
                    }
                  }
                })
              } else {
                wx.showModal({
                  title: '余额不足',
                  content: '立即充值?',
                  showCancel: true,
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../wallet/balance/balance'
                      })
                    } else if (res.cancel) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('取消付款');
        }
      }
    })

  },
  cancelOrder: function (res) { // 取消订单
    var that = this;
    var orderid = that.data.details.orderid;
    wx.showModal({
      title: '通知',
      content: '确定要取消本次订单吗?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://l1669f6515.iok.la/book//order/deleteorder',
            method: 'GET',
            data: {
              orderid: orderid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.statusCode === 200) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true,
                  success: function () {
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '../orderlist/orderlist'
                      })
                    }, 1000)
                  }
                })
              } else {
                wx.showToast({
                  title: '取消失败',
                  image: '../../assets/images/failed.png',
                  duration: 2000
                })
              }
            }
          })
        } else {
          return;
        }
      }
    })
  },
  returnBook: function (res) { // 还书
    var that = this;
    var orderid = that.data.details.orderid;
    var storeLen = app.globalData.storeLen;
    var storeid = Math.ceil(Math.random() * storeLen); // 随机网点id
    wx.showModal({
      title: '通知',
      content: '确定要归还吗?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://l1669f6515.iok.la/book/store/searchById',
            method: 'GET',
            data: {
              storeid: storeid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var endTime = util.getTime();
              var bookEndPlace = res.data[0].storePlace;
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
                  wx.request({
                    url: 'http://l1669f6515.iok.la/book/order/returnAndUpdate',
                    data: {
                      orderid: orderid,
                      orderState: 0, // 进行中->已完成
                      endTime: endTime,
                      bookEndPlace: bookEndPlace
                    },
                    method: 'GET',
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      if (res.statusCode === 200) {
                        wx.showModal({
                          title: '通知',
                          content: '归还成功！',
                          showCancel: false,
                          success: function (res) {
                            if (res.confirm) {
                              wx.reLaunch({
                                url: '../orderlist/orderlist'
                              })
                            }
                          }
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        } else {
          return
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({ orderid: options.orderid });
    wx.request({
      url: 'http://l1669f6515.iok.la/book/order/getorderbyorderid',
      method: 'GET',
      data: {
        orderid: that.data.orderid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var types = res.data[0];
        switch (types.orderState) {
          case 0:
            types.state = '已完成';
            break;
          case 1:
            types.state = '待付款';
            break;
          case 2:
            types.state = '进行中';
            break;
        }
        that.setData({
          details: types
        })
      }
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