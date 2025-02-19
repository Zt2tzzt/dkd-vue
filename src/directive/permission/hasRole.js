/**
 * v-hasRole 角色权限处理
 * Copyright (c) 2019 ruoyi
 */

import useUserStore from '@/store/modules/user'

export default {
  /**
   * 在组件挂载时执行权限控制
   * 根据绑定的角色权限值决定是否渲染该组件
   *
   * @param {HTMLElement} el - 挂载的DOM元素
   * @param {Object} binding - 包含绑定值的对象
   * @param {Object} vnode - 虚拟节点
   */
  mounted(el, binding, vnode) {
    // 获取绑定的角色权限值
    const { value } = binding
    // 定义超级管理员角色标识
    const super_admin = 'admin'
    // 获取用户角色列表
    const roles = useUserStore().roles

    // 检查绑定值是否为一个非空数组
    if (value && value instanceof Array && value.length > 0) {
      // 将绑定值视为角色权限标志数组
      const roleFlag = value

      // 检查用户是否具有匹配的角色权限
      const hasRole = roles.some(role => {
        return super_admin === role || roleFlag.includes(role)
      })

      // 如果用户没有匹配的角色权限，则移除该组件
      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      // 如果绑定值不符合要求，则抛出错误
      throw new Error(`请设置角色权限标签值`)
    }
  }
}
