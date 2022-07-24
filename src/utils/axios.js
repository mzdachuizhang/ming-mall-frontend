import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 判断用户登录状态通过 token 来实现
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// post 请求时，发送 json 形式的数据包
axios.defaults.headers.post['Content-Type'] = 'application/json'

// interceptors 是拦截器，每个请求都会经过这个拦截器，返回的数据可以通过拦截处理后返回
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        return Promise.reject(res)
    }
    if (res.status !== 200) {
        if (res.data.message)
        if (res.status === 416) {
            // 返回 416 代表没有登录状态，路由跳转到/login 页面（目前还为创建组件)
            // router.push({path: '/login'})
         }
        return Promise.reject(res.data)
    }

    return res.data
})

export default axios