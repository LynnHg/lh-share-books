# lh-share-books

# some issuse

###### p:  request域名无法访问
###### r:  微信小程序后台，设置->开发设置->服务器域名->服务器配置，将需要访问的域名加入其中.

###### p:  服务器域名不支持IP地址：127.0.0.1或localhost
###### r:  通过花生壳将本地127.0.0.1或localhost地址映射到域名http://l1669f6515.iok.la

###### p:  小程序访问豆瓣图书v2接口https://api.douban.com，403 Forbidden
###### r:  1:使用nginx反向代理，需配置ssl，繁琐 2：小程序后台不直接访问该接口，通过java后台实现对接口该进行包装，然后使用自定义的后台接     口进行访问

###### p:  数据库对表order进行操作报错
###### r:  因为order是sql中的关键字，操作时需要加上反引号 `order`

###### p:  new Date()在ios中出现Invalid Date。eg:ios里面的Safari解释new Date('2013-10-21') 就不正确，在IOS的Safari中返回的是          "Invalid Date"
###### r:  查了很多国外的技术blog，终于找到了解决方案，时间需用'/'来隔开，如new Date('2013/10/21')

###### p: http get request header is too large
###### r: 按照网上的方法，修改tomcat中server.xml文件中Connector标签的maxHttpHeaderSize字段来解决，未能解决，最终通过将GET方法改为       POST方法解决了问题，但同时请求时头部改为：{'content-type':'application/x-www-form-urlencoded'}
