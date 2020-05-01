import { api } from "../../constants/api";
import { formatSize } from "../../utils/util";

Page({

  data: {
    course: []
  },

  onLoad: function (options) {

  },

  add: function () {
    wx.chooseMessageFile({
      count: 1,
      type: 'video',
      success: res => {
        console.log(res);
        const tempFile = res.tempFiles[0];
        const tempCourse = this.data.course;
        let title = tempFile.name;
        title = title.split(".");
        title.pop();
        title = title.join("");
        tempCourse.unshift({
          title: title,
          size: formatSize(tempFile.size),
          path: tempFile.path
        })
        this.setData({
          course: tempCourse
        })
      }
    })
  },

  delete: function (e) {
    const { index } = e.currentTarget.dataset;
    const { course } = this.data;
    course.splice(index, 1);
    this.setData({course: course})
  },

  upload: function () {
    const { course } = this.data;
    for (let i = 0; i < course.length; i++) {
      wx.uploadFile({
        filePath: course[i].path,
        name: 'file',
        url: api['uploadCourse'],
        formData: {
          title: course[i].title,
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

})