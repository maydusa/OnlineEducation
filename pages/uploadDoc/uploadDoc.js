import { api } from "../../constants/api";
import { formatSize } from "../../utils/util";

Page({

  data: {
    doc: []
  },

  onLoad: function (options) {

  },

  add: function () {
    wx.chooseMessageFile({
      count: 1,
      success: res => {
        console.log(res);
        const tempFile = res.tempFiles[0];
        const tempDoc = this.data.doc;
        let title = tempFile.name;
        title = title.split(".");
        title.pop();
        title = title.join("");
        tempDoc.unshift({
          title: title,
          isInput: false,
          size: formatSize(tempFile.size),
          path: tempFile.path
        })
        this.setData({
          doc: tempDoc
        })
      }
    })
  },

  delete: function (e) {
    const { index } = e.currentTarget.dataset;
    const { doc } = this.data;
    doc.splice(index, 1);
    this.setData({doc: doc})
  },

  upload: function () {
    const { doc } = this.data;
    for (let i = 0; i < doc.length; i++) {
      wx.uploadFile({
        filePath: doc[i].path,
        name: 'file',
        url: api['uploadDoc'],
        formData: {
          title: doc[i].title,
          uid: getApp().globalData.userInfo.uid
        },
        success: res => {
          console.log(res);
          if (res.data.code === 0) {
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
          }
        }
      })
    }
  }

  // upload: function () {
  //   console.log("upload");
  //   wx.downloadFile({
  //     url: 'https://mydusa.xyz/math.pdf',
  //     success: function (res) {
  //       console.log(res);
  //       const filePath = res.tempFilePath
  //       wx.openDocument({
  //         filePath: filePath,
  //         success: function (res) {
  //           console.log('打开文档成功')
  //         }
  //       })
  //     }
  //   })
  // }
})