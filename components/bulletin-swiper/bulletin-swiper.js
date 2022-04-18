const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: Number,
      value: 300
    },
    srcs:{
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    srcs: [],
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _change(e){
      this.setData({
        currentIndex: e.detail.current
      })
    },

    _aniStart(){

    },
    _aniEnd(){

    },
    _onImageTap(e){
      let index = e.currentTarget.dataset.index
      wx.previewImage({
        urls: this.data.srcs,
        current: this.data.srcs[index]
      })
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        height: this.properties.height,
        srcs: this.properties.srcs,
      })
    }
  }
})