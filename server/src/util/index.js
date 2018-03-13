module.exports = {
  upperFirst: str => {
    if (typeof str !== 'string') {
      throw new TypeError('param must be a string.')
    }
    return str.substring(0, 1).toUpperCase() + str.substring(1)
  }
}
