// orderdetail.js
var app = getApp();
const getTime = require("../../utils/getTime");
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
  bindpay: function (res) {
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
                      var payTime = getTime.getTime();
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
  onLoad: function (options) {
    var that = this;
    that.setData({ orderid: options.orderid });
    wx.request({
      url: 'http://l1669f6515.iok.la/book/order/allorder',
      method: 'GET',
      data: {
        orderid: that.data.orderid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var types = res.data[0];
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