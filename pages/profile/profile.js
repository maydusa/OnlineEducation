import { api } from "../../constants/api";
import { formatSize } from "../../utils/util";

Page({

  data: {
    userInfo: {},
    tabs: [
      "课程",
      "文档",
      "讨论"
    ],
    tabIndex: 0,
    CourseList: [],
    DocList: [],
    DiscussList: [],
    uid: 6
  },

  onLoad: function (options) {
    wx.request({
      url: `${api['userInfo']}?uid=6`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          this.setData({userInfo: res.data.data});
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    });
    this.fetchCourse();
    this.fetchDoc();
    this.fetchDiscuss();
  },

  changeTab: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({tabIndex: index});
  },

  fetchCourse: function () {
    wx.request({
      url: `${api['course']}?uid=6`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempList = res.data.data;
          tempList.map(item => {
            item.size = formatSize(item.size);
            return item
          })
          this.setData({CourseList: tempList});
        }
      }
    })
  },

  fetchDoc: function () {
    wx.request({
      url: `${api['doc']}?uid=6`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempList = res.data.data;
          tempList.map(item => {
            item.size = formatSize(item.size);
            if (item.extension === "pdf") {
              item.cover = "../../media/images/bg-pdf.png";
            } else if (item.extension === "doc" || item.extension === "docx") {
              item.cover = "../../media/images/bg-word.png";
            } else {
              item.cover = "../../media/images/bg-ppt.png";
            }
            return item
          })
          this.setData({DocList: tempList});
        }
      }
    })
  },

  fetchDiscuss: function () {
    wx.request({
      url: `${api['discuss']}?uid=6`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempList = res.data.data;
          tempList.map(item => {
            item.images = JSON.parse(item.images);
            return item;
          })
          this.setData({DiscussList: res.data.data});
        }
      }
    })
  },

  previewImg: function (e) {
    let { index, imgs } = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset)
    wx.previewImage({
      urls: imgs,
      current: imgs[index]
    })
  },

  ask: function () {
    wx.navigateTo({
      url: `/pages/ask/ask?uid=${this.data.uid}`,
    })
  },

  toCourse: function (e) {
    const { index } = e.currentTarget.dataset;
    const { CourseList } = this.data;
    wx.navigateTo({
      url: `/pages/videoCourse/videoCourse?courseId=${CourseList[index].id}`,
    })
  },

  downloadDoc: function (e) {
    const { index } = e.currentTarget.dataset;
    const { DocList } = this.data;
    wx.downloadFile({
      url: DocList[index].url,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },

  toDiscuss: function (e) {
    const { index } = e.currentTarget.dataset;
    const { DiscussList } = this.data;
    wx.navigateTo({
      url: `/pages/discussDetail/discussDetail?discussId=${DiscussList[index].id}`,
    })
  }

})