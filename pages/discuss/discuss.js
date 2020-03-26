import { api } from "../../constants/api";
import { formatTime } from "../../utils/util";
Page({

  data: {
    discussion: [],
    offset: 0,
    hasMore: false
  },

  onLoad: function (options) {
    wx.request({
      url: `${api['discuss']}?offset=${this.data.offset}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          let tempDiscussion = res.data.data.discussion.map((item, index) => {
            item.create_time = formatTime(item.create_time);
            item.images = JSON.parse(item.images);
            return item;
          })
          this.setData({discussion: [...this.data.discussion, ...tempDiscussion], offset: this.data.offset + 10, hasMore: res.data.data.hasMore});
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
      url: `${api['discuss']}?offset=${this.data.offset}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          let tempDiscussion = res.data.data.discussion.map((item, index) => {
            item.create_time = formatTime(item.create_time);
            item.images = JSON.parse(item.images);
            return item;
          })
          this.setData({discussion: [...this.data.discussion, ...tempDiscussion], offset: this.data.offset + 10, hasMore: res.data.data.hasMore});
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
    let { imgs, index } = e.currentTarget.dataset;
    wx.previewImage({
      urls: imgs,
      current: imgs[index]
    })
  },

  toDetail: function (e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/discussDetail/discussDetail?id=${id}`,
    })
  }

  // like: function (e) {
  //   const { id, index, likeid } = e.currentTarget.dataset;
  //   wx.request({
  //     url: api['discussLike'],
  //     method: "post",
  //     data: {
  //       id,
  //       uid: getApp().globalData.userInfo.uid
  //     },
  //     success: res => {
  //       console.log(res);
  //       if (res.data.code !== 0) {
  //         wx.showToast({
  //           title: res.data.msg,
  //           icon: "none"
  //         })
  //         return;
  //       };
  //       if (likeid) {
  //         const tempDiscussion = this.data.discussion;
  //         tempDiscussion[index].likes--;
  //         tempDiscussion[index].likeId = false;
  //         this.setData({discussion: tempDiscussion})
  //       } else {
  //         const tempDiscussion = this.data.discussion;
  //         tempDiscussion[index].likes++;
  //         tempDiscussion[index].likeId = true;
  //         this.setData({discussion: tempDiscussion})           
  //       }
  //     }
  //   })
  // },

  // star: function (e) {
  //   const { id, index, starid } = e.currentTarget.dataset;
  //   wx.request({
  //     url: api['discussStar'],
  //     method: "post",
  //     data: {
  //       id,
  //       uid: getApp().globalData.userInfo.uid
  //     },
  //     success: res => {
  //       console.log(res);
  //       if (res.data.code !== 0) {
  //         wx.showToast({
  //           title: res.data.msg,
  //           icon: "none"
  //         })
  //         return;
  //       };
  //       if (starid) {
  //         const tempDiscussion = this.data.discussion;
  //         tempDiscussion[index].starId = false;
  //         this.setData({discussion: tempDiscussion})
  //       } else {
  //         const tempDiscussion = this.data.discussion;
  //         tempDiscussion[index].starId = true;
  //         this.setData({discussion: tempDiscussion})           
  //       }
  //     }
  //   })
  // }
})