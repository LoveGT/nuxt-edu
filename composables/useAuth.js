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
