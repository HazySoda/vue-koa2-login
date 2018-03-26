module.exports = {
  db: {
    dialect: 'mysql', // 连接数据库的类型
    host: 'localhost', // MySQL 地址
    port: '3306', // MySQL 端口号
    username: 'root', // MySQL 用户名
    password: 'password', // MySQL 密码
    database: 'test', // 使用的数据库名称
    operatorsAliases: false // Issue #8417
  },
  jwt: {
    secret: 'KidneyFlower', // jsonwebtoken 使用的 secret
    options: {
      expiresIn: '60s' // Token 的过期时间
    }
  }
}
