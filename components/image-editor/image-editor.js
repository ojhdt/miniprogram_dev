const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    srcs: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    oldSrcs: [],
    newSrcs: [],
    isEditting: false,
    backup: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onImageTap(e) {
      let index = e.currentTarget.dataset.index
      let type = e.currentTarget.dataset.type
      let targetSrcs = type == "new" ? this.data.newSrcs : this.data.oldSrcs
      wx.previewImage({
        urls: targetSrcs,
        current: targetSrcs[index]
      })
    },

    _chooseImage(e) {
      wx.chooseImage({
        count: 1,
      }).then(res => {
        this.setData({
          newSrcs: this.data.newSrcs.concat(res.tempFilePaths)
        })
      }).catch(err => {
        wx.showToast({
          title: '操作失败',
          icon: 'error',
        })
      })
    },

    _delete(e) {
      let index = e.currentTarget.dataset.index
      let type = e.currentTarget.dataset.type
      if (type == "new") {
        let temp = this.data.newSrcs
        temp.splice(index, 1)
        this.setData({
          newSrcs: temp
        })
      } else {
        let temp = this.data.oldSrcs
        temp.splice(index, 1)
        this.setData({
          oldSrcs: temp
        })
      }
    },

    _edit() {
      const that = this
      setTimeout(() => {
        this.setData({
          isEditting: true
        })
      }, 200)
    },

    _save() {
      setTimeout(() => {
        this.setData({
          isEditting: false
        })
        let detail = {
          oldSrcs: this.data.oldSrcs,
          newSrcs: this.data.newSrcs,
        }
        this.triggerEvent("confirm", detail, {})
      }, 200)
    },

    _cancel() {
      const that = this
      console.log(this.data.backup)
      setTimeout(() => {
        this.setData({
          oldSrcs: this.data.backup,
          newSrcs: [],
          isEditting: false
        })
        this.triggerEvent("cancel", {}, {})
      }, 200)
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        oldSrcs: this.properties.srcs,
        backup: Array.from(this.properties.srcs),
      })
    }
  }
})