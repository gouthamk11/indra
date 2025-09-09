import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    "/dashboards/:path*",
    "/protected/:path*",
    "/auth-protected/:path*",
    "/api/keys/:path*"
  ]
}
