module.exports = {
  db: {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'password',
    database: 'test',
    operatorsAliases: false // Issue #8417
  },
  jwt: {
    secret: 'KidneyFlower',
    options: {
      expiresIn: '60s'
    }
  }
}
