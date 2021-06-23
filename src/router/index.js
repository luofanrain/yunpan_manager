import Vue from 'vue'
import Router from 'vue-router'
import tool from '@/common/tool'
import urls from '@/common/urls'
import axios from '@/common/axios'
import store from '@/vuex/store'
import config from '@/common/config'

Vue.use(Router)

const router = new Router({
  base:'admin',
  routes: [
    {
      path: '*', // 页面不存在的情况下会跳到404页面
      redirect:'/login',
    },
    {
      path: '/',
      name: 'index',
      component: resolve => require(["@/components/index"],resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(["@/components/index"],resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(["@/components/login"],resolve)
    }
  ]
})
// 路由劫持
router.beforeEach((to,from,next)=>{
  if(!config.host){
    next();
    return;
  }
  const loginData = tool.getStorage('loginData') || ''
  if(to.path == '/login') {
    next();
    return;
  }
  if(loginData.account){
    if(!store.state.userInfo){
      getUserInfo(next)
      return;
    }
    next();
  }else{
    next('/login')
  }
})

const getUserInfo = (callback) => {
  let data =  tool.getStorage('loginData')
  axios.post(urls.login,data,(res)=>{
    if(!res.errcode){
      store.commit('setState',{userInfo:res.data})
      callback()
    }else{
      callback('/login')
    }
  })
}
export default  router;
