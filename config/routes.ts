export default [
  { path: '/', name: '接口列表', icon: 'smile',  component: './Index' },
  { path: '/interface_info/:id', name: '查看接口', icon: 'smile', component: './InterfaceInfo', hideInMenu: true },
  {
    path: '/user/login',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/user/register',
    layout: false,
    routes: [{ name: '注册', path: '/user/register', component: './User/Register' }],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理页', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: '用户管理页', icon: 'table', path: '/admin/user_manager', component: './Admin/UserManage' },
    ],
  },
  { path: '/user/info', name: '个人中心', icon: 'user',  component: './User/UserInfo' },
  // { path: '/user/info/test', name: '个人中心测试', icon: 'user',  component: './User/UserInfo' },
  { path: '/user/info/edit', component: './User/UserEdit' },
  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Index' },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
