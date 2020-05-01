import { api } from "../../constants/api";

Page({

  data: {
    msg: []
  },

  onLoad: function (options) {
    wx.request({
      url: `${api['message']}?uid=${getApp().globalData.userInfo.uid}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          this.setData({msg: res.data.data});
        }
      }
    })
  },

  toCom: function (e) {
    const { index } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/ask/ask?uid=${getApp().globalData.userInfo.uid}&touid=${this.data.msg[index].uid}`,
    })
  }

})