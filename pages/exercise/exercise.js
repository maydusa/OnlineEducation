import { api } from "../../constants/api";

Page({

  data: {
    scrollId: "p0",
    exercise: [
      {"typeType":0,"typeText":["单选题","判断题","问答题"],"titleType":0,"titleText":["文本","图片"],"title":"这是题目","titleImg":{"url":"","isUpload":false},"answerType":0,"answerText":["文本","图片"],"answer":"答案就是好好学习","answerImg":{"url":"","isUpload":false},"choice":["链表","树","图","栈"]}
      // {
      //   id: 1,
      //   title: "problem 1",
      //   type: 1,
      //   choices: [
      //     "apple",
      //     "orange",
      //     "vegetable",
      //     "helo"
      //   ]
      // },
      // {
      //   id: 2,
      //   title: "problem 2",
      //   type: 2,
      //   choices: ["是", "否"]
      // }
    ],
    answer: [
      {
        answerType: 0,
        answerText: [
          "文本",
          "图片"
        ],
        choice: "",
        content: "",
        img: {url: "", isUpload: false}
      }
    ],
    isComplete: false,
    exerciseId: 0
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  handleChoice: function (e) {
    const { index } = e.currentTarget.dataset;
    const { answer } = this.data;
    answer[index].choice = e.detail.value;
    this.setData({answer});
  },

  complete: function () {
    wx.request({
      url: api['answer'],
      method: "post",
      data: {
        uid: getApp().globalData.userInfo.uid,
        exerciseId: this.data.exerciseId,
        content: JSON.stringify(this.data.answer)
      },
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          this.setData({isComplete: true})
        }
      }
    })
  }

})