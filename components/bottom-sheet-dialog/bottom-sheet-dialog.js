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
    isPoppingUp: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    touchS: [0, 0],
    touchE: [0, 0],
    primaryColor: "#FFCD71",
    rgbaPrimaryColor: "FFCD71",
    data: [],
    listData: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initializeListData() {
      // let array = app.globalData.categoryData.slice(1, );
      let result = [];
      this.data.data.forEach((element, index, array) => {
        let object = {
          content: element,
          top: 0,
        }
        result.push(object)
      })
      this.setData({
        listData: result,
        // popCategoryEditIf: true
      })
      // setTimeout(() => {
      //   this.setData({
      //     popCategoryEdit: true,
      //   })
      // }, 100)
    },

    listInput(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index
      this.setData({
        [`listData[${index}].content`]: e.detail.value,
      })
    },

    listAddItem() {
      let array = this.data.listData
      array.push({
        content: "",
        top: 0,
      })
      this.setData({
        listData: array,
      })
    },

    listDeleteItem(e) {
      let index = e.currentTarget.dataset.index
      let array = this.data.listData
      array.splice(index, 1, )
      this.setData({
        listData: array,
      })
    },

    defaultListInput(e) {
      this.setData({
        defaultContent: e.detail.value,
      })
    },

    onConfirm() {
      let result = []
      this.data.listData.forEach((element, index) => {
        if(element.content.replace(/[ ]/g,"").length != 0){
          result.push(element.content)
        }
      })
      let detail = {
        result
      }
      this.triggerEvent("confirm", detail, {})
    },

    dragStart(e) {
      // console.log(e)
      var that = this;
      var index = e.currentTarget.dataset.index;
      var query = this.createSelectorQuery()
      query.select('.list').boundingClientRect(rect => {
        // console.log(index * (-40), (this.data.listData.length - index - 1) * 40)
        this.setData({
          listTop: rect.top + index * 40,
          listMin: index * (-40),
          listMax: (this.data.listData.length - index - 1) * 40,
          listDragging: true,
          [`listData.[${index}].dragging`]: true
        })
        // console.log(rect.top)
      }).exec()
    },
    dragMove(e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      var top = this.data.listTop
      // console.log(e.changedTouches)
      var res = e.changedTouches[0].clientY - top - 60
      // console.log(e.changedTouches[0].clientY - top)
      if (res >= this.data.listMin && res <= this.data.listMax) {
        this.setData({
          [`listData[${index}].top`]: res
        })
      }
      // console.log(res)
      let a = res / 40
      if (a > 0) {
        a = Math.ceil(a)
      } else if (a < 0) {
        a = Math.floor(a)
      }
      let b = res % 40
      // console.log(res, a, b)
      if (this.data.listData[index + a] && a != 0) {
        if (b > 20) {
          this.setData({
            [`listData[${index+a}].top`]: -40
          })
        } else if (b > 0 && b <= 20) {
          this.setData({
            [`listData[${index+a}].top`]: 0
          })
        } else if (b >= -20 && b < 0) {
          this.setData({
            [`listData[${index+a}].top`]: 0
          })
        } else if (b < -20) {
          this.setData({
            [`listData[${index+a}].top`]: 40
          })
        }
        this.setData({
          listTarget: Math.round(res / 40),
        })
      }
    },
    dragEnd(e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      for (let i = 0; i < this.data.listData.length; i++) {
        this.setData({
          [`listData.[${i}].top`]: 0
        })
      }
      this.setData({
        [`listData.[${index}].dragging`]: false,
        listDragging: false
      })
      let data = this.data.listData
      if (this.data.listTarget > 0) {
        for (let i = index; i < index + this.data.listTarget; i++) {
          let temp = data[i]
          data[i] = data[i + 1]
          data[i + 1] = temp
        }
      } else if (this.data.listTarget < 0) {
        for (let i = index; i > index + this.data.listTarget; i--) {
          let temp = data[i]
          data[i] = data[i - 1]
          data[i - 1] = temp
        }
      }
      this.setData({
        listData: data,
        edited: true,
      })
      // let flist = this.data.listData[index];
      // let nlist = this.data.listData[index + this.data.listTarget];
      // this.setData({
      //   [`listData.[${index}]`]: nlist, 
      //   [`listData.[${index + this.data.listTarget}]`]: flist, 
      // })
    },
    onCancel() {
      this.setData({
        isPoppingUp: false
      })
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        data: this.properties.data,
        isPoppingUp: this.properties.isPoppingUp
      })
      this.initializeListData()
    }
  }
})