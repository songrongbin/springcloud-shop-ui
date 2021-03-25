import fetch from '@/config/fetch'

/**
 * 登陆
 */
export const login = data => fetch('/user/login', data, 'POST')

/**
 * 获取用户登录信息
 */
export const getUserLoginInfo = () => fetch('/user/loginInfo')

/**
 * 获取用户列表
 */
export const getUserList = data => fetch('/user/userPagination', data)

/**
 * 获取用户select
 */
export const getCreateBySelectList = data => fetch('/user/select/userList', data)

/**
 * 获取部门列表
 */
export const getDeptList = data => fetch('/user/dept/deptPagination', data)

/**
 * 获取部门详情
 */
export const getDeptDetail = data => fetch('/user/dept/detail', data)

/**
 * 获取部门Select
 */
export const getDeptSelectList = data => fetch('/user/select/deptList', data)

/**
 * 添加部门
 */
export const doAddDept = data => fetch('/user/dept/deptAdd', data, 'POST')

/**
 * 编辑部门
 */
export const doEditDept = data => fetch('/user/dept/deptEdit', data, 'POST')

/**
 * 删除部门
 */
export const doDeleteDept = data => fetch('/user/dept/deptDel', data)

/**
 * 获取角色列表
 */
export const getRoleList = data => fetch('/user/role/rolePagination', data)

/**
 * 获取权限列表
 */
export const getPermissionList = data => fetch('/user/permission/pageList', data)

/**
 * 获取用户组列表
 */
export const getUserGroupList = data => fetch('/user/userGroup/userGroupPagination', data)

/**
 * 获取供应商列表
 */
export const getSupplierList = data => fetch('/supplier/supplier/pagination', data)

/**
 * 获取订单列表
 */
export const getOrderList = data => fetch('/order/order/pagination', data)
/**
 * 获取订单详情
 */
export const getOrderDetail = data => fetch('/order/order/detail', data)
/**
 * 获取商品列表
 */
export const getGoodsList = data => fetch('/product/goods/pagination', data)

/**
 * 获取品牌列表
 */
export const getBrandList = data => fetch('/supplier/brand/pagination', data)
