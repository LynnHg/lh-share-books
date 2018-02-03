// orderdetail.js
var app = getApp();
import API from '../../shared/api/index';
import tools from '../../shared/utils/tools';

Page({
  data: {
    orderid: "",
    details: [],
  },
  backTo: function () {
    wx.navigateBack({
    })
  },
  bindpay: function (res) { // 付款
    var that = this;
    var orderMoney = that.data.details.orderMoney;
    var orderid = that.data.details.orderid;
    var bookid = that.data.details.bookid; // 书籍id
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
              });
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
    var orderid = that.data.details.orderid;
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
    var orderid = that.data.details.orderid;
    var bookid = that.data.details.bookid;
    var storeLen = app.globalData.storeLen;
    var storeid = Math.ceil(Math.random() * storeLen); // 随机网点id
    wx.showModal({
      title: '通知',
      content: '确定要归还吗?',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 1000,
            mask: true,
          })
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
                orderState: 0, // 待归还->已归还
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
              });
            });
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
    API.getOrderByOrderid({
      orderid: that.data.orderid
    }, function (res) {
      var types = res.data[0];
      switch (types.orderState) {
        case 0:
          types.state = '已归还';
          break;
        case 1:
          types.state = '待付款';
          break;
        case 2:
          types.state = '待归还';
          break;
      }
      that.setData({
        details: types
      })
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