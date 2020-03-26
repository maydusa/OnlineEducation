const { domain } = require("./config.js");

const api = {
  checkStatus: `${domain}/checkStatus`,
  login: `${domain}/login`,
  register: `${domain}/register`,
  upload: `${domain}/upload`,
  discuss: `${domain}/discuss`,
  discussLike: `${domain}/discussLike`,
  discussStar: `${domain}/discussStar`,
  getStar: `${domain}/getStar`
}

module.exports = {
  api
}