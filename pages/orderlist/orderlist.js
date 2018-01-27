// orderlist.js
var app = getApp();
const getTime = require("../../utils/getTime");
Page({
  data: {
    orders: [],
    money: null,
    navbar: ['已完成', '进行中', '待付款'],
    currentTab: 0,
    flag: 0
  },
  bindpay: function (res) {
    var that = this;
    var orderMoney = res.currentTarget.dataset.ordermoney;
    var orderid = res.currentTarget.dataset.orderid;
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

  navbarTap: function (e) {
    var that = this
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if (that.data.currentTab == 0) {
      console.log(app.globalData.openid)
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
          var completed = [];
          types = types.length ? types.forEach(function (item) {
            if (item.orderState === 0) {
              item.state = '已完成';
              completed.push(item);
            }
          }) : null;
          that.setData({
            orders: completed
          })
        }
      })
    } else if (that.data.currentTab == 1) {
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
          var paid = [];
          types = types.length ? types.forEach(function (item) {
            if (item.orderState === 2) {
              item.state = '进行中';
              paid.push(item);
            }
          }) : null;
          that.setData({
            orders: paid
          })
        }
      })
    } else if (that.data.currentTab == 2) {
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
          that.setData({
            orders: pending
          })
        }
      })
    } else if (that.data.currentTab == 3) {
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

        }
      })
    }
  },
  hadpPay: function (e) {
    var that = this
  },
  noPay: function (e) {
    var that = this
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (that.data.currentTab == 0) {
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
          var completed = [];
          types = types.length ? types.forEach(function (item) {
            if (item.orderState === 0) {
              item.state = '已完成';
              completed.push(item);
            }
          }) : null;
          that.setData({
            orders: completed
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  upper: function (e) {
    var that = this
    console.log("已到顶部");
    that.onLoad()
  },
  lower: function (e) {
    console.log("已到底部");
  },
  onShow: function () {
    var that = this
    that.onLoad()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
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