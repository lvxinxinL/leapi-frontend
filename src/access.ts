/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    // 是否已登录（普通用户权限）
    canUser: loginUser,
    // 是否是管理员
    canAdmin: loginUser?.userRole === 'admin',
  };
}
