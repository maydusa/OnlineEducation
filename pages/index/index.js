const app = getApp()
import { api } from "../../constants/api";
import { formatTime } from "../../utils/util";
import { pageSize } from "../../constants/config";

Page({
  data: {
    searchText: "",
    tabIndex: 0,
    hotCourse: {
      offset: 0,
      hasMore: false
    },
    hotDoc: {
      offset: 0,
      hasMore: false
    },
    course: [],
    doc: []
  },
  onLoad: function () {
    this.fetchCourse();
    this.fetchDoc();
  },

  onReachBottom: function () {
    if (this.data.tabIndex == 0) {
      this.fetchCourse();
    } else {
      this.fetchDoc();
    }
  },

  updateSearchText: function (e) {
    this.setData({searchText: e.detail.value});
  },

  toggleTab: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({tabIndex: index});
  },

  fetchCourse: function () {
    wx.request({
      url: `${api['hotCourse']}?offset=${this.data.hotCourse.offset}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code == 0) {
          const tempCourse = res.data.data.course;
          const hotCourse = {
            hasMore: res.data.data.hasMore,
            offset: this.data.hotCourse.offset + pageSize
          }
          tempCourse.map(item => {
            item.create_time = formatTime(item.create_time);
            return item;
          })
          this.setData({
            course: [...this.data.course, ...tempCourse],
            hotCourse
          })
        }
      }
    })
  },

  fetchDoc: function () {
    wx.request({
      url: `${api['hotDoc']}?offset=${this.data.hotDoc.offset}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempDoc = res.data.data.doc;
          const hotDoc = {
            hasMore: res.data.data.hasMore,
            offset: this.data.hotDoc.offset + pageSize
          }
          tempDoc.map(item => {
            if (item.extension === "pdf") {
              item.cover = "../../media/images/bg-pdf.png";
            } else if (item.extension === "doc" || item.extension === "docx") {
              item.cover = "../../media/images/bg-word.png";
            } else {
              item.cover = "../../media/images/bg-ppt.png";
            }
            item.create_time = formatTime(item.create_time);
            return item;
          })
          this.setData({
            doc: [...this.data.doc, ...tempDoc],
            hotDoc
          });
        }
      }
    })
  },

  toCourse: function (e) {
    const { index } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/videoCourse/videoCourse?courseId=${this.data.course[index].id}`,
    })
  },

  downloadDoc: function (e) {
    const { index } = e.currentTarget.dataset;
    const { doc } = this.data;
    wx.downloadFile({
      url: doc[index].url,
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

  search: function () {
    if (this.data.tabIndex == 0) {
      wx.request({
        url: `${api['searchCourse']}?searchText=${this.data.searchText}`,
        method: "get",
        success: res => {
          if (res.data.code === 0) {
            const tempCourse = res.data.data;
            const hotCourse = {
              hasMore: false,
              offset: 0
            }
            tempCourse.map(item => {
              item.create_time = formatTime(item.create_time);
              return item;
            })
            this.setData({
              course: tempCourse,
              hotCourse
            })
          }
        }
      })
    } else {
      wx.request({
        url: `${api['searchDoc']}?searchText=${this.data.searchText}`,
        method: "get",
        success: res => {
          console.log(res);
          if (res.data.code === 0) {
            const tempDoc = res.data.data;
            const hotDoc = {
              hasMore: false,
              offset: 0
            }
            tempDoc.map(item => {
              if (item.extension === "pdf") {
                item.cover = "../../media/images/bg-pdf.png";
              } else if (item.extension === "doc" || item.extension === "docx") {
                item.cover = "../../media/images/bg-word.png";
              } else {
                item.cover = "../../media/images/bg-ppt.png";
              }
              item.create_time = formatTime(item.create_time);
              return item;
            })
            this.setData({
              doc: tempDoc,
              hotDoc
            });
          }
        }
      })
    }
  }

})
