export function useLoginApi(body) {
  return useHttpPost("login", "/login", {
    body,
  });
}

export function useRegApi(body) {
  return useHttpPost("reg", "/reg", {
    body,
  });
}

// 获取用户信息
export function useGetInfoApi() {
  return useHttpGet("getInfo", "/getinfo", { $: true });
}

// 退出登录
export function useLogoutApi() {
  return useHttpPost("logout", "/logout");
}

// 获取手机验证码
export function useGetCaptchaApi(phone) {
  return useHttpPost("getCaptcha", "/get_captcha", { body: { phone } });
}

// 绑定手机号
export function useBindPhoneApi(body) {
  return useHttpPost("bindPone", "/bind_mobile", { body });
}

// 忘记密码
export function useForgetApi(body) {
  return useHttpPost("forget", "/forget", { body });
}

// 获取学习记录
export function useUserHistoryApi(query) {
  return useHttpGet("userHistory", ()=> {
    const q = useQueryToString(query());
    return `/user_history/list${q}`
  }, {
    lazy: true,
  });
}

// 获取购买记录
export function useOrderListApi(page) {
  return useHttpGet("userOrderList", `/order/list?page=${page}`,{
    lazy: true,
  })
}
// 我的考试记录
export function useUserTestApi(page) {
  return useHttpGet("userTest", `/user_test/list?page=${page}`,{
    lazy: true,
  })
}
// 我的帖子列表
export function useMyPostListApi(page) {
  return useHttpGet("myPostList", `/mypost?page=${page}`,{
    lazy: true,
  })
}
// 优惠券列表
export function useUserCouponApi(page) {
  return useHttpGet("userCoupon", `/user_coupon?page=${page}`,{
    lazy: true,
  })
}

// 我的收藏
export function useMyFavaListApi(page) {
  return useHttpGet("myFavaList", `/user_fava?page=${page}`,{
    lazy: true,
  })
}

// 取消收藏
export function useUncollectApi(body) {
  return useHttpPost("uncollect", '/uncollect', {
    body
  })
}

// 修改资料
export function useUpdateInfoApi(body) {
  return useHttpPost("updateInfo", '/update_info', {
    body
  })
}

export function useUploadConfig() {
  const token = useCookie('token')
  return {
    action: fetchConfig.baseURL + '/upload',
    headers: {
      appid: fetchConfig.headers.appid,
      token: token.value
    }
  }
}