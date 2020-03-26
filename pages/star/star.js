import { api } from "../../constants/api";
import { formatTime } from "../../utils/util";

Page({

  data: {
    star: [],
    offset: 0,
    hasMore: false
  },

  onLoad: function (options) {
    console.log(getApp().globalData)
    setTimeout(() => {
      wx.request({
        url: `${api['getStar']}?uid=${getApp().globalData.userInfo.uid}&offset=${this.data.offset}`,
        method: "get",
        success: res => {
          console.log(res);
          if (res.data.code === 0) {
            let tempStar = res.data.data.star.map((item, index) => {
              item.create_time = formatTime(item.create_time);
              return item;
            })
            this.setData({
              star: [...this.data.star, ...tempStar],
              offset: this.data.offset + 10,
              hasMore: res.data.data.hasMore
            })
          }
        }
      })
    }, 600);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  cancelStar: function (e) {
    const { discussid, index } = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset)
    wx.request({
      url: api['discussStar'],
      method: "post",
      data: {
        id: discussid,
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
        const tempStar = this.data.star;
        tempStar.splice(index, 1);
        this.setData({star: tempStar});
      }
    })
  }
})