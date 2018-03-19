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
  getDateTime
}
