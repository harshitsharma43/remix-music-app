import { createCookieSessionStorage } from "@remix-run/node"; // or "@remix-run/server-runtime"

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session", // Name of the cookie
      httpOnly: true, // Ensure the cookie is only accessible via HTTP(S)
      secure: process.env.NODE_ENV === "development", 
      sameSite: "lax", // Prevent CSRF attacks
      path: "/", // Cookie is valid across the whole site
      secrets: ["your-cookie-secret"], // Add your secret for cookie signing
      maxAge: 60 * 60 * 24 * 7, // One week
    },
  });