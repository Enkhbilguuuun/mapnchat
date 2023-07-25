import  { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useState, useEffect } from "react";
import * as React from "react";
import { ClerkProvider } from '@clerk/nextjs';
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import axios from "axios";



configureAbly({key : "Gk_6OA.L15T4Q:Iboyq9-_wQBDusD7444A8nZ0piAh20AnamsrCiblLZ4", clientId: Date.now() + ""});

export default function Home(){

  const instance = axios.create({
    baseURL: 'http://localhost:3000/api',

    headers: {"Content-type": "application/json; charset=UTF-8"}
  });

  const publishableKey =
  "pk_test_YWxlcnQtb2N0b3B1cy0zOS5jbGVyay5hY2NvdW50cy5kZXYk";

  
  interface Message {
    time: number;
    text: string;
    
  }
  
  interface Data { 
    data: any
  }
  

  const [text, setText] = useState<String>("");
  const [messages, setMessages] = React.useState<Array<Message>>([]);
  const [data, setData] = useState(Array)

  const [channel] = useChannel("public-chat", (message) => {
    setMessages((prev : any ) => [...prev, message]);
  });


  async function sendMessage(){
    channel.publish("message", {text, date:Date.now()});
    setText('');
    instance.post('/message', {
      text : text
    })
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/message", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.documents);
      });
  }, [messages]);

  console.log(data)

  return(
  <>
<UserButton/>
      <SignedIn>
    <main>
      {data && data.map((message : any) => (
        <div>
          <div>
            {message.text}
          </div>
        </div>
      ))}
      <textarea onChange={(e) => setText(e.target.value)} />
      <button type="button" onClick={sendMessage}>Send</button>
    </main>
    <button onClick={() => console.log(data)}>click for console</button>
    </SignedIn>
    <SignedOut>
    <SignUp path="/signup" routing="path" signInUrl="/signin" />
    {data && <a href="/signup">click here to signup</a>}
    <div>ta odoogoor logged out baina</div>
    </SignedOut>
    </>


//   <>
  
//   <div>Your page's content can go here. </div>
// </>
  )
}
