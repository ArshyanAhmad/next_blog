import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const { cookies, url } = req;

    const authCookie = cookies.get("authorization")?.value || "";

    const token = authCookie.startsWith("Bearer ") ? authCookie.substring(7) : authCookie;

    const loginPage = "/login";
    const blogPage = "/blogs";
    const homePage = "/";

    const pathname = new URL(url).pathname;

    if (!token) {

        if (pathname.startsWith(blogPage)) {
            return NextResponse.redirect(new URL(loginPage, url))
        }

        return NextResponse.next();

    }


    // If user is logged in and tries to access login page, redirect to blog / home
    if (token && pathname === loginPage) {
        return NextResponse.redirect(new URL(homePage, url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: ["/blogs/:path*", "/login", "/signup"],
}