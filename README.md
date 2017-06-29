# 基于 NodeJs+MongoDB+jQuery+Bootstrap 搭建的豆瓣电影网站
### 一、简介
本项目是基于Nodejs的练手项目，期间参考了慕课网[Scott老师的课程](http://www.imooc.com/learn/197)（代码结构及路由全都重新改造），在老师所讲的基础上增加了许多的功能并且加以完善，项目基于 Express 4.15 版本，代码采用 Es6 编写，代码已加注释，提高了阅读性和维护性，可供参考：
#### 1、项目前端搭建:
* 使用jQuery和Bootsrap完成网站前端JS脚本和样式处理；
* 前后端的数据请求交互通过Ajax完成；
* 引入了Moment.js格式化前端页面显示时间；
#### 2、项目后端搭建:
* 使用NodeJs的express框架完成电影网站后端搭建；
* 使用mongodb完成数据存储，通过mongoose模块完成对mongodb数据的构建；
* 使用jade模板引擎完成页面创建渲染；
* 使用Moment.js格式化电影存储时间；
#### 3、本地开发环境搭建:
* 使用gulp集成jshint对JS语法检查，加入browser-sync与nodemon，实现实时刷新及服务器的自动重启等功能。
#### 4、网站整体功能:
网站正常访问无需管理员权限，对电影的评论及个人中心资料的修改，需要用户登录，对网站数据的修改添加删除需要管理员的权限，默认一个管理员，具体功能如下：
* 实现了用户的基本注册，登录，登出及管理功能；
* 实现了搜索功能，模糊关键字可搜索电影名字及电影类别下的电影；
* 用户登录做session处理，失效期暂时5天；
* 用户可以对电影进行评论及个人中心资料的修改（可上传用户头像）；
* 电影添加分类及录入，数据可以同步豆瓣ID；
* 对电影数据作分页处理，分页查询数据库数据；
* 管理员可以对网站数据进行增加删除修改（需要管理员权限）；
* 管理员可从后台查看所有的电影、用户、评论、访问量等数据；
### 二、网站整体效果，截图看[这里](https://github.com/chenjun1127/Movie-Site/blob/master/images.md)
### 三、运行环境及Node版本:
作为windows平台的忠实粉丝（≥▽≤/），当前平台下node v6.9.2 ，运行正常！
### 四、安装
* MongoDB 安装[mongodb](https://www.mongodb.org/downloads#production)完成相关配置；
* 克隆项目，进入项目目录；
```javascript
git clone git@github.com:chenjun1127/Movie-Site.git
cd movie-site
```
* 安装依赖
```javascript
npm install
bower install 
```
### 五、运行及使用
上面步骤完成后，打开app.js入口文件，可以看到当前连接的是本地的 express-demo 这个数据库，接下来启动数据库相关服务；在当前目录通过命令
```bash
gulp
```
启动项目，稍等片刻后，gulp会自动打开chrome浏览器，就可以看到 http://localhost:3000/ 主页，项目就运行成功了。注意：若端口已占用可在app.js文件中将gulp的代理端口3000换成未占用的端口！
```bash
gulp dist
```
Tips：gulp dist 命令可以检测项目JS是否有错误！
### 六、项目页面
当使用管理员账号（chenjun,123456）登录时，在网站右上角会出现下拉菜单，通过点击菜单可以进入各个页面，如果自己注册的账号，默认为普通用户（role为0），普通用户有权限限制，是无法进入到电影的列表、录入、分类、用户等管理页面的！当然，可自行修改数据库里的当前账号的role值，当role大于10的时候，就有管理员权限了！基本的界面路由如下：
基本页面：
* 首页：localhost:3000/
* 详情页：localhost:3000/movie/:id
* 当前电影分页类别页：localhost:3000/movie/category/result?cat=id&pageSize=1

用户关联：

* 用户注册：localhost:3000/signUp
* 用户登录：localhost:3000/signIn
* 用户个人中心：localhost:3000/user/center?userId=id

后台管理：

* 当前电影列表：localhost:3000/admin/movie/list
* 电影录入：localhost:3000/admin/movie/add
* 电影数据修改：localhost:3000/admin/movie/update/:id
* 电影分类列表：localhost:3000/admin/category/list
* 电影分类修改：localhost:3000/admin/category/update/:id
* 电影分类新增：localhost:3000/admin/category/new
* 用户列表：localhost:3000/admin/user/list
### 七、项目结构
```bash
├── app.js              项目入口文件
├── routs               路由总目录
│   ├── admin           后台管理
│   │   ├── xxx.js
│   │   └── ...
│   ├── middleware      权限中间限
│   │   ├── xxx.js
│   │   └── ...
│   ├── status          状态页面
│   │   ├── xxx.js
│   │   └── ...
│   └── user            用户相关
│       ├── xxx.js
│       └── ...
├── node_modules        node模块目录
├── public              静态文件目录
│   ├── images          图片目录
│   ├── libs            bower安装目录
│   │   ├── bootstrap
│   │   └── jquery
│   ├── js              jade模板交互js
│   │   ├── xxx.js
│   │   └── ...
│   └── uploads         用户上传的图片目录
│       ├── xxx.jpeg
│       └── ...
├── models              模型
│   ├── xxx.js
│   └── ...
├── schemas             模式
│   ├── xxx.js
│   └── ...
├── views               视图文件目录
│   ├── includes
│   │   ├── xxx.jade
│   │   └── ...
│   └── pages
│       ├── xxx.jade
│       └── ...
├── README.md
├── .bowerrc            
├── .gitignore          
├── .jshintrc           
├── bower.json  
├── gulpfile.js         gulp文件
└── package.json
```
screenshot与images.md为截图说明文件，是为了方便查看，与本项目无关！
### 八、项目总结
整个项目基于NodeJs+MongoDB+jQuery+Bootstrap搭建而成，UI部分基于bootstrap，整体UI细节有待优化完善；部分功能有细微瑕疵，譬如数据的添加暂未考虑部分字段为空的情况、用户登录注册未做表单校验等等，这些都需要完善！整个项目涉及到的知识点非常的全面，有很好的参考价值!

如果问题请联系QQ：402074940























<!--```javascript
git clone git@github.com:jonechen1127/express-movie.git
cd express-movie
```
#### 2、安装依赖
```javascript
npm install
bower install 
```
#### 3、执行
```javascript
node app
```
#### 4、打开浏览器浏览 http://localhost:8100/-->