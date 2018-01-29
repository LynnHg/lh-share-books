// wallet.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wallet: null
  },
  depositpay: function (res) {// 押金充值
    var that = this;
    if (!that.data.wallet.deposit) {
      wx.showModal({
        title: '通知',
        content: '确定充值押金吗？',
        success: function (res) {
          if (res.confirm) {

            wx.request({
              url: 'http://l1669f6515.iok.la/book/user/changeDeposit',
              method: 'GET',
              data: {
                openid: app.globalData.openid,
                deposit: 99
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if (res.statusCode === 200) {
                  wx.showModal({
                    title: '通知',
                    content: '押金充值成功！',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({
                          delta: 1
                        })
                      }
                    }
                  })
                } else {
                  wx.showToast({
                    title: '押金充值失败',
                    image: '../../assets/images/failed.png',
                    duration: 2000
                  })
                }
              }
            })


          } else {
            // wx.navigateBack({
            //   delta: 1
            // })
            return;
          }
        }
      })
    } else {
      wx.showModal({
        title: '通知',
        content: '已交押金，无需再次充值',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://l1669f6515.iok.la/book/user/searchByOpenid',
      data: {
        openid: app.globalData.openid
      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var info = res.data[0];
        that.setData({
          'wallet.deposit': info.deposit,
          'wallet.money': info.money,
          'wallet.point': info.point
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },

  returndeposit: function () { // 退押金
    var that = this;
    if (that.data.wallet.deposit == 0) {
      wx.showModal({
        title: '提示',
        content: '无押金可退',
        showCancel: false,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '押金将原路返还，确认退回吗？',
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
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
                if (pending.length !== 0) {
                  wx.showModal({
                    title: '有未付款订单',
                    content: '押金不可退！',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({
                          delta: 1
                        })
                      }
                    }
                  })
                } else {
                  wx.request({
                    url: 'http://l1669f6515.iok.la/book/user/changeDeposit',
                    method: 'GET',
                    data: {
                      openid: app.globalData.openid,
                      deposit: 0
                    },
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      if (res.statusCode === 200) {
                        wx.showModal({
                          title: '通知',
                          content: '押金退款成功！',
                          showCancel: false,
                          success: function (res) {
                            if (res.confirm) {
                              wx.navigateBack({
                                delta: 1
                              })
                            }
                          }
                        })
                      } else {
                        wx.showToast({
                          title: '押金退款失败',
                          image: '../../assets/images/failed.png',
                          duration: 2000
                        })
                      }
                    }
                  })
                }
              }
            });

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
        fail: function (res) { },
        complete: function (res) { },
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
  onShow: function () {
    this.onLoad();
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