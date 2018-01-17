// balance.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:0
  },
  changeValue: function (e) {
    this.setData({ money: e.detail.value });
  },
  recharge:function(){
   var that =this
   if(that.data.money!=0){
   wx.request({
     url: 'https://www.eton100.com/book/paybymoney',
     //openid: '' + app.globalData.openid + ''    
     data: { 
       openid: app.globalData.openid,
       money:that.data.money
        },
     method:'POST',
     header: {
       'content-type': 'application/json'
     },
     success: function (res) {
       that.setData({
         tradeid: res.data.outtradeno
       })
       that.data.paydata = '<xml>'
       that.data.paydata += '<appid>wxae68680b7a6ce738</appid>'
       that.data.paydata += '<body>易通共享图书余额测试</body>'
       that.data.paydata += '<mch_id>1480146792</mch_id>'
       that.data.paydata += '<nonce_str>' + res.data.noncestr + '</nonce_str>'
       that.data.paydata += '<notify_url>https://www.eton100.com/book/notify</notify_url>'
       that.data.paydata += '<openid>' + app.globalData.openid + '</openid>'
       that.data.paydata += '<out_trade_no>' + res.data.outtradeno + '</out_trade_no>'
       that.data.paydata += '<spbill_create_ip>119.29.169.244</spbill_create_ip>'
       that.data.paydata += '<total_fee>'+that.data.money+'</total_fee>'
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
                   console.log('支付成功，交易记录传至数据库')
                   wx.request({
                     url: 'https://www.eton100.com/book/recharge',
                     data: {
                       tradeid: that.data.tradeid,
                       openid: app.globalData.openid,
                       tradeWay: 2,
                       tradeMoney:that.data.money
                     },
                     method: 'POST',
                     success: function (res) {
                       console.log(res)
                       console.log('记录传至数据库成功')
                       wx.navigateBack({
                         delta: 1,
                       })
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
   }else{
     wx.showModal({
       title: '提示',
       content: '请输入充值金额',
       showCancel: false,
     })
   }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       balance:options.money
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