import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/songs", "/api/webhook", "/api/music/route", "/api/music", "/api/spatial", "/api/test", "/api/spacegen", "/api/music-prediction"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
