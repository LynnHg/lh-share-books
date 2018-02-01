
//获取应用实例
var app = getApp();
import API from '../../shared/api/index';
import tools from '../../shared/utils/tools';

Page({
  data: {

  },
  //事件处理函数
  onLoad: function () {

  },
  onReady: function () {

  },

  //设置反馈内容
  setContent: function (e) {
    var that = this;
    that.setData({
      opinion: e.detail.value
    })
  },

  submitOpinion: function () {
    var that = this;
    const feedbackTime = tools.getTime();
    if (!that.data.opinion) {
      wx.showToast({
        title: '未填写意见',
        image: '../../assets/images/warn.png',
        duration: 2000
      })
      return;
    }
    API.userAddFeedback({
      feedbackTime: feedbackTime,
      feedbackText: that.data.opinion,
      openid: app.globalData.openid
    }, function (res) {
      if (res.statusCode === 200) {
        wx.showModal({
          title: '通知',
          content: '反馈信息发送成功，请等待后续处理，感谢！',
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
          title: '反馈失败',
          image: '../../assets/images/failed.png',
          duration: 2000
        })
      }
    }
    );
  }
})
