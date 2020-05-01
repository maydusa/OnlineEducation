import { api } from "./constants/api";

//app.js
App({
  onLaunch: function () {
    wx.getStorage({
      key: 'userInfo',
      success: data => {
        let userInfo = data.data;
        console.log(userInfo);
        wx.request({
          url: api['checkStatus'],
          method: 'post',
          data: {
            uid: data.data.uid
          },
          success: res => {
            console.log(res);
            if (res.data.code === 0) {
              this.globalData = {
                isLogin: true,
                userInfo
              }
            }
          }
        })
      }
    })
  },
  globalData: {
    isLogin: false,
    userInfo: {
      nickname: "未登录",
      avatarUrl: "http://localhost:3001/images/avatar.png",
      type: 0
    }
  }
})