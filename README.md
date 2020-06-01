# wechaty mini robot

使用wechaty ipad协议建立群机器人，以群签到为业务场景，实现群邀请关系记录，群签到，签到积分，积分查询

## 核心框架

* wechaty:微信个人协议
* wechaty-puppet-padplus:微信个人ipad协议
* koa:web开发框架
* koa-router:路由
* sequelize:orm框架
* moment:日期处理

## 实现功能

* 群关系记录
* 群签到
* 签到积分
* 积分查询

## 测试流程

1、npm install 安装依赖包
2、npm run server 启动服务器
3、浏览器访问 http://localhost:8888/login.html 扫码登陆
4、登陆成功后可看到该微信号所有群的列表页面，则表示接入成功
5、在需要接入的微信群回复“签到开启”,对应群则开启机器人功能，可实现群关系记录，群签到，签到积分查询，相关数据模型可参考“数据库脚本”
6、点击托管群，即可查询群成员的签到积分；

## 注意

1、程序里边涉及到使用wechaty token需要微信添加“botorange_yeah”进行申请，具体可进入[wiki](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)了解；
2、程序里涉及到的数据库请修改为自己的配置；

## 数据库脚本

-- 微信签到托管群
CREATE TABLE `weixin_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT, -- 自增长标识
  `roomid` varchar(100) DEFAULT NULL, -- 群标识
  `avatar` varchar(100) DEFAULT NULL, -- 群头像
  `topic` varchar(500) DEFAULT NULL, -- 群名称
  `ownerid` varchar(100) DEFAULT NULL, -- 拥有者
  `create_time` bigint(1) DEFAULT NULL, -- 托管时间
  `status` bit(1) DEFAULT b'1', -- 状态 1 有效，0 无效
  `score` int default 10, -- 签到分数
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- 微信群邀请明细
create table `weixin_room_user`(
  `id` int(11) NOT NULL AUTO_INCREMENT, -- 自增长标识
  `roomid` varchar(100) DEFAULT NULL, -- 群标识
  `wxid` varchar(100) DEFAULT NULL,-- 标识
  `avatar` varchar(200) DEFAULT NULL, -- 头像
  `name` varchar(100) DEFAULT NULL, -- 名称
  `from_wxid` varchar(100) DEFAULT NULL, -- 来源用户
  `create_time` bigint(1) DEFAULT NULL, -- 创建时间
  `status` bit(1) DEFAULT b'1', -- 状态 1 有效，０　无效
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- 微信群签到明细
create table `weixin_room_signin`(
  `id` int(11) NOT NULL AUTO_INCREMENT, -- 自增长标识
  `roomid` varchar(100) DEFAULT NULL, -- 群标识
  `wxid` varchar(100) DEFAULT NULL, -- 微信标识
  `score` int DEFAULT 1, -- 分数
  `create_time` bigint(1) DEFAULT NULL, -- 创建时间
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

## wiki

[wiki文档](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)
[api文档](https://wechaty.js.org/v/zh/)