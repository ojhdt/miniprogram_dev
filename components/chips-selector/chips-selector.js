const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chipsArr: {
      type: Array,
      value: []
    },
    selectedIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    chipsArr: [],
    selectedIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSelectedIndex: function(){
      return this.data.selectedIndex
    },

    getCurrentValue: function(){
      return this.data.chipsArr[this.data.selectedIndex]
    },

    _clickChip: function (e) {
      // console.log(e)
      this.setData({
        selectedIndex: parseInt(e.target.id),
      })
      let detail = {
        chipsArr: this.data.chipsArr,
        selectedIndex: this.data.selectedIndex,
        currentValue: this.data.chipsArr[this.data.selectedIndex]
      }
      this.triggerEvent("change", detail, {})
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        chipsArr: this.properties.chipsArr,
        selectedIndex: this.properties.selectedIndex
      })
    }
  }
})