import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/chat", "routes/chat.tsx"),
  route("/sso-login", "routes/sso-login.tsx"),
] satisfies RouteConfig;
