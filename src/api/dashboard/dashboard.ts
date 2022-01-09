import http from "@/utils/http/index";

export function getConsoleInfo() {
  return http.request({
    url: "/dashboard/console",
    method: "get",
  });
}
