import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

import Login from "./routes/login"; 

import { Toaster } from "sonner";

import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "./CookiesStorage";

// This loader checks for authentication status
// export const loader: LoaderFunction = async ({ request }) => {
//   const session = await getSession(request.headers.get("Cookie"));
//   const token = session.get("token");

//   // If no token, redirect to login page
//   if (!token) {
//     return redirect("/login");
//   }

//   // Otherwise, continue to the protected routes
//   return null;
// };


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  return(  <>
    <Toaster position="top-right" />
    <Outlet />;
  </>) 
}
