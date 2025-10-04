// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Get the token from cookies or headers
//   const token = request.cookies.get("auth-token");

//   // Define the paths that should be protected
//   const protectedPaths = ["/dashboard", "/profile"];

//   // Check if the request URL matches a protected path
//   const isProtectedPath = protectedPaths.some((path) =>
//     request.nextUrl.pathname.startsWith(path)
//   );

//   // If the path is protected and there's no token, redirect to the login page
//   if (isProtectedPath && !token) {
//     console.log("no tokennn");
//     const loginUrl = new URL("/", request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // If the token is valid (you might want to add more validation logic here), allow the request to proceed
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // Adjust the paths as needed
// };
