const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')
const { upperFirst } = require('../util')

const sequelize = new Sequelize(config.db)

// Model文件夹路径
let modelsPath = path.resolve(__dirname, '../models')
// 读取Model文件夹中的每一项
const child = fs.readdirSync(modelsPath)
// 遍历读取出的内容
for (let model of child) {
  // 获取Model的绝对路径
  let modelPath = path.resolve(modelsPath, model)
  if (fs.statSync(modelPath).isFile()) {
    // 如果Model是一个文件，则将其import
    const modelName = upperFirst(path.basename(modelPath, '.js'))
    sequelize[modelName] = sequelize.import(modelPath)
    console.log(`Model [${modelName}] has been imported.`)
  }
}
// 同步数据库
sequelize.sync()

module.exports = sequelize
