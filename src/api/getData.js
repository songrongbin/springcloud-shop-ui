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
export const getUserList = data => fetch('/user/user/pagination', data)

/**
 * 获取用户详情
 */
export const getUserDetail = data => fetch('/user/user/detail', data)

/**
 * 添加用户
 */
export const addUser = data => fetch('/user/user/add', data, 'POST')

/**
 * 编辑用户
 */
export const editUser = data => fetch('/user/user/edit', data, 'POST')

/**
 * 删除用户
 */
export const deleteUser = data => fetch('/user/user/delete', data)

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
export const getRoleList = data => fetch('/user/role/pagination', data)

/**
 * 获取角色详情
 */
export const getRoleDetail = data => fetch('/user/role/detail', data)

/**
 * 添加角色
 */
export const addRole = data => fetch('/user/role/add', data, 'POST')

/**
 * 编辑角色
 */
export const editRole = data => fetch('/user/role/edit', data, 'POST')

/**
 * 删除角色
 */
export const deleteRole = data => fetch('/user/role/delete', data)

/**
 * 获取权限列表
 */
export const getPermissionList = data => fetch('/user/permission/pagination', data)

/**
 * 获取权限详情
 */
export const getPermissionDetail = data => fetch('/user/permission/detail', data)

/**
 * 添加权限
 */
export const addPermission = data => fetch('/user/permission/add', data, 'POST')

/**
 * 编辑权限
 */
export const editPermission = data => fetch('/user/permission/edit', data, 'POST')

/**
 * 删除权限
 */
export const deletePermission = data => fetch('/user/permission/delete', data)

/**
 * 获取用户组列表
 */
export const getUserGroupList = data => fetch('/user/userGroup/pagination', data)

/**
 * 获取用户组详情
 */
export const getUserGroupDetail = data => fetch('/user/userGroup/detail', data)

/**
 * 添加用户组
 */
export const addUserGroup = data => fetch('/user/userGroup/add', data, 'POST')

/**
 * 编辑用户组
 */
export const editUserGroup = data => fetch('/user/userGroup/edit', data, 'POST')

/**
 * 删除用户组
 */
export const deleteUserGroup = data => fetch('/user/userGroup/delete', data)

/**
 * 获取用户组Select
 */
export const getUserGroupSelectList = data => fetch('/user/select/userGroupList', data)

/**
 * 获取供应商列表
 */
export const getSupplierList = data => fetch('/supplier/supplier/pagination', data)

/**
 * 获取供应商详情
 */
export const getSupplierDetail = data => fetch('/supplier/supplier/detail', data)

/**
 * 添加供应商
 */
export const addSupplier = data => fetch('/supplier/supplier/add', data, 'POST')

/**
 * 编辑供应商
 */
export const editSupplier = data => fetch('/supplier/supplier/edit', data, 'POST')

/**
 * 删除供应商
 */
export const deleteSupplier = data => fetch('/supplier/supplier/delete', data)

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
 * 获取商品详情
 */
export const getGoodsDetail = data => fetch('/product/goods/detail', data)

/**
 * 添加商品
 */
export const addGoods = data => fetch('/product/goods/add', data, 'POST')

/**
 * 编辑商品
 */
export const editGoods = data => fetch('/product/goods/edit', data, 'POST')

/**
 * 删除商品
 */
export const deleteGoods = data => fetch('/product/goods/delete', data)

/**
 * 获取品牌列表
 */
export const getBrandList = data => fetch('/supplier/brand/pagination', data)

/**
 * 获取品牌详情
 */
export const getBrandDetail = data => fetch('/supplier/brand/detail', data)

/**
 * 添加品牌
 */
export const addBrand = data => fetch('/supplier/brand/add', data, 'POST')

/**
 * 编辑品牌
 */
export const editBrand = data => fetch('/supplier/brand/edit', data, 'POST')

/**
 * 删除品牌
 */
export const deleteBrand = data => fetch('/supplier/brand/delete', data)
