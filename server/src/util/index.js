const regexs = {
  phone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  password: /^[A-Za-z][0-9A-Za-z]{5,17}$/,
  nickname: /^[0-9a-zA-Z\u4e00-\u9fa5_]{2,10}$/
}

module.exports = {
  regexs,
  upperFirst: str => {
    if (typeof str !== 'string') {
      throw new TypeError('param must be a string.')
    }
    return str.substring(0, 1).toUpperCase() + str.substring(1)
  }
}
