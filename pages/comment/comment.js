// comment.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookid:"",
    comment:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'https://www.eton100.com/book/comment/addComment', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        commentText: e.detail.value.commentText,
        commentState: 1,
        bookid: that.data.bookid,
        openid: app.globalData.openid,
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.navigateBack({
          
        })
      }
    })
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
       bookid: options.bookid 
       })
    console.log(that.data.bookid)
    wx.request({
      url: 'https://www.eton100.com/book/searchCommentByBookid',
      method: 'GET',
      data: {
        bookid:that.data.bookid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          comment: res.data
        })
        console.log(that.data.comment)
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