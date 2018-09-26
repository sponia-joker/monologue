//index.js
const app = getApp()

Page({
  data: {
    records: []
  },
  onLoad: function() {
    this.getRecords()
  },
  getRecords: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'getRecords',
      data: {},
      success: res => {
        const {
          result: {
            data
          }
        } = res
        const fileList = data.map(record => record.cover)
        wx.cloud.getTempFileURL({
          fileList
        }).then(result => {
          const coverUrls = result.fileList
          for (let i = 0; i < coverUrls.length; i++) {
            data[i].coverUrl = coverUrls[i]
          }
          this.setData({
            records: data,
          })
        })

      },
      fail: err => {
        console.error(err)
      }
    })
  }
})