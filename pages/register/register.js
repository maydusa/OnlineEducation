// pages/register/register.
const { api } = require('../../constants/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: "",
    email: "",
    password: "",
    comPassword: ""
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

  },

  updateNickname: function (e) {
    this.setData({nickname: e.detail.value})
  },

  updateEmail: function (e) {
    this.setData({email: e.detail.value})
  },

  updatePassword: function (e) {
    this.setData({password: e.detail.value})
  },

  updateCompassword: function (e) {
    this.setData({comPassword: e.detail.value})
  },

  submit: function () {
    if (this.data.nickname === '' || this.data.email === '' || this.data.password === '' || this.data.comPassword === '') {
      wx.showToast({
        title: '表单任意一项不能为空!',
        icon: 'none'
      })
      return;
    }
    if (this.data.password !== this.data.comPassword) {
      wx.showToast({
        title: '两次密码输入不一致!',
        icon: 'none'
      })
      return;
    }
    wx.request({
      url: api['register'],
      method: 'post',
      data: {
        nickname: this.data.nickname,
        password: this.data.password,
        email: this.data.email
      },
      success: res => {
        if (res.data.code == 0) {
          let data = {
            nickname: this.data.nickname,
            email: this.data.email,
            uid: res.data.uid,
            token: res.data.token
          }
          wx.setStorage({
            data: data,
            key: 'userInfo',
          })
        }
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }, 1500);
      }
    })
  }
})