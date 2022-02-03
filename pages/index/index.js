Page({
  data: {
    filterData: [{
      name: "时间筛选",
      items: [{
          name: "全部",
          items: ['全部', '8:00~12:00', '12:00~16:00', '16:00~20:00', '20:00~24:00']
        },
        {
          name: "今天",
          items: ['全部', '8:00~12:00', '12:00~16:00', '16:00~20:00', '20:00~24:00']
        },
        {
          name: "明天",
          items: ['全部', '8:00~12:00', '12:00~16:00', '16:00~20:00', '20:00~24:00']
        }
      ]
    },
    {
      name: "酬劳筛选",
      items: ['全部', '0~5￥', '5~10￥', '10~15￥']
    },
    {
      name: "地点筛选",
      items: ['全部', '北门', '宿舍楼下', '水坝', '其他']
    }
  ],
  },

  foo(e) {
    console.log(e)
  },
  tap: function (e) {
    const child = this.selectComponent('.image_uploader')
    console.log(child)
  }
})