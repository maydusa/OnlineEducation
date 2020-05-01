const { api } = require("../../constants/api.js");

Page({

  data: {
    isLogin: false,
    userInfo: {},
    message: 0
  },

  onLoad: function () {
    this.setData({
      isLogin: getApp().globalData.isLogin,
      userInfo: getApp().globalData.userInfo
    })
    wx.request({
      url: `${api['isMessage']}?uid=${getApp().globalData.userInfo.uid}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          this.setData({message: res.data.data.length});
        }
      }
    })
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

  logout: function () {
    wx.clearStorage({
      complete: (res) => {},
    })
  },

  toStar: function () {
    wx.navigateTo({
      url: '/pages/star/star',
    })
  },

  toMessage: function () {
    wx.navigateTo({
      url: `/pages/message/message?uid=${getApp().globalData.userInfo.uid}`,
    })
  }
})