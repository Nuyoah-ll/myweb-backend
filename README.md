# 个人网站后端接口 - koa2

## 使用前提：

电脑上装有node、mysql

## 使用：

1.首先在根目录下创建.env文件，其内格式为：

```javascript
APP_HOST = localhost                     // 服务运行的主机地址
APP_PORT = 8000                          // 服务运行的端口号

STATIC_HOST = localhost                  // 向服务发起请求的域的地址
STATIC_PORT = 8080                       // 向服务发起请求的域的端口号

MYSQL_HOST = localhost                   // mysql服务地址
MYSQL_DATABASE = myweb_database          // 服务对应的数据库名称
MYSQL_PORT = 3306                        // mysql服务端口号
MYSQL_USER = root                        // mysql用户名
MYSQL_PASSWORD = 123456                  // mysql用户密码
```

2.使用项目下的myweb_database.sql文件里的sql语句创建数据库

3.使用openssl或者其他工具生成一对私钥和公钥，替换keys文件夹下的私钥和公钥即可

- window下建议使用git bash。
- mac下直接使用终端即可

```javascript
genrsa -out private.key 1024
rsa -in private.key -pubout -out public.key
```

## 安装：

```javascript
npm install
```

## 运行：

```javascript
npm run serve
```

或者：（需要安装nodemon）

```javascript
npm run start
```

## 接口列表：

1. 注册

2. 登录

3. 身份验证
4. 发布动态
5. 删除动态
6. 修改动态
7. 通过动态id获取动态
8. 获取动态列表
9. 根据资源名获取动态的配图
10. 创建博客
11. 删除博客
12. 修改博客
13. 根据博客id获取博客
14. 获取博客列表
15. 给博客附加标签
16. 创建动态评论
17. 创建博客评论
18. 回复评论
19. 修改评论
20. 删除评论
21. 获取评论
22. 创建标签
23. 获取所有标签
24. 上传头像
25. 获取用户最新头像
26. 根据资源名获取头像
27. 获取用户历史头像
28. 上传动态配图
29. 上传音乐
30. 根据资源名获取音乐
31. 获取歌曲列表

## 接口说明：

### 注册：

接口功能：用户注册

接口地址：/register

请求方法：POST

请求体必须携带的参数：username、password。其中用户名仅支持2-10位的数字字母下划线和中文组合（中文算一个字符），密码仅支持数字字母下划线，以及下面这些特殊字符：.! @ # $ % ^ & * ( ) - = + ~ ` | \ / ? { } [ ]，长度为6-18位。

### 登录：

接口功能：用户登录

接口地址：/login

请求方法：POST

请求体必须携带的参数：username、password

请求体可选参数：admin（为1的时候代表以管理员身份登录）

### 身份验证：

接口功能：身份验证

接口地址：/login/test

请求方法：POST

请求体必须携带的参数：在http请求头中authorization字段中，需携带有效token

### 发布动态：

接口功能：根据动态的id获取某一条动态

接口地址：/moment

请求方法：POST

请求体必须携带的参数：content，动态内容

### 删除动态：

接口功能：根据动态id来删除某条动态

接口地址：/moment/:momentId

请求方法：DELETE

### 修改动态：

接口功能：根据动态id来删除某条动态

接口地址：/moment/:momentId

请求方法：PATCH

### 通过动态id获取动态：

接口功能：发布动态

接口地址：/moment/:momentId

请求方法：GET

### 获取动态列表：

接口功能：根据偏移量offset和size获取所有动态列表

接口地址：/moment

可选参数：offset偏移量、size请求数量，默认值分别为0和10

请求方法：GET

### 根据资源名获取动态的配图：

接口功能：略

接口地址：/pictures/:filename

请求方法：GET

可选参数：size。分别可选large、middle、small。分别获取不同大小的图片。

### 创建博客：

接口功能：创建博客

接口地址：/blog

请求方法：POST

请求体需携带的参数：title、abstract、content，分别表示博客标题、博客摘要、博客内容

### 删除博客：

接口功能，根据博客id删除博客

接口地址：/blog/:blogId

请求方法：DELETE

### 修改博客：

接口功能：根据博客id修改博客的内容

接口地址：/blog/:blogId

请求方法：PATCH

请求体需携带的参数： content，被修改之后博客的内容

### 根据博客id获取博客：

接口功能：根据博客id获取博客的用户信息、标题、摘要、内容、标签、评论数等内容

接口地址：/blog/:blogId

### 获取博客列表：

接口地址：/blog

请求方法：GET

url后可选参数：offset，偏移量，默认值为0。size：一次请求的数量，默认值为10

### 给博客附加标签：

接口功能：通过博客id给博客附加上对应的标签

接口地址：/blog/:blogId/tag

请求方法：POST

请求体需携带的参数：tags。tags是一个数组，数组内容为一个个字符串，代表标签名称

### 创建动态评论：

接口功能：创建动态的评论

接口地址：/comment/:momentId

请求方法：POST

必须携带的参数：content，评论的内容

### 创建博客评论：

接口功能：创建博客评论

接口地址：/comment/blog/:blogId

请求方法：POST

必须携带的数据：content，评论的内容

### 回复评论：

接口功能：根据commentId回复评论

接口地址：/comment/reply/:commentId

携带的数据：content

### 修改评论：

接口功能：根据commentId修改评论

接口地址：/comment/:momentId

请求方法：PATCH

携带的参数：content

### 删除评论：

接口功能：根据commentId删除评论

接口地址：/comment/:momentId

请求方法：DELETE

### 获取评论：

接口功能：根据level和id获取动态、博客或者是回复的评论

接口地址：/comment

请求方法：GTE

请求需携带的参数：level。1获取动态的评论、2获取评论的回复、3或者是其他参数或者是省略，获取博客的评论。momentOrCommentId。评论的id。

### 创建标签：

接口功能：给定一个标签名，单独创建一个标签

接口地址：/tag

请求方法：POST

请求体需携带的参数：tagName。标签名称

### 获取所有标签：

接口功能：查询所有的标签名

接口地址：/tag

请求方法：/post

### 上传头像：

接口功能：获取用户传递的头像文件，存入服务器本地，然后将图像信息写入数据库

接口地址：/upload/avatar

请求方式：POST

请求传递的数据格式：form-data，需传递avatar字段，对应上传的文件。

### 获取用户最新头像：

接口地址：/user/:userId/avatar

请求方法：GET

### 根据资源名获取头像：

接口地址：/user/avatar/:filename

请求方法：GET

### 获取用户历史头像：

接口地址：/user/:userId/history/avatar

请求方法：GET

### 上传动态配图：

接口地址：/upload/picture

请求方法：POST

请求体数据类型：form-data。要求传入pictures字段

请求url里：momentId，表示为哪个动态添加图片

### 上传音乐：

接口地址：/upload/music

请求方法：POST

请求体数据格式：form-data

请求体需携带的参数：music、name、author、lyric。music是歌曲文件、name是歌曲名称、author是歌曲作者、lyric是歌词

### 根据资源名获取音乐：

接口地址：/upload/music/:filename

请求方法：GET

### 获取歌曲列表：

接口地址：/upload/music/list

请求方法：GET



