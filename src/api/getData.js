import fetch from '@/config/fetch'

/**
 * 登陆
 */
export const login = data => fetch('/user/login', data, 'POST')

/**
 * 获取用户信息
 */
export const getAdminInfo = () => fetch('/admin/info')
