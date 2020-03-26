// pages/my/my.js
const { api } = require("../../constants/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: getApp().globalData.isLogin,
    userInfo: getApp().globalData.userInfo,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // console.log(this.data.userInfo)
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

  },

  login: function () {
    wx.login({
      success: res => {
        wx.request({
          url: api['login'],
          method: "post",
          data: {
            code: res.code
          },
          success: res => {
            console.log(res);
            if (res.data.code == 0) {
              getApp().globalData.token = res.data.data.token;
              getApp().globalData.isLogin = true;
              this.setData({
                isLogin: true
              })
              wx.setStorage({
                data: res.data.data.token,
                key: 'token'
              })
              wx.setStorage({
                data: res.data.data.userId,
                key: 'userId',
              })
            }
          }
        })
      }
    })
  },

  getUserInfo: function (e) {
    console.log(e);
    if (e.detail && e.detail.userInfo) {
      getApp().globalData.userInfo = e.detail.userInfo;
      getApp().globalData.signature = e.detail.signature;
      this.setData({
        userInfo: e.detail.userInfo
      })
      wx.setStorage({
        data: e.detail.userInfo,
        key: 'userInfo'
      })
    } else {
      wx.openSetting({
        complete: (res) => {},
      })
    }
  },

  toStar: function () {
    wx.navigateTo({
      url: '/pages/star/star',
    })
  }
})