const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconMainSrc: {
      type: String,
      value: ""
    },
    title: {
      type: String,
      value: ""
    },
    iconCustomSrc: {
      type: String,
      value: "../assets/icon_next.png"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iconMainSrc: "",
    iconCustomSrc: "",
    title: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _click() {
      console.log(this.data.iconMainSrc)
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
        iconMainSrc: this.properties.iconMainSrc,
        iconCustomSrc: this.properties.iconCustomSrc
      })
    }
  }
})