// orderdetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid:"",
    details:[],
    paydata:null
  },

  /**
   * 生命周期函数--监听页面加载
   */

  backTo: function () {
    wx.navigateBack({
    })
  },

  onLoad: function (options) {
  
    var that = this;
    that.setData({ orderid: options.orderid });
   /*
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    */
    wx.request({
      url: 'https://www.eton100.com/book/getOrderDetail',
      method: 'POST',
      data: {
        orderid: that.data.orderid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var types = res.data;
          var book = types;
          if (book.orderState == 2) {
            book.state = '待付款';
          }
          else if (book.orderState == 1) {
            book.state = '进行中';
          }
          else if (book.orderState == 1) {
            book.state = '已完成';
          }
        that.setData({
          details: types
        })
        console.log(that.data.orderid)
        console.log(that.data.details)
      }
    })
  },
  bindpay: function () {
    var that = this
    //生成随机字符串、订单号、签名接口
    wx.request({
      url: 'https://www.eton100.com/book/pay',
      //openid: '' + app.globalData.openid + ''    
      data: { openid: app.globalData.openid},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.data.paydata = '<xml>'
        that.data.paydata += '<appid>wxae68680b7a6ce738</appid>'
        that.data.paydata += '<body>易通共享图书押金测试</body>'
        that.data.paydata += '<mch_id>1480146792</mch_id>'
        that.data.paydata += '<nonce_str>' + res.data.noncestr + '</nonce_str>'
        that.data.paydata += '<notify_url>https://www.eton100.com/book/notify</notify_url>'
        that.data.paydata += '<openid>' + app.globalData.openid + '</openid>'
        that.data.paydata += '<out_trade_no>' + res.data.outtradeno + '</out_trade_no>'
        that.data.paydata += '<spbill_create_ip>119.29.169.244</spbill_create_ip>'
        that.data.paydata += '<total_fee>1</total_fee>'
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