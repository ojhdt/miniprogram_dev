const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navArr: {
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
    navArr: [],
    selectedIndex: 0,
    scrollX: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _navClick(e) {
      let index = e.currentTarget.dataset.index
      let res = this._getScrollX(index)
      this.setData({
        scrollX: res,
        selectedIndex: index
      })
      let detail = {
        navArr: this.data.navArr,
        selectedIndex: this.data.selectedIndex,
        currentValue: this.data.navArr[this.data.selectedIndex]
      }
      this.triggerEvent("switch", detail, {})
    },

    _getScrollX(index) {
      let screenWidth = wx.getSystemInfoSync().windowWidth;
      let itemWidth = screenWidth / 4;
      const arr = this.data.navArr
      let scrollX = itemWidth * index - itemWidth * 2;
      let maxScrollX = (arr.length + 1) * itemWidth;
      if (scrollX < 0) {
        scrollX = 0;
      } else if (scrollX >= maxScrollX) {
        scrollX = maxScrollX;
      }
      return scrollX
    }
  },
  lifetimes: {
    attached() {
      if (this.properties.selectedIndex != null && this.properties.selectedIndex > this.properties.navArr.length - 1) throw 'illegal input'
      let res = this._getScrollX(this.properties.selectedIndex)
      this.setData({
        navArr: this.properties.navArr,
        selectedIndex: this.properties.selectedIndex,
        scrollX: res
      })
    }
  }
})