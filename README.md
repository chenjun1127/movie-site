# 基于 NodeJs+MongoDB+jQuery+Bootstrap 搭建的豆瓣电影网站
## 一、简介
本项目是基于Nodejs的练手项目，期间参考了慕课网Scott老师的课程（代码结构及路由全都重新改造），在老师所讲的基础上增加了许多的功能并且加以完善，项目基于 Express 4.15 版本，代码采用 Es6 编写，代码已加注释，提高了阅读性和维护性，可供参考：
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
* 使用gulp集成jshint对Js语法检查，加入browser-sync与nodemon，实现实时刷新及服务器的自动重启等功能。
#### 4、网站整体功能:
网站正常访问无需管理员权限，对电影的评论及个人中心资料的修改，需要用户登录，对网站数据的修改添加删除需要管理员的权限，默认一个管理员，具体功能如下：
* 实现了用户的基本注册，登录，登出及管理功能；
* 用户可以对电影进行评论及个人中心资料的修改（可上传用户头像）；
* 电影添加分类及录入，数据可以同步豆瓣ID；
* 对电影数据作分页处理，分页查询数据库数据；
* 管理员可以对网站数据进行增加删除修改（需要管理员权限）；
* 管理员可从后台查看所有的电影、用户、评论、访问量等数据；
## 二、网站整体效果，截图看这里
## 三、运行环境及Node版本:
作为windows平台的忠实粉丝（≥▽≤/），当前平台下node v6.9.2 ，运行正常！
## 四、安装
1、MongoDB 安装[mongodb](https://www.mongodb.org/downloads#production)完成相关配置；
2、克隆项目，进入项目目录；
```javascript
git clone git@github.com:chenjun1127/Movie-Site.git
cd movie-site
```
3、安装依赖
```javascript
npm install
bower install 
```
 





















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