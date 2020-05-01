import { api } from "../../constants/api";

Page({

  data: {
    scrollId: "p0",
    exercise: [
      {
        typeType: 0,
        typeText: [
          "单选题",
          "判断题",
          "问答题"
        ],
        titleType: 0,
        titleText: [
          "文本",
          "图片"
        ],
        title: "",
        titleImg: {
          url: "",
          isUpload: false
        },
        answerType: 0,
        answerText: [
          "文本",
          "图片"
        ],
        answer: "",
        answerImg: {
          url: "",
          isUpload: false
        },
        choice: [
          "","","",""
        ]
      }
    ],
    courseId: 0
  },


  onLoad: function (options) {
  },

  handlePickType: function (e) {
    const { index } = e.currentTarget.dataset;
    const { value } = e.detail;
    let tempExercise = this.data.exercise;
    tempExercise[index].typeType = value;
    if (value == 0) {
      tempExercise[index].choice = ["", "", "", ""];
    } else if (value == 1) {
      tempExercise[index].choice = ["是", "否"];
    }
    tempExercise.titleType = 0;
    tempExercise.title = "",
    tempExercise.titleImg = {url: "", isUpload: false};
    tempExercise.answerType = 0;
    tempExercise.answer = "",
    tempExercise.answerImg = {url: "", isUpload: false};
    this.setData({
      exercise: tempExercise
    });
  },

  handlePickTitleType: function (e) {
    const { index } = e.currentTarget.dataset;
    const { value } = e.detail;
    let tempExercise = this.data.exercise;
    tempExercise[index].titleType = value;
    this.setData({
      exercise: tempExercise
    })
  },

  updateTitle: function (e) {
    const { index } = e.currentTarget.dataset;
    const tempExercise = this.data.exercise;
    tempExercise[index].title = e.detail.value;
    this.setData({exercise: tempExercise})
  },

  chooseImg: function (e) {
    const { index, type } = e.currentTarget.dataset;
    wx.chooseImage({
      count: 1,
      success: res => {
        const { tempFilePaths } = res;
        const tempExercise = this.data.exercise;
        if (type == 0) {
          tempExercise[index].titleImg = {url: tempFilePaths[0], isUpload: false};
        } else if (type == 1) {
          tempExercise[index].answerImg = {url: tempFilePaths[0], isUpload: false};
        }
        console.log(tempExercise);
        this.setData({exercise: tempExercise});
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: api['upload'],
          formData: {
            uid: getApp().globalData.userInfo.uid
          },
          success: res => {
            let data = JSON.parse(res.data);
            console.log(data);
            if (data.code === 0) {
              const tempExercise = this.data.exercise;
              if (type == 0) {
                tempExercise[index].titleImg.isUpload = true;
                tempExercise[index].titleImg.url = data.data[0].url;
                this.setData({exercise: tempExercise});
              } else if (type == 1) {
                tempExercise[index].answerImg.isUpload = true;
                tempExercise[index].answerImg.url = data.data[0].url;
                this.setData({exercise: tempExercise});
              }
            } else {
              wx.showToast({
                title: data.msg,
                icon: "none"
              })
            }
          }
        })
      }
    })
  },

  handleImageTap: function (e) {
    const that = this;
    const { index, imgs, type } = e.currentTarget.dataset;
    wx.showActionSheet({
      itemList: ['预览', '删除'],
      success: res => {
        let previewImgs = [];
        for (let i = 0; i < imgs.length; i++) {
          previewImgs.push(imgs[i].url);
        }
        if (res.tapIndex === 0) {
          wx.previewImage({
            current: previewImgs[index],
            urls: previewImgs,
          })
        } else {
          const tempExercise = that.data.exercise;
          if (type == 0) {
            tempExercise[index].titleImg = {url: "", isUpload: false};
          } else if (type == 1) {
            tempExercise[index].answerImg = {url: "", isUpload: false};
          }
          that.setData({exercise: tempExercise});
        }
      }
    })
  },

  updateChoice: function (e) {
    const { index, choiceindex } = e.currentTarget.dataset;
    const { exercise } = this.data;
    exercise[index].choice[choiceindex] = e.detail.value;
    this.setData({exercise});
  },

  updateAnswer: function (e) {
    const { index } = e.currentTarget.dataset;
    const { exercise } = this.data;
    exercise[index].answer = e.detail.value;
    this.setData({exercise});
  },

  handlePickAnswerType: function (e) {
    const { index } = e.currentTarget.dataset;
    const { exercise } = this.data;
    exercise[index].answerType = e.detail.value;
    this.setData({exercise});
  },

  toPrev: function () {
    this.setData({scrollId: `p${Number(this.data.scrollId.slice(1)) - 1}`})
  },

  toNext: function () {
    this.setData({scrollId: `p${Number(this.data.scrollId.slice(1)) + 1}`})
  },

  add: function () {
    const { exercise } = this.data;
    exercise.push(
      {
        typeType: 0,
        typeText: [
          "单选题",
          "判断题",
          "问答题"
        ],
        titleType: 0,
        titleText: [
          "文本",
          "图片"
        ],
        title: "",
        titleImg: {
          url: "",
          isUpload: false
        },
        answerType: 0,
        answerText: [
          "文本",
          "图片"
        ],
        answer: "",
        answerImg: {
          url: "",
          isUpload: false
        },
        choice: [
          "","","",""
        ]
      }
    )
    this.setData({exercise});
  },

  complete: function () {
    console.log(this.data.exercise);
    wx.request({
      url: api['exercise'],
      method: "post",
      data: {
        uid: getApp().globalData.userInfo.uid,
        courseId: this.data.courseId,
        content: JSON.stringify(this.data.exercise)
      },
      success: res => {
        console.log(res);
      }
    })
  }

})