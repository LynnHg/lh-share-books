// lendbook.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene:''
  },

  lendBook:function(){
    var that =this
    console.log(app.globalData.openid)
    console.log(that.data.scene)
    wx.request({
      url: 'https://www.eton100.com/book/scanCode',
      method: 'POST',
      data: {
        openid: app.globalData.openid,
        scene: that.data.scene
      },
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res)
        if (res.data == 2) {
          wx.showModal({
            title: '借书成功',
            content: '立即查看订单？',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '../orderlist/orderlist',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })
        }else if(res.data == 3){
          wx.showModal({
            title: '提示',
            content: '此书不可借',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })
        }else if(res.data == 4){
          wx.showModal({
            title: '提示',
            content: '请支付押金或未付款订单，方可借书',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var that = this;
       that.setData({ scene: options.scene });
       console.log(options)
       wx.showToast({
         title: '加载中',
         icon: 'loading',
         duration: 1001
       })
       wx.request({
         url: 'http://l1669f6515.iok.la/book/searchbyid',
         data: {
           bookid: that.data.scene
         },
         header: {},
         method: 'GET',
         dataType: '',
         success: function(res) {
          that.setData({
            bookInfo: res.data[0]
          })
         },
         fail: function(res) {},
         complete: function(res) {},
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