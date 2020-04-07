import { api } from "../../constants/api";
import { formatTime } from "../../utils/util";
import { pageSize } from "../../constants/config";

Page({

  data: {
    comment: {
      id: 0,
      content: "",
      images: [],
      avatarUrl: "http://localhost:3001/images/avatar.png",
      create_time: '',
      nickname: "",
      likeId: null,
      likes: 0
    },
    reply: [],
    offset: 0,
    hasMore: false
  },

  onLoad: function (options) {
    wx.request({
      url: `${api['comment']}?commentId=${5}`,
      method: "get",
      success: res => {
        console.log(res)
        if (res.data.code === 0) {
          res.data.data.images = JSON.parse(res.data.data.images);
          res.data.data.create_time = formatTime(res.data.data.create_time);
          this.setData({comment: res.data.data});
        }
      }
    })
  },

  onShow: function () {
    wx.request({
      url: `${api['reply']}?offset=0&commentId=${5}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          let tempReply = res.data.data.reply.map((item, index) => {
            item.create_time = formatTime(item.create_time);
            item.images = JSON.parse(item.images);
            return item;
          })
          this.setData({reply: [...tempReply], offset: 0 + pageSize, hasMore: res.data.data.hasMore});
        }
      }
    })
  },

  replyComment: function (e) {
    console.log(e.currentTarget.dataset);
    const { touid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/editor/editor?commentId=${this.data.comment.id}&toUid=${touid}`,
    })
  },

  handleLikeComment: function () {
    if (this.data.comment.likeId) {
      this.dislikeComment();
    } else {
      this.likeComment();
    }
  },
  
  likeComment: function () {
    const { id } = this.data.comment;
    wx.request({
      url: api['commentLike'],
      method: "post",
      data: {
        uid: getApp().globalData.userInfo.uid,
        id
      },
      success: res => {
        if (res.data.code === 0) {
          let tempComment = this.data.comment;
          tempComment.likeId = true;
          tempComment.likes++;
          this.setData({comment: tempComment});
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  dislikeComment: function () {
    const { id } = this.data.comment;
    wx.request({
      url: api['commentLike'],
      method: "delete",
      data: {
        uid: getApp().globalData.userInfo.uid,
        id
      },
      success: res => {
        if (res.data.code === 0) {
          let tempComment = this.data.comment;
          tempComment.likeId = false;
          tempComment.likes--;
          this.setData({comment: tempComment});
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  handleLikeReply: function (e) {
    console.log(e.currentTarget.dataset);
    const { replyid, likeid, index } = e.currentTarget.dataset;
    if (likeid) {
      this.dislikeReply(replyid, index);
    } else {
      this.likeReply(replyid, index);
    }
  },

  likeReply: function (replyId, index) {
    wx.request({
      url: api['replyLike'],
      method: "post",
      data: {
        uid: getApp().globalData.userInfo.uid,
        replyId: replyId
      },
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          let tempReply = this.data.reply;
          tempReply[index].likes++;
          tempReply[index].likeId = true;
          this.setData({reply: tempReply});
        }
      }
    })
  },

  dislikeReply: function (replyId, index) {
    wx.request({
      url: api['replyLike'],
      method: "delete",
      data: {
        uid: getApp().globalData.userInfo.uid,
        replyId: replyId
      },
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          let tempReply = this.data.reply;
          tempReply[index].likes--;
          tempReply[index].likeId = false;
          this.setData({reply: tempReply});
        }
      }
    })
  },

  replyReply: function (e) {
    console.log(e.currentTarget.dataset);
    let { touid } = e.currentTarget.dataset;
    if (touid === getApp().globalData.userInfo.uid) {
      touid = this.data.comment.uid
    }
    wx.navigateTo({
      url: `/pages/editor/editor?commentId=${this.data.comment.id}&toUid=${touid}&type=reply`,
    })
  }

})