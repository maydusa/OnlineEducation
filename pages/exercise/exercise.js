// pages/exercise/exercise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercises: [
      {
        id: 1,
        title: "problem 1",
        type: 1,
        choices: [
          "apple",
          "orange",
          "vegetable",
          "helo"
        ]
      },
      {
        id: 2,
        title: "problem 2",
        type: 2,
        choices: ["是", "否"]
      }
    ]
  },

  getuser: function() {
    console.log("hahaha");
    wx.authorize({
      scope: 'scope.userInfo',
      success: (res) => {
        console.log(res)
      },
      fail: err => {
        console.log(err);
      },
      complete: () => {
        console.log('complete')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})