// pages/login/page.js
import { api } from "../../constants/api";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: "",
    password: ""
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

  updateEmail: function (e) {
    this.setData({email: e.detail.value})
  },

  updatePassword: function (e) {
    this.setData({password: e.detail.value})
  },

  login: function () {
    if (this.data.email === '' || this.data.password === '') {
      wx.showToast({
        title: '表单任意一项不能为空!',
        icon: 'none'
      })
      return;
    }
    wx.request({
      url: api['login'],
      method: 'post',
      data: {
        password: this.data.password,
        email: this.data.email
      },
      success: res => {
        console.log(res.data);
        if (res.data.code === 0) {
          wx.setStorage({
            data: res.data.data,
            key: 'userInfo',
          })
        }
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
    })
  }
})