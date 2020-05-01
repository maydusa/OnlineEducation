import { api } from "../../constants/api";
import { formatTime } from "../../utils/util";
import { pageSize } from "../../constants/config";

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
    },
    comment: [],
    offset: 0,
    hasMore: false
  },

  onLoad: function (options) {
    console.log(options.id)
    wx.request({
      url: `${api['discuss']}?discussId=${2}&uid=${getApp().globalData.userInfo
      .uid}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          res.data.data.images = JSON.parse(res.data.data.images);
          res.data.data.create_time = formatTime(res.data.data.create_time);
          this.setData({discuss: res.data.data});
          console.log(res.data.data)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  onShow: function () {
    wx.request({
      url: `${api['comment']}?discussId=${2}&offset=0`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          let tempComment = res.data.data.comment.map((item, index) => {
            item.create_time = formatTime(item.create_time);
            item.images = JSON.parse(item.images);
            return item;
          })
          this.setData({
            comment: [ ...tempComment],
            offset: 0 + pageSize,
            hasMore: res.data.data.hasMore
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  onReachBottom: function () {
    if (!this.data.hasMore) return;
    wx.request({
      url: `${api['comment']}?discussId=${2}&offset=${this.data.offset}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          let tempComment = res.data.data.comment.map((item, index) => {
            item.create_time = formatTime(item.create_time);
            item.images = JSON.parse(item.images);
            return item;
          })
          this.setData({
            comment: [...this.data.comment, ...tempComment],
            offset: this.data.offset + pageSize,
            hasMore: res.data.data.hasMore
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  previewImg: function (e) {
    console.log(this.data.discussion);
    let { index, imgs } = e.currentTarget.dataset;
    wx.previewImage({
      urls: imgs,
      current: imgs[index]
    })
  },

  handleLike: function () {
    if (this.data.discuss.likeId) {
      this.dislike();
    } else {
      this.like();
    }
  },

  like: function (e) {
    const { id } = this.data.discuss;
    wx.request({
      url: api['discussLike'],
      method: "post",
      data: {
        id: id,
        uid: getApp().globalData.userInfo.uid
      },
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempDiscuss = this.data.discuss;
          tempDiscuss.likes++;
          tempDiscuss.likeId = true;
          this.setData({discuss: tempDiscuss});
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  dislike: function () {
    const { id } = this.data.discuss;
    wx.request({
      url: api['discussLike'],
      method: "delete",
      data: {
        id: id,
        uid: getApp().globalData.userInfo.uid
      },
      success: res => {
        if (res.data.code === 0) {
          const tempDiscuss = this.data.discuss;
          tempDiscuss.likes--;
          tempDiscuss.likeId = false;
          this.setData({discuss: tempDiscuss})
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
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
      url: `/pages/editor/editor?discussId=${this.data.discuss.id}&type=comment`,
    })
  },

  toCommentDetail: function (e) {
    const { commentid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/commentDetail/commentDetail?commentId=${commentid}`,
    })
  }
})