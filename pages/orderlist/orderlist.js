// orderlist.js
var app = getApp();
import API from '../../shared/api/index';
import tools from '../../shared/utils/tools';

Page({
  data: {
    orders: [],
    money: null,
    navbar: ['已完成', '进行中', '待付款'],
    currentTab: 0,
    flag: 0
  },
  bindpay: function (res) { // 支付
    var that = this;
    var orderMoney = res.currentTarget.dataset.ordermoney; // 订单金额
    var orderid = res.currentTarget.dataset.orderid; // 订单id
    var bookid = res.currentTarget.dataset.bookid; // 书籍id
    var payTime = tools.getTime();
    wx.showModal({
      title: '提示',
      content: '优先从余额扣款，确定支付吗？',
      success: function (res) {
        if (res.confirm) {
          //查询余额
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 1000,
            mask: true,
          })
          API.getUserByOpenid({
            openid: app.globalData.openid,
          }, function (res) {
            var money = res.data[0].money;
            that.setData({
              money: money,
            })
            if (money >= orderMoney) {
              API.pay({
                openid: app.globalData.openid,
                money: -orderMoney,
                orderid: orderid,
                orderState: 2,// 待付款->已付款
                orderMoney: orderMoney,
                payTime: payTime,
                bookid: bookid,
              }, function (res) {
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
          })
        } else if (res.cancel) {
          console.log('取消付款');
        }
      }
    })

  },
  cancelOrder: function (res) { // 取消订单
    var that = this;
    var orderid = res.currentTarget.dataset.orderid;
    wx.showModal({
      title: '通知',
      content: '确定要取消本次订单吗?',
      success: function (res) {
        if (res.confirm) {
          API.deleteOrder({
            orderid: orderid
          }, function (res) {
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
          })
        } else {
          return;
        }
      }
    })
  },
  returnBook: function (res) { // 还书
    var that = this;
    var orderid = res.currentTarget.dataset.orderid;
    var bookid = res.currentTarget.dataset.bookid;
    var storeLen = app.globalData.storeLen;
    var storeid = Math.ceil(Math.random() * storeLen); // 随机网点id
    wx.showModal({
      title: '通知',
      content: '确定要归还吗?',
      success: function (res) {
        if (res.confirm) {
          API.getStoreById({
            storeid: storeid
          }, function (res) {
            var endTime = tools.getTime();
            var bookEndPlace = res.data[0].storePlace;
            API.getOrderByOpenid({
              openid: app.globalData.openid
            }, function (res) {
              API.returnBook({
                openid: app.globalData.openid,
                orderid: orderid,
                orderState: 0, // 进行中->已完成
                endTime: endTime,
                bookEndPlace: bookEndPlace,
                bookid: bookid,
                storeid: storeid
              }, function (res) {
                if (res.statusCode === 200) {
                  wx.showModal({
                    title: '通知',
                    content: '归还成功,积分+1！',
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
              })
            })
          })
        } else {
          return
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
      API.getOrderByOpenid({
        openid: app.globalData.openid
      }, function (res) {
        var types = res.data;
        var completed = [];
        types = types.length ? types.forEach(function (item) {
          if (item.orderState === 0) {
            item.state = '已完成';
            item.time = new Date(item.startTime);
            completed.push(item);
          }
        }) : null;
        completed = completed.sort(tools.recompare('time'));
        that.setData({
          orders: completed
        })
      })
    } else if (that.data.currentTab == 1) {
      API.getOrderByOpenid({
        openid: app.globalData.openid
      }, function (res) {
        var types = res.data;
        var paid = [];
        types = types.length ? types.forEach(function (item) {
          if (item.orderState === 2) {
            item.state = '进行中';
            item.time = new Date(item.startTime);
            paid.push(item);
          }
        }) : null;
        paid = paid.sort(tools.recompare('time'));
        that.setData({
          orders: paid
        })
      })
    } else if (that.data.currentTab == 2) {
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
        that.setData({
          orders: pending
        })
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
      API.getOrderByOpenid({
        openid: app.globalData.openid
      }, function (res) {
        var types = res.data;
        var completed = [];
        types = types.length ? types.forEach(function (item) {
          if (item.orderState === 0) {
            item.state = '已完成';
            item.time = new Date(item.startTime);
            completed.push(item);
          }
        }) : null;
        completed = completed.sort(tools.recompare('time'));
        that.setData({
          orders: completed
        })
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