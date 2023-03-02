import { createDiscreteApi } from "naive-ui";

export const useUser = () => useState("user", () => null);

// 更新用户信息
export async function useRefreshUserInfo() {
  const token = useCookie("token");
  // 用户已登录
  if (token.value) {
    const { data, error } = await useGetInfoApi();
    if (data.value) {
      const user = useUser();
      user.value = data.value;
    }
  }
}
// 退出登录
export async function useLogout() {
  await useLogoutApi();
  const user = useUser();
  user.value = null;
  const token = useCookie("token");
  token.value = null;
  const { message } = createDiscreteApi(["message"]);
  message.success("退出登录成功");

  // 回到首页
  const route = useRoute();
  if (route.path !== "/") {
    navigateTo("/", { replace: true });
  }
}

// 登录并且绑定手机号之后才能操作
export function useHasAuth(callback = null ) {
  const route = useRoute();
  const user = useUser();
  const token = useCookie("token");
  const { message } = createDiscreteApi(['message'])
  // 未登录
  if(!token.value) {
    message.error('请先登录')
    return navigateTo("/login?from=" + route.fullPath)
  }
   // 未绑定手机号
   const phone = user.value.phone
   if (!phone && route.name !== 'bindphone') {
    message.error('请先绑定手机号')
    return navigateTo("/bindphone?from=" + route.fullPath)
   }

   if(callback && typeof callback === 'function') {
    callback()
   }
}