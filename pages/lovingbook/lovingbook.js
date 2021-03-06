import API from '../../shared/api/index';
import getStar from '../../shared/utils/getStar';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  removeLove: function (e) {
    const that = this;
    const bookid = e.currentTarget.dataset.bookid;
    console.log(bookid)
    wx.showModal({
      title: '通知',
      content: '取消收藏吗？',
      success: function(res) {
        if (res.confirm) {
          API.removeLovingbook({
            openid: app.globalData.openid,
            bookid: bookid
          }, function (res) {
            if (res.statusCode === 200) {
              wx.showToast({
                title: '已取消收藏',
                icon: 'success',
                duration: 1000
              });
              setTimeout(() =>{
               that.onShow();
              },1000)
            }
          })
        } else {
          return;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    });
    API.getAllLovingbook({
      openid: app.globalData.openid
    },function(res) {
      let info = res.data;
      info = info.map((item)=>{
        item.block = getStar.get_star(item.book.average);
        item.isLoving = true;
        return Object.assign({}, item, item.book);
      })
      that.setData({
        bookList: info
      })
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
    const that = this;
    that.onLoad();
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