//logs.js
import tools from '../../shared/utils/tools';
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return tools.formatTime(new Date(log))
      })
    })
  }
})
