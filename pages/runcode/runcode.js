import { api } from "../../constants/api";

Page({

  data: {
    code: "",
    output: ""
  },

  onLoad: function (options) {

  },

  run: function () {
    wx.request({
      url: api['runcode'],
      method: "post",
      data: {
        code: this.data.code
      },
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          this.setData({output: res.data.output})
        }
      }
    })
  },

  updateCode: function (e) {
    this.setData({code: e.detail.value});
  },

  chooseImg: function () {
    wx.chooseImage({
      count: 1,
      success: res => {
        const { tempFilePaths } = res;
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: "http://mydusa.xyz:3001/ocr",
          formData: {
            uid: getApp().globalData.userInfo.uid
          },
          success: res => {
            console.log(res);
            const data = JSON.parse(res.data);
            if (res.statusCode === 200 && data.code === 0) {
              this.setData({code: data.data});
            }
          }
        });
      },
    })
  }

})
