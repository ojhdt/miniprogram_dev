const _ = require('../common/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    prefix: {
      type: String,
      value: ""
    },
    suffix: {
      type: String,
      value: ""
    },
    value: {
      type: String,
      value: ""
    },
    type: {
      type: String,
      value: "text"
    },
    placeholder: {
      type: String,
      value: ""
    },
    regex: {
      type: String,
      value: ""
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
    prefix: "",
    suffix: "",
    value: "",
    isRegexMatched: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getValue() {
      return this.data.value
    },

    getIsRegexMatched() {
      return this.data.isRegexMatched
    },

    _input(e) {
      let regexRes
      if (this.data.regex.length != 0) {
        let regex = new RegExp(this.data.regex)
        regexRes = regex.test(e.detail.value)
      } else regexRes = false
      this.setData({
        value: e.detail.value,
        isRegexMatched: regexRes
      })
      let detail = {
        value: e.detail.value,
        isRegexMatched: regexRes
      }
      this.triggerEvent("input", detail, {})
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        prefix: this.properties.prefix,
        suffix: this.properties.suffix,
        value: this.properties.value,
        type: this.properties.type,
        placeholder: this.properties.placeholder,
        regex: this.properties.regex,
        disabled: this.properties.disabled
      })
    }
  }
})