/**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2019 ruoyi
 */

import useUserStore from '@/store/modules/user'

export default {
  /**
   * 在组件挂载时执行权限控制
   * 根据绑定的权限值检查用户是否有相应的权限
   * 如果没有权限，则从DOM中移除该元素
   *
   * @param {HTMLElement} el - 指令所绑定的元素
   * @param {Object} binding - 指令的绑定对象，包含绑定的值
   * @param {Object} vnode - 虚拟节点
   */
  mounted(el, binding, vnode) {
    // 获取绑定的权限值
    const { value } = binding
    // 定义全权限标识
    const all_permission = '*:*:*'
    // 获取用户权限列表
    const permissions = useUserStore().permissions

    // 检查绑定的权限值是否为非空数组
    if (value && value instanceof Array && value.length > 0) {
      // 将绑定的权限值赋给权限标志
      const permissionFlag = value

      // 检查用户是否拥有任一权限或全权限
      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      // 如果用户没有所需权限，从DOM中移除元素
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      // 如果未设置权限值或设置的权限值为空数组，抛出错误
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
