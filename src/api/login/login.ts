import http from "@/utils/http/index";

export function login() {
  return http.request({
    url: "/login",
    method: "post",
  });
}
