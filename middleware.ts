import { ClerkMiddlewareAuth, clerkMiddleware } from '@clerk/nextjs/server';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "86400 s"), // 3 requests per day
  ephemeralCache: new Map(),
  analytics: true,
});

const isAPI = (path: string) => {
  return path.match(new RegExp(`^\/api\/`))
}

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, request: NextRequest) => {
  //Rate limit APIs
  if (isAPI(request.nextUrl.pathname)) {
    const { userId } = auth();
    console.log('userId:', userId);
    const { success, limit, reset, remaining } = await ratelimit.limit(`${userId}`);

    const res = success ? 
      NextResponse.next()
      : NextResponse.json({message: 'Sorry you can only generate 3 free visuals per day. Reach out to @ZaurbekStark on 𝕏 for more.'});

    res.headers.set("X-RateLimit-Limit", limit.toString());
    res.headers.set("X-RateLimit-Remaining", remaining.toString());
    res.headers.set("X-RateLimit-Reset", reset.toString());
    return res;
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};