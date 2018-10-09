#### 开发者中心-移动办公模型

##### TODO

##### 如何关联线上项目
```
本地项目创建一个project.txt, 填写项目名
如：SHCARMARKET
```

##### 用户登陆入口
> 自定义修改HOST
```  
  src/main.js
  var HOST = API_HOST ==> 修改API_HOST为项目后端接口即可
```

> localhost:8080/normalLogin
  用户名、密码为当前项目的账密

##### 单个配置下 自定义路由
> 配置
  配置自定义路由文件名，如self

> 实例化
  以当前文件名为路由，如：localhost:8080/self
```
  // 需验证用户信息请求接口 this.apiGet / apiPost / apiDelete / apiPut
  // 详情可参考src/assets/mixins/httpMixins.js
  // let url = ''
  // this.apiGet(url).then((res) => {
  //   console.log(res)
  // })
```

##### Tab配置下 自定义路由 --> 自定义页面组件
> 配置
  默认选择组件：目前支持类型- 列表、添加/编辑/详情、自定义页面组件

> 实例化
  目前支持类型- 列表、添加/编辑/详情、自定义页面组件
  Tab下需要传的参数，暂无
