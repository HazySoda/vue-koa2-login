const regexs = {
  phone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  password: /^[A-Za-z][0-9A-Za-z]{5,17}$/,
  nickname: /^[0-9a-zA-Z\u4e00-\u9fa5_]{2,10}$/
}

const getDateTime = timestamp => {
  const date = timestamp ? new Date(timestamp) : new Date()
  const prefix = (num) => num >= 10 ? num : `0${num}`

  const year = date.getFullYear()
  const month = prefix(date.getMonth() + 1)
  const day = prefix(date.getDate())
  const hour = prefix(date.getHours())
  const minute = prefix(date.getMinutes())
  const second = prefix(date.getSeconds())

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export {
  regexs,
  getDateTime
}
