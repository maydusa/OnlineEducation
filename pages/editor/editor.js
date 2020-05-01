import { api } from "../../constants/api";

Page({
  data: {
    imgs: [],
    title: "",
    content: "",
    discussId: 0,
    commentId: 0,
    toUid: 0,
    type: ""
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({discussId: options.discussId || 0, commentId: options.commentId || 0, toUid: options.toUid || 0, type: options.type || ""})
  },

  updateTitle: function (e) {
    this.setData({title: e.detail.value});
  },

  updateContent: function (e) {
    this.setData({content: e.detail.value});
  },

  chooseImg: function () {
    wx.chooseImage({
      success: res => {
        const { tempFilePaths } = res;
        const tempFileArr = [];
        for (let i = 0; i < tempFilePaths.length; i++) {
          tempFileArr[i] = {url: tempFilePaths[i], isUpload: false};
        }
        this.setData({imgs: [...this.data.imgs, ...tempFileArr]});
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            filePath: tempFilePaths[i],
            name: 'file',
            url: api['upload'],
            formData: {
              uid: getApp().globalData.userInfo.uid
            },
            success: res => {
              let data = JSON.parse(res.data);
              if (data.code === 0) {
                let tempImgs = this.data.imgs;
                tempImgs[tempImgs.length - 1 + i].isUpload = true;
                tempImgs[tempImgs.length - 1 + i].url = data.data[0].url;
                this.setData({imgs: tempImgs});
              } else {
                wx.showToast({
                  title: data.msg,
                  icon: "none"
                })
              }
            }
          });
        }
      },
    })
  },

  handleImageTap: function (e) {
    const that = this;
    const index = e.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList: ['预览', '删除'],
      success: res => {
        let previewImgs = [], imgs = this.data.imgs;
        for (let i = 0; i < imgs.length; i++) {
          previewImgs.push(imgs[i].url);
        }
        if (res.tapIndex === 0) {
          wx.previewImage({
            current: previewImgs[index],
            urls: previewImgs,
          })
        } else {
          const temp = that.data.imgs;
          temp.splice(index, 1);
          that.setData({imgs: temp});
        }
      }
    })
  },

  submit: function () {
    const { type } = this.data;
    switch(type) {
      case "discuss": this.submitDiscuss();break;
      case "comment": this.submitComment();break;
      case "reply": this.submitReply();break;
      default: return;
    }
  },

  submitDiscuss: function () {
    let tempImgs = [], imgs = this.data.imgs;
    for (let i = 0; i < imgs.length; i++) {
      tempImgs.push(imgs[i].url);
    }
    wx.request({
      url: api['discuss'],
      method: "post",
      data: {
        uid: getApp().globalData.userInfo.uid,
        title: this.data.title,
        content: this.data.content,
        imgs: tempImgs
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
        setTimeout(() => {
          wx.navigateBack({
            complete: (res) => {

            },
          })
        }, 1000);
      }
    })
  },

  submitComment: function () {
    let tempImgs = [], imgs = this.data.imgs;
    for (let i = 0; i < imgs.length; i++) {
      tempImgs.push(imgs[i].url);
    }
    wx.request({
      url: api['comment'],
      method: "post",
      data: {
        discussId: this.data.discussId,
        uid: getApp().globalData.userInfo.uid,
        content: this.data.content,
        imgs: tempImgs
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
        setTimeout(() => {
          wx.navigateBack({
            complete: (res) => {},
          })
        }, 1000);
      }
    })
  },

  submitReply: function () {
    let tempImgs = [], imgs = this.data.imgs;
    for (let i = 0; i < imgs.length; i++) {
      tempImgs.push(imgs[i].url);
    }
    wx.request({
      url: api['reply'],
      method: "post",
      data: {
        commentId: this.data.commentId,
        uid: getApp().globalData.userInfo.uid,
        content: this.data.content,
        imgs: tempImgs,
        toUid: this.data.toUid
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
        setTimeout(() => {
          wx.navigateBack({
            complete: (res) => {},
          })
        }, 1000);
      }
    })
  }
})