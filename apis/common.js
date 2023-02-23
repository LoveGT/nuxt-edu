export function useSearchListApi(query) {
  const q = useQueryToString(query);
  return useHttpGet("searchList", `/search${q}`, {
    lazy: true,
  });
}
