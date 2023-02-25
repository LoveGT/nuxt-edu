export function useSearchListApi(query) {
  return useHttpGet("searchList", ()=> {
    const q = useQueryToString(query());
    return `/search${q}`
  }, {
    lazy: true,
  });
}
