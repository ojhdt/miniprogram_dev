const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    },
    selected: {
      type: Array,
      value: []
    },
    isPoppingUp: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: [],
    selected: [],
    tempValue: [],
    isPoppingUp: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _reorganizeObjectArray(arr, layerIndex, res) {
      if (typeof arr[0] == "string") {
        res.push(arr)
        this.setData({
          tempValue: res
        })
      } else if (typeof arr[0] == "object") {
        let names = []
        arr.forEach(value => {
          names.push(value.name)
        })
        res.push(names)
        this._reorganizeObjectArray(arr[this.data.selected[layerIndex]].items, layerIndex + 1, res)
      } else {
        throw "illegal input"
      }
    },

    _onCategoryBtnClick(e) {
      if (!this.data.isPoppingUp) {
        this.setData({
          isPoppingUp: true
        })
      }
      let index = e.currentTarget.dataset.index
      let newSelected = this.data.selected
      newSelected.fill(0)
      newSelected[0] = index
      this.setData({
        selected: newSelected
      })
      let array = this.data.value[index].items
      this._reorganizeObjectArray(array, 1, [])
    },

    _updateSelection(e) {
      let newSelected = this.data.selected
      newSelected[e.currentTarget.dataset.columnindex + 1] = e.currentTarget.dataset.index
      this.setData({
        selected: newSelected
      })
      let array = this.data.value[this.data.selected[0]].items
      this._reorganizeObjectArray(array, 1, [])
    },

    _onConfirm() {
      this.setData({
        isPoppingUp: false
      })
      let values = []
      let index = 0
      let temp
      while (index < this.data.selected.length) {
        temp = (temp == undefined ? this.data.value[this.data.selected[index]] : temp.items[this.data.selected[index]])
        if (typeof temp == "object" && temp.name != undefined) {
          values.push(temp.name)
        } else if (typeof temp == "string") {
          values.push(temp)
          break
        } else break
        index++
      }
      let detail = {
        selectedIndexs: this.data.selected,
        selectedValues: values
      }
      this.triggerEvent("confirm", detail, {})
    },

    _onCancel() {
      this.setData({
        isPoppingUp: false
      })
    }

  },
  lifetimes: {
    attached() {
      this.setData({
        value: this.properties.data,
        selected: this.properties.selected,
        isPoppingUp: this.properties.isPoppingUp
      })
      if (this.properties.isPoppingUp) {
        let array = this.properties.data[this.properties.selected[0]].items
        this._reorganizeObjectArray(array, 1, [])
      }
    }
  }
})