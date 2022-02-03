const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: ""
    },
    placeholder: {
      type: String,
      value: ""
    },
    minHeight: {
      type: Number,
      value: 400
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: "",
    placeholder: "",
    disabled: false,
    maxLength: 200,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getValue() {
      return this.data.value
    },

    _input(e) {
      console.log(e)
      let value = e.detail.value
      let newValue = value.replace(/[<>&'?!]/g, '_')
      let detail = {
        value: newValue
      }
      this.triggerEvent("input", detail, {})
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        value: this.properties.value,
        placeholder: this.properties.placeholder,
        disabled: this.properties.disabled,
        minHeight: this.properties.minHeight
      })
      if (this.properties.maxLength != null) {
        this.setData({
          maxLength: this.properties.maxLength
        })
      }
    }
  }
})