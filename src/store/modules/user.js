import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    id: '',
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then(res => {
            setToken(res.token)
            this.token = res.token
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    /**
     * 获取用户信息
     *
     * @returns {Promise} 返回一个Promise对象，包含用户信息
     */
    getInfo() {
      return new Promise((resolve, reject) => {
        // 调用getInfo函数获取用户信息
        getInfo()
          .then(res => {
            // 解构获取用户信息中的用户对象和头像
            const user = res.user
            const avatar =
              user.avatar == '' || user.avatar == null
                ? defAva
                : import.meta.env.VITE_APP_BASE_API + user.avatar

            // 检查返回的角色数组是否非空
            if (res.roles && res.roles.length > 0) {
              // 如果角色数组非空，将返回的角色和权限赋值给this
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              // 如果角色数组为空，将默认角色赋值给this
              this.roles = ['ROLE_DEFAULT']
            }
            // 将用户ID和用户名赋值给this
            this.id = user.userId
            this.name = user.userName
            // 将处理后的头像URL赋值给this
            this.avatar = avatar
            // 解析Promise，返回响应结果
            resolve(res)
          })
          .catch(error => {
            // 拒绝Promise，传递错误信息
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})

export default useUserStore
