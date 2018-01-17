Page({
  data: {

  },

  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
    if (e.detail.value.textarea==""){
      wx.showToast({
        title: '请输入内容',
        icon: 'success',
        duration: 2000
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '是否提交',
        success: function (res) {
          if (res.confirm) {
            
            console.log('用户点击确定')
            wx.navigateBack({
            })
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
     
    }
  }
})