import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { isRelogin } from '@/utils/request'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register','/pages/equipmanager']
const loginForm= {
  username: "admin",
  password: "admin123",
  rememberMe: false,
  code: "",
  uuid: ""
}

router.beforeEach((to, from, next) => {
  console.log(to.path)
  console.log(to.fullPath)
  NProgress.start()
  if (getToken()) {
    to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
    /* has token */
    if (to.path === '/register') {
      console.log("thisR1")
      next()
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        isRelogin.show = true
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(() => {
          isRelogin.show = false
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            console.log("thisR")
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch(err => {
          if(to.path=='/collaborator/collaborator/collaboratorUpdate'){
            store.dispatch("Login", loginForm).then(() => {
              next(`${to.fullPath}`)
            });
          }else{
            store.dispatch('LogOut').then(() => {
              Message.error(err)
              console.log("this1")
              next(`/register?ticket=${to.query.ticket}&redirect=${to.path}`)
            })
          }
          })
      } else {
        console.log("thisRR")
        next()
      }
    }
  } else {
    // 没有token
    if(whiteList.indexOf(to.path) != -1) {
      // 在免登录白名单，直接进入
      console.log("thisR2")
      next()
    }else if(to.path=='/collaborator/collaborator/collaboratorUpdate'){
      store.dispatch("Login", loginForm).then(() => {
        next(`${to.fullPath}`)
      });
    }else{
      console.log("this2")
      next(`/register?ticket=${to.query.ticket}&redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
