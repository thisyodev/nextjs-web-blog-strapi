import { NextResponse } from "next/server"

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/special-blogs/:path*",
};


export async function middleware(request) {
    try {
        let token = request.cookies.get("token");
        let response = await fetch(`${process.env.STRAPI_BASE_URL}/api/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });

        if (!response.ok) {
            throw new Error("Login failed")
        }

        const responseJson = await response.json();
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("user", JSON.stringify({ email: responseJson.email }));

        response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

        return response;
    } catch (error) {
        console.log('error', error.message);
        return NextResponse.redirect(new URL("/", request.url));
    }

}

