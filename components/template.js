const _ = require('./common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectedImgArr: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedImgArr: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _previewImage(e) {
      wx.previewImage({
        urls: [].concat(e.target.id),
      })
    },
    _deleteImage(e) {
      if (this.data.selectedImgArr.length == 1) {
        this.setData({
          selectedImgArr: []
        })
      } else {
        let temp = this.data.selectedImgArr.filter(n => n != e.currentTarget.dataset.id)
        this.setData({
          selectedImgArr: temp
        })
      }
      let detail = {
        selectedImgArr: this.data.selectedImgArr
      }
      this.triggerEvent("change", detail, {})
    },
    _chooseImage(e) {
      wx.chooseImage({
        count: 1,
      }).then(res => {
        this.setData({
          selectedImgArr: this.data.selectedImgArr.concat(res.tempFilePaths)
        })
        let detail = {
          selectedImgArr: this.data.selectedImgArr
        }
        this.triggerEvent("change", detail, {})
      }).catch(err => {
        this.triggerEvent("fail", err, {})
      })
    },
  },
  lifetimes: {
    attached() {

    }
  }
})