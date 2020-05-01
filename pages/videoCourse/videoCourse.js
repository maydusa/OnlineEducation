import { api } from "../../constants/api";
import { formatTime, getRandomColor } from "../../utils/util";

Page({

  data: {
    tabIndex: 0,
    time: 0,
    danmu: [],
    text: "",
    note: [],
    course: {
      likes: 0,
      url: "",
      id: 0,
      uid: 6
    }
  },

  onLoad: function (options) {
    this.videoContext = wx.createVideoContext('video');
    wx.request({
      url: `${api['course']}?courseId=3&uid=${getApp().globalData.userInfo.uid}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          this.setData({course: res.data.data})
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
    this.fetchNote();
    this.fetchDanmu();
  },

  updateNote: function (e) {
    this.setData({text: e.detail.value})
  },

  updateTime: function(e) {
    const { currentTime } = e.detail;
    this.setData({time: Math.floor(currentTime)});
  },

  toggleTab: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({tabIndex: index});
  },

  send: function () {
    if (this.data.tabIndex == 0) {
      wx.request({
        url: api['note'],
        method: "post",
        data: {
          uid: getApp().globalData.userInfo.uid,
          content: this.data.text,
          courseId: 3
        },
        success: res => {
          console.log(res);
          if (res.data.code === 0) {
            this.fetchNote();
            this.setData({text: ""})
          }
        }
      })
    } else {
      this.videoContext.sendDanmu({
        text: this.data.text,
        color: getRandomColor()
      })
      wx.request({
        url: api['danmu'],
        method: "post",
        data: {
          uid: getApp().globalData.userInfo.uid,
          courseId: this.data.course.id,
          text: this.data.text,
          time: this.data.time
        },
        success: res => {
          console.log(res);
        }
      })
    }
  },

  fetchNote: function () {
    wx.request({
      url: `${api['note']}?courseId=3`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempNote = res.data.data;
          tempNote.map(item => {
            item.create_time = formatTime(item.create_time);
            return item;
          })
          this.setData({note: tempNote});
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  fetchDanmu: function () {
    wx.request({
      url: `${api['danmu']}?courseId=3`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const temp = res.data.data;
          temp.map(item => {
            item.create_time = formatTime(item.create_time);
            item.color = getRandomColor();
            return item;
          })
          this.setData({danmu: temp});
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  handleLike: function () {
    const { course } = this.data;
    console.log(course);
    if (!course.id) return;
    if (course.likeId) {
      this.unlike();
    } else {
      this.like();
    }
  },

  like: function () {
    console.log("llike");
    const { course } = this.data;
    wx.request({
      url: api['courseLike'],
      method: "post",
      data: {
        uid: getApp().globalData.userInfo.uid,
        courseId: course.id
      },
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempCoursee = this.data.course;
          tempCoursee.likeId = true;
          tempCoursee.likes++;
          this.setData({course: tempCoursee});
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
  },

  unlike: function () {
    const { course } = this.data;
    wx.request({
      url: api['courseLike'],
      method: "delete",
      data: {
        uid: getApp().globalData.userInfo.uid,
        courseId: course.id
      },
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempCoursee = this.data.course;
          tempCoursee.likeId = false;
          tempCoursee.likes--;
          this.setData({course: tempCoursee});
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })    
  },

  star: function () {
    const { course } = this.data;
    wx.request({
      url: api['courseStar'],
      method: "post",
      data: {
        uid: getApp().globalData.userInfo.uid,
        courseId: course.id
      },
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          if (course.starId) {
            const tempCourse = this.data.course;
            tempCourse.starId = false;
            this.setData({course: tempCourse})
          } else {
            const tempCourse = this.data.course;
            tempCourse.starId = true;
            this.setData({course: tempCourse})
          }
        }
      }
    })
  },

  makeExercise: function () {
      wx.navigateTo({
        url: `/pages/exercise/exercise?uid=${getApp().globalData.userInfo.uid}&courseId=${this.data.course.id}`,
      })
    // if (getApp().globalData.userInfo.uid === this.data.course.uid) {
    //   wx.navigateTo({
    //     url: `/pages/makeExercise/makeExercise?uid=${getApp().globalData.userInfo.uid}&courseId=${this.data.course.id}`,
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: `/pages/exercise/exercise?uid=${getApp().globalData.userInfo.uid}&courseId=${this.data.course.id}`,
    //   })
    // }
  }

})