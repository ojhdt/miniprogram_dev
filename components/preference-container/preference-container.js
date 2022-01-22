const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spanSize:{
      type: Number,
      value: 1
    },
    gap:{
      type: Number,
      value: 20
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    spanSize: 1,
    gap: 20,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  lifetimes: {
    attached() {
      this.setData({
        spanSize: this.properties.spanSize,
        gap: this.properties.gap
      })
    }
  }
})