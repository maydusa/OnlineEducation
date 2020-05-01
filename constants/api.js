const { domain } = require("./config.js");

const api = {
  checkStatus: `${domain}/checkStatus`,
  login: `${domain}/login`,
  register: `${domain}/register`,
  upload: `${domain}/upload`,
  discuss: `${domain}/discuss`,
  comment: `${domain}/comment`,
  reply: `${domain}/reply`,
  discussLike: `${domain}/discussLike`,
  discussStar: `${domain}/discussStar`,
  commentLike: `${domain}/commentLike`,
  replyLike: `${domain}/replyLike`,
  getDiscussStar: `${domain}/getDiscussStar`,
  getCourseStar: `${domain}/getCourseStar`,
  uploadCourse: `${domain}/uploadCourse`,
  uploadDoc: `${domain}/uploadDoc`,
  course: `${domain}/course`,
  courseLike: `${domain}/courseLike`,
  courseStar: `${domain}/courseStar`,
  note: `${domain}/note`,
  userInfo: `${domain}/userInfo`,
  doc: `${domain}/doc`,
  runcode: `${domain}/runcode`,
  ocr: `${domain}/ocr`,
  exercise: `${domain}/exercise`,
  answer: `${domain}/answer`,
  danmu: `${domain}/danmu`,
  hotCourse: `${domain}/hotCourse`,
  hotDoc: `${domain}/hotDoc`,
  isMessage: `${domain}/isMessage`,
  searchCourse: `${domain}/searchCourse`,
  searchDoc: `${domain}/searchDoc`,
  message: `${domain}/message`,
  communication: `${domain}/communication`
}

module.exports = {
  api
}