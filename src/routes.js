import Home from './components/Home.vue'
// 调试登陆接口
import normalLogin from './components/account/normalLogin.vue'

let selfRoutes = []

try {
  selfRoutes = require('./components/ThirdPart/instance/routes').default
  console.log('selfRoutes', selfRoutes)
} catch (err) {
}

let routes = [
  // 登陆模块 normalLogin-本地开发测试登陆
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/normalLogin', component: normalLogin, name: 'normalLogin', meta: { keepAlive: true }}
    ]
  }
]

routes = routes.concat(selfRoutes)

export default routes
