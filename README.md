<!-- TOC -->

- [gobig的后台管理系统](#gobig%E7%9A%84%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F)
- [关于](#%E5%85%B3%E4%BA%8E)
- [技术栈](#%E6%8A%80%E6%9C%AF%E6%A0%88)
    - [语言](#%E8%AF%AD%E8%A8%80)
    - [生态](#%E7%94%9F%E6%80%81)
    - [工具](#%E5%B7%A5%E5%85%B7)
- [结构与页面](#%E7%BB%93%E6%9E%84%E4%B8%8E%E9%A1%B5%E9%9D%A2)
    - [目录结构](#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
    - [页面组成](#%E9%A1%B5%E9%9D%A2%E7%BB%84%E6%88%90)
- [待解决](#%E5%BE%85%E8%A7%A3%E5%86%B3)
- [图片展示](#%E5%9B%BE%E7%89%87%E5%B1%95%E7%A4%BA)
    - [登录页](#%E7%99%BB%E5%BD%95%E9%A1%B5)
    - [首页](#%E9%A6%96%E9%A1%B5)
    - [用户管理](#%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86)
    - [视频管理](#%E8%A7%86%E9%A2%91%E7%AE%A1%E7%90%86)
- [日常更新](#%E6%97%A5%E5%B8%B8%E6%9B%B4%E6%96%B0)
    - [年4月8日](#%E5%B9%B44%E6%9C%888%E6%97%A5)
    - [年4月10日](#%E5%B9%B44%E6%9C%8810%E6%97%A5)
    - [年4月15日](#%E5%B9%B44%E6%9C%8815%E6%97%A5)
    - [年4月26日](#%E5%B9%B44%E6%9C%8826%E6%97%A5)

<!-- /TOC -->

# gobig的后台管理系统

- 展示链接： [Gobig Admin](https://www.gobigtonight.top/admin)
- 基于vue-admin-template模版开发: [GitHub](https://github.com/PanJiaChen/vue-admin-template)

# 关于
1. 作者
本人是一个即将从大学毕业的学生，因为毕业论文的要求，开始制作gobig项目。不仅是对自己大学学习的总结，也是学习新的知识的实践。

2. gobig
- gobig是一个以视频点播、分享为主的网站。整体分为主站（[gobig-front-end](https://github.com/SHGgo/gobig-front-end)）、小程序（[gobig-mini](https://github.com/SHGgo/gobig-front-end)）、后台管理系统（[gobig-admin](https://github.com/SHGgo/gobig-front-end)）、后端开发（[gobig-serve](https://github.com/SHGgo/gobig-serve)）四个方面。
- 因为作者自己对[bilibili](https://www.bilibili.com/)的喜爱，所以主站和小程序的UI、页面逻辑和功能实现等很多方面借鉴了b站，这里非常感谢b站。
- ***gobig是作者第一次独立开发完整项目，期间有很多bug和功能没有及时完善，敬请见谅。***

# 技术栈

## 语言
1. html5 / css3 / JavaScript(es6+)
2. vue2.6
3. element-ui
4. json

## 生态
1. vuex / vue-router 
2. axios
3. scss
4. eslint

## 工具
1. vue-cli4
2. devtools
3. vscode / webstorm

# 结构与页面

## 目录结构
![目录结构](https://img-blog.csdnimg.cn/20200426204107509.png)

## 页面组成
1. 登录页
2. 首页
3. 用户管理。增删查改用户信息、分页系统
4. 视频管理。增删查改视频信息、分页系统

# 待解决
1. 首页数据的展示。
2. 权限管理。
3. 只能单数据操作，不能多数据操作。
4. 不能数据导出导入，如Excel导出导入。
5. 没有评论管理等功能。

# 图片展示

## 登录页
![登录页](https://img-blog.csdnimg.cn/20200426204610105.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

## 首页
![首页](https://img-blog.csdnimg.cn/20200426204802444.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

## 用户管理
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426204947963.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

## 视频管理
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426205021266.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzg1OTIy,size_16,color_FFFFFF,t_70)

---

# 日常更新

## 年4月8日
之前一直在熟悉整个模版，今天正式上手
今天代码的焦点
1. 用户管理 的**搜索查找**和**分页查找**的功能实现和逻辑冲突解决
    - vuex保存搜索查找的keyword，分页切换时ajax自带keyword查询
    - vuex保存表数据，数据变化时，分页绑定数据自动变化
    - elementUI中分页，重点关注两个数据**元素总量**和**每页元素数量**
2. 表数据展示，未完成

明天开发的焦点
1. 表数据的增删改功能实现
---

## 年4月10日

开发进行中~~~
胜利在望

今天完成了用户管理模块，包括展示、搜索、分页、增删改等功能
其他模块如视频管理和评论管理就有模版了

明天开发的焦点
1. 视频管理和评论管理基础搭建
---

## 年4月15日

管理系统今天上线：[Gobig Admin](https://www.gobigtonight.top/admin)

---

## 年4月26日
文档1.0更新完毕