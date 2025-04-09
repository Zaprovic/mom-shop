import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default withAuth(async function middleware() {}, {
  isReturnToCurrentPage: true,
  loginPage: "/login",
});

export const config = {
  matcher: ["/account", "/account/:path"],
};
