// orderlist.js
var app = getApp()
Page({
  data: {
    orders: [],
    navbar: ['已完成', '进行中', '待付款'],
    currentTab: 0,
    flag: 0
  },
  bindpay: function (res) {
    console.log('请求支付')
    var that = this
    var orderMoney = res.currentTarget.dataset.ordermoney
    var orderid = res.currentTarget.dataset.orderid
    console.log(res)
    wx.showModal({
      title: '提示',
      content: '优先从余额扣款，确定支付吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://www.eton100.com/book/payOrder',
            data: {
              openid: app.globalData.openid,
              tradeid: 1,
              tradeWay: 4
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data == 0) {
                //生成随机字符串、订单号、签名接口
                wx.request({
                  url: 'https://www.eton100.com/book/paybymoney',
                  //openid: '' + app.globalData.openid + ''    
                  data: {
                    openid: app.globalData.openid,
                    money: orderMoney
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res)
                    that.setData({
                      tradeid: res.data.outtradeno
                    })
                    that.data.paydata = '<xml>'
                    that.data.paydata += '<appid>wxae68680b7a6ce738</appid>'
                    that.data.paydata += '<body>LH共享图书余额测试</body>'
                    that.data.paydata += '<mch_id>1480146792</mch_id>'
                    that.data.paydata += '<nonce_str>' + res.data.noncestr + '</nonce_str>'
                    that.data.paydata += '<notify_url>https://www.eton100.com/book/notify</notify_url>'
                    that.data.paydata += '<openid>' + app.globalData.openid + '</openid>'
                    that.data.paydata += '<out_trade_no>' + res.data.outtradeno + '</out_trade_no>'
                    that.data.paydata += '<spbill_create_ip>119.29.169.244</spbill_create_ip>'
                    that.data.paydata += '<total_fee>' + orderMoney + '</total_fee>'
                    that.data.paydata += '<trade_type>JSAPI</trade_type>'
                    that.data.paydata += '<sign>' + res.data.sign + '</sign>'
                    that.data.paydata += '</xml>'
                    console.log(that.data.paydata);
                    //统一下单接口
                    wx.request({
                      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
                      method: 'POST',
                      data: { payData: '' + that.data.paydata + '' },

                      header: {
                        'content-type': 'application/xml'
                      },
                      success: function (res) {
                        console.log(res.data);
                        var xmldata = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                        xmldata += res.data
                        console.log(xmldata);
                        //再次签名，生成时间戳，随机字符串。
                        wx.request({
                          url: 'https://www.eton100.com/book/paysign',
                          method: 'POST',
                          data: { xmldata: '' + xmldata + '' },
                          dataType: 'json',
                          header: {
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          success: function (res) {
                            console.log(res);
                            //微信小程序支付接口
                            wx.requestPayment({
                              'timeStamp': '' + res.data.timestamp + '',
                              'nonceStr': '' + res.data.nonceStr + '',
                              'package': 'prepay_id=' + res.data.Package + '',
                              'signType': 'MD5',
                              'paySign': '' + res.data.paySign + '',
                              'success': function (res) {
                                console.log(res);
                                wx.request({
                                  url: 'https://www.eton100.com/book/payOrder',
                                  data: {
                                    tradeid: that.data.tradeid,
                                    openid: app.globalData.openid,
                                    tradeWay: 5
                                  },
                                  method: 'POST',
                                })
                                wx.request({
                                  url: 'https://www.eton100.com/book/payend',
                                  data: { orderid: orderid },
                                  method: 'POST',
                                  success: function (res) {
                                    that.onLoad();
                                  },
                                  fail: function (res) { },
                                  complete: function (res) { },
                                })
                              },
                              'fail': function (res) {
                                console.log(res);
                              }
                            })
                          },
                          fail: function (res) {
                            console.log("payment");
                          }
                        })
                      },
                      fail: function (res) {
                        console.log("pay");
                      }

                    })


                  },
                  fail: function (res) {
                    console.log(res);
                  }
                  //请求失败
                })
              } else {
                wx.request({
                  url: 'https://www.eton100.com/book/payend',
                  data: { orderid: orderid },
                  method: 'POST',
                  success: function (res) {
                    that.onLoad();
                  },
                  fail: function (res) { },
                  complete: function (res) { },
                })
                wx.showToast({
                  title: '支付成功',
                  icon: 'SUCCESS',
                  duration: 1000,
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
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
          console.log(res.data)
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