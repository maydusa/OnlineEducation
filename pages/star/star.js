import { api } from "../../constants/api";
import { formatTime } from "../../utils/util";

Page({

  data: {
    tabIndex: 0,
    courseStar: [],
    discussStar: []
  },

  onLoad: function (options) {
    this.fetchCourseStar();
    this.fetchDiscussStar();
  },

  fetchCourseStar: function () {
    wx.request({
      url: `${api['getCourseStar']}?uid=6`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempStar = res.data.data;
          tempStar.map(item => {
            item.create_time = formatTime(item.create_time);
            return item;
          })
          this.setData({courseStar: tempStar});
        }
      }
    })
  },

  fetchDiscussStar: function () {
    wx.request({
      url: `${api['getDiscussStar']}?uid=5`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempStar = res.data.data;
          tempStar.map(item => {
            item.create_time = formatTime(item.create_time);
            return item;
          })
          this.setData({discussStar: res.data.data});
        }
      }
    })
  },

  toggleTab: function (e) {
    const { index } = e.currentTarget.dataset;
    console.log(index);
    this.setData({tabIndex: index});
  },

  cancelCourseStar: function (e) {
    console.log(e.currentTarget.dataset);
    const { courseid, index } = e.currentTarget.dataset;
    wx.request({
      url: api['courseStar'],
      method: "post",
      data: {
        courseId: courseid,
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
        const tempStar = this.data.courseStar;
        tempStar.splice(index, 1);
        this.setData({courseStar: tempStar});
      }
    })
  },

  cancelDiscussStar: function (e) {
    const { discussid, index } = e.currentTarget.dataset;
    wx.request({
      url: api['discussStar'],
      method: "post",
      data: {
        discussId: discussid,
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
        const tempStar = this.data.discussStar;
        tempStar.splice(index, 1);
        this.setData({discussStar: tempStar});
      }
    })
  }
})