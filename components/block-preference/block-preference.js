const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String,
      value: ""
    },
    title: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgSrc: "",
    title: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _click(){
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
        imgSrc: this.properties.imgSrc
      })
    }
  }
})