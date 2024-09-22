

import {ActionFunction,ActionFunctionArgs,LoaderFunction,LoaderFunctionArgs} from "@remix-run/node"
import {redirect,useFetcher,useLoaderData} from "@remix-run/react"


import {toast} from "sonner"
import { Form } from "@remix-run/react";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { commitSession, getSession } from "../CookiesStorage";


export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    console.log("-----username----",username)
    console.log("-----password----",password)
  
    // Call your Node.js API for authentication
    const response:any = await fetch("http://musixplayer.eu-north-1.elasticbeanstalk.com/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log("token of login api---",response.headers.get("x-auth-token"))
    
    // const result=await response.json()
    // console.log("result-----",response)
  
    if (response.status==200) {
       
        
    const session = await getSession();
  session.set("token",response.headers.get("x-auth-token") ); // Store user ID or any other user data
    
      return redirect("/home",{
        headers: {
            "Set-Cookie": await commitSession(session),
          }
    });
      
    } else {
      console.log("user is not authenticated-----------------",response.body);
    
      return { error: "Authentication failed. Please check your credentials." };
      
    }
  };
  

export default function Login() {

    const actionData = useActionData<{ error?: string }>();
    
    // Trigger the toast only when actionData.error changes
  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData?.error]);
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",background:"lightgray"}}>
        
        <div style={{ border: "1px solid #ccc", padding: "2rem", borderRadius: "10px", width: "300px",background:"white" }}>
          <h1>Login</h1>
          <Form method="post">
            <div style={{ marginBottom: "1rem"}}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem",border:"1px solid black"  }}
                required
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem",border:"1px solid black" }}
                required
              />
            </div>
            <button type="submit" style={{ width: "100%", padding: "0.75rem", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
              Submit
            </button>
          </Form>
        </div>
      </div>
    );
  }