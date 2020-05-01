import { api } from "../../constants/api";

Page({

  data: {
    message: "",
    msgs: [
      // {
      //   uid: 6,
      //   touid: 5,
      //   content: "qweqwewq",
      //   isSelf: true
      // },
      // {
      //   uid: 5,
      //   touid: 6,
      //   content: "123",
      //   isSelf: false
      // }
    ],
    uidUserInfo: {},
    touidUserInfo: {}
  },

  onLoad: function (options) {
    wx.request({
      url: `${api['userInfo']}?uid=${Number(options.touid)}`,
      method: "get",
      success: res => {
        if (res.data.code === 0) {
          this.setData({
            touidUserInfo: res.data.data,
            uidUserInfo: getApp().globalData.userInfo
          })
        }
      }
    })

    wx.request({
      url: api['communication'],
      method: "post",
      data: {
        uid: Number(options.touid),
        touid: Number(options.uid)
      },
      success: res => {
        console.log(res);
      }
    })

    wx.request({
      url: `${api['communication']}?uid=${Number(options.uid)}&touid=${Number(options.touid)}`,
      method: "get",
      success: res => {
        console.log(res);
        if (res.data.code === 0) {
          const tempMsg = res.data.data;
          tempMsg.map(item => {
            if (item.uid == options.uid) {
              item.isSelf = true;
            } else {
              item.isSelf = false;
            }
          })
          this.setData({msgs: tempMsg});
        }
      }
    })

    let ws = wx.connectSocket({
      url: 'ws://localhost:8090',
      header: {
        uid: this.data.uidUserInfo.uid,
        toUid: this.data.touidUserInfo.uid
      },
      success: res => {
        console.log("websocket connect successfully");
      }
    })
    ws.onOpen(res => {
      this.ws = ws;
      ws.onMessage(res => {
        console.log(res);
        let msg = JSON.parse(res);
        const { msgs } = this.data;
        if (msg.uid == getApp().globalData.userInfo.uid) {
          msg.isSelf = false;
        } else {
          msg.isSelf = true;
        }
        msgs.push(msg);
        this.setData({msgs});
      })
    })
  },

  onHide: function () {
    if (this.ws) {
      this.ws.close({
        success: res => {
          console.log(res);
          console.log("close");
        }
      });
    }
  },

  updateMessage: function (e) {
    this.setData({message: e.detail.value})
  },

  send: function () {
    if (!this.ws) return;
    this.ws.send({
      data: this.data.message,
      success: res => {
        console.log(res);
        const tempMsgs = this.data.msgs;
        tempMsgs.push({
          uid: 6,
          touid: 5,
          content: this.data.message,
          isSelf: true
        })
        this.setData({msgs: tempMsgs});
      },
      complete: () => {
        this.setData({message: ""})
      }
    })
  }

  // chooseImg: function () {
  //   wx.navigateTo({
  //     url: '/pages/login/login',
  //   })
  // }

})