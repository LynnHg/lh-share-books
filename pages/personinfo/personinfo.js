// personinfo.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    personInfo: {},
    isReged: false
  },
  //设置用户名
  setName: function (e) {
    var that = this;
    that.setData({
      'personInfo.name': e.detail.value
    })
  },
  //设置电话
  setPhone: function (e) {
    var that = this;
    that.setData({
      'personInfo.phone': e.detail.value
    })
  },
  reg: function () {
    var that = this;
    if (!that.data.personInfo.name) {
      wx.showToast({
        title: '名字为空',
        image: '../../assets/images/warn.png',
        duration: 2000
      })
      return;
    } else if (!that.data.personInfo.phone) {
      wx.showToast({
        title: '电话为空',
        image: '../../assets/images/warn.png',
        duration: 2000
      })
      return;
    }else {
      wx.request({
        url: 'http://l1669f6515.iok.la/book/user/add',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        data: {
          openid: app.globalData.openid,
          name: that.data.personInfo.name,
          phone: that.data.personInfo.phone,
          userState: 1,
          point: 0,
          deposit: 0,
          money: 0
        },
        success: function (res) {
          if (res.statusCode === 200) {
            wx.showModal({
              title: '通知',
              content: '注册成功！',
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
              title: '注册失败',
              image: '../../assets/images/failed.png',
              duration: 2000
            })
          }
        }
      })
    }
    
  },
  savePersonInfo: function () {
    var that = this;
    if (!that.data.personInfo.name) {
      wx.showToast({
        title: '名字为空',
        image: '../../assets/images/warn.png',
        duration: 2000
      })
      return;
    } else if (!that.data.personInfo.phone) {
      wx.showToast({
        title: '电话为空',
        image: '../../assets/images/warn.png',
        duration: 2000
      })
      return;
    }else {
      wx.request({
        url: 'http://l1669f6515.iok.la/book/user/saveinfo',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        data: {
          openid: app.globalData.openid,
          name: that.data.personInfo.name,
          phone: that.data.personInfo.phone,
        },
        success: function (res) {
          if (res.statusCode === 200) {
            wx.showModal({
              title: '通知',
              content: '保存成功！',
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
              title: '保存失败',
              image: '../../assets/images/failed.png',
              duration: 2000
            })
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
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    wx.request({
      url: 'http://l1669f6515.iok.la/book/user/alluser',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var allUser = res.data;
        allUser.forEach(function (item) {
          if (item.openid === app.globalData.openid) {//已经注册
            that.setData({
              isReged: true
            })
            wx.request({
              url: 'http://l1669f6515.iok.la/book/user/searchByOpenid',
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              data: {
                openid: app.globalData.openid
              },
              success: function (res) {
                var info = res.data[0];
                that.setData({
                  'personInfo.name': info.name,
                  'personInfo.phone': info.phone
                })
              }
            })
          } else {
            that.setData({
              isReged: false
            })
          }
        })
      }
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