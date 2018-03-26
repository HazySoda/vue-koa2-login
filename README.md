# vue-koa2-login

> Vue + Koa2 实现前后端注册登录流程

## 技术栈

前端：

- [vue2.x](https://github.com/vuejs/vue)
- [Vue-router](https://github.com/vuejs/vue-router)
- [vuex](https://github.com/vuejs/vuex)
- [element](https://github.com/ElemeFE/element)
- [axios](https://github.com/axios/axios)

后端：

- [koa2.x](https://github.com/koajs/koa)
- [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)
- [sequelize](https://github.com/sequelize/sequelize)

## 环境要求

1. [Node.js](https://nodejs.org/en/)：推荐最新LTS版本，至少要在v7.6以上 (7.6默认支持`Async/Await`)。
2. [MySQL](https://www.mysql.com/cn/)：我使用的是最新版本，5.x应该都可以。
3. [Yarn (可选)](https://yarnpkg.com/zh-Hans/)：我个人强力安利`Yarn`，下面的例子也会使用，如果您不想使用`Yarn`，使用`NPM`即可。

## 运行项目

**上面的环境依赖都装好以后，在运行之前，我们要先对后端项目进行一些配置：**

``` bash
# 先把项目克隆到本地
$ git clone git@github.com:KidneyFlower/vue-koa2-login.git

# 进入后端项目文件夹
$ cd vue-koa2-login/server/
```

**打开`src/config/index.js`会看到如下代码：**

``` javascript
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
```

**将配置项中的数据修改为你的实际数据，保存后我们继续：**

``` bash
# 安装后端所需依赖
$ yarn install

# 运行后端项目
$ yarn dev

# 如果后端运行正常，打开一个新的终端窗口

# 进入前端项目文件夹
$ cd /your/path/to/vue-koa2-login/

# 安装前端所需依赖
$ yarn install

# 运行前端项目
$ yarn serve
```

前端项目地址：[http://127.0.0.1:8080](http://127.0.0.1:8080)

后端项目地址：[http://127.0.0.1:3000](http://127.0.0.1:3000)

## Issues & Pull Requests

由于本人是`Node.js`的初学者，写出的代码虽然可以运行，但一定不是最优解，如果您愿意在这方面指导我，欢迎您在`Issue`中提出宝贵的建议。

如果您觉得项目中哪里写得不好或者有更好、更简洁的写法，也欢迎您提出宝贵的`Pull Request`。

不胜感激！！！

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, KidneyFlower
