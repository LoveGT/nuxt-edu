export function useLoginApi(body) {
  return useHttpPost('login', '/login', {
    body
  })
}

// 获取用户信息
export function useGetInfoApi() {
  return useHttpGet('getInfo', '/getinfo', { $: true })
}

// 退出登录
export function useLogoutApi() {
  return useHttpPost('logout', '/logout')
}

