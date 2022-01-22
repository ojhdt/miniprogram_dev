Page({
  foo(e){
    console.log(e)
  },
  tap: function(e){
    const child = this.selectComponent('.image_uploader')
    console.log(child)
  }
})