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
  getStar: `${domain}/getStar`
}

module.exports = {
  api
}