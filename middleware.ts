import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  console.log({
    pathname,
    isAuthRoute,
    isPrivateRoute,
    accessToken: Boolean(accessToken),
    refreshToken: Boolean(refreshToken),
  });

  if (!accessToken) {
    if (refreshToken) {
      // Якщо accessToken відсутній, але є refreshToken — потрібно перевірити сесію навіть для маршруту аутентифікації,
      // адже сесія може залишатися активною, і тоді потрібно заборонити доступ до маршруту аутентифікації.
      const data = await checkSession();

      const setCookie = data.headers["set-cookie"];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };
          if (parsed.accessToken)
            cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
        // Якщо сесія все ще активна:
        // для приватного маршруту — виконуємо редірект на головну.
        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
        // для приватного маршруту — дозволяємо доступ
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }
    // Якщо refreshToken або сесії немає:
    // маршрут аутентифікації — дозволяємо доступ
    if (isAuthRoute) {
      return NextResponse.next();
    }

    // приватний маршрут — редірект на сторінку входу
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Якщо accessToken існує:
  // приватний маршрут — виконуємо редірект на головну
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // приватний маршрут — дозволяємо доступ
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/notes/:path*", "/profile", "/sign-in", "/sign-up"],
};
