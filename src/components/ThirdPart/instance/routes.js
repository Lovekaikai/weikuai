import Home from 'components/Home.vue';
import self from './self.vue';
import self_CustomerFamily from './self_CustomerFamily.vue';
import self_CustomerDetail from './self_CustomerDetail.vue';
const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/self',
        component: self,
        name: 'self',
        meta: { keepAlive: true }
      },
      {
        path: '/self_CustomerFamily',
        component: self_CustomerFamily,
        name: 'self_CustomerFamily',
        meta: { keepAlive: true }
      },
      {
        path: '/self_CustomerDetail',
        component: self_CustomerDetail,
        name: 'self_CustomerDetail',
        meta: { keepAlive: true }
      }
    ]
  }
];
export default routes;
