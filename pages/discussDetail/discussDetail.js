import { api } from "../../constants/api";
import { formatTime } from "../../utils/util";

Page({

  data: {
    discuss: {
      title: "",
      content: "",
      images: [],
      avatarUrl: "http://localhost:3001/images/avatar.png",
      create_time: 0,
      nickname: "",
      likeId: null
    }
  },

  onLoad: function (options) {
    console.log(options.id)
    wx.request({
      url: `${api['discuss']}?discussId=${2}`,
      method: "get",
      success: res => {
        console.log(res);
        res.data.data.images = JSON.parse(res.data.data.images);
        res.data.data.create_time = formatTime(res.data.data.create_time);
        this.setData({discuss: res.data.data});
      }
    })
  },

  previewImg: function (e) {
    console.log(this.data.discussion);
    let { index } = e.currentTarget.dataset;
    wx.previewImage({
      urls: this.data.discuss.images,
      current: this.data.discuss.images[index]
    })
  },

  like: function (e) {
    const { likeId } = this.data.discuss;
    wx.request({
      url: api['discussLike'],
      method: "post",
      data: {
        id: this.data.discuss.id,
        uid: getApp().globalData.userInfo.uid
      },
      success: res => {
        console.log(res);
        if (res.data.code !== 0) {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
          return;
        };
        if (likeId) {
          const tempDiscuss = this.data.discuss;
          tempDiscuss.likes--;
          tempDiscuss.likeId = false;
          this.setData({discuss: tempDiscuss})
        } else {
          const tempDiscuss = this.data.discuss;
          tempDiscuss.likes++;
          tempDiscuss.likeId = true;
          this.setData({discuss: tempDiscuss})           
        }
      }
    })
  },

  star: function (e) {
    const { starId } = this.data.discuss;
    wx.request({
      url: api['discussStar'],
      method: "post",
      data: {
        id: this.data.discuss.id,
        uid: getApp().globalData.userInfo.uid
      },
      success: res => {
        console.log(res);
        if (res.data.code !== 0) {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
          return;
        };
        if (starId) {
          const tempDiscuss = this.data.discuss;
          tempDiscuss.starId = false;
          this.setData({discuss: tempDiscuss})
        } else {
          const tempDiscuss = this.data.discuss;
          tempDiscuss.starId = true;
          this.setData({discuss: tempDiscuss})           
        }
      }
    })
  },

  comment: function () {
    wx.navigateTo({
      url: `/pages/editor/editor?id=${this.data.discuss.id}`,
    })
  }
})