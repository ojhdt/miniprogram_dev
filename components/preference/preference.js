const _ = require('../common/utils')

Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    targetUrl:{
      type: String,
      value: null
    },
    theme:{
      type: String,
      value: "default"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "",
    theme: "default",
    targetUrl: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _click() {
      if(this.data.targetUrl != null){
        wx.navigateTo({
          url: this.data.targetUrl,
        })
      }
      let detail = {
        title: this.data.title
      }
      let option = {
        bubbles: true
      }
      this.triggerEvent("click", detail, option)
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        title: this.properties.title,
        theme: this.properties.theme
      })
      if(this.properties.targetUrl != null){
        this.setData({
          targetUrl: this.properties.targetUrl
        })
      }
    }
  }
})