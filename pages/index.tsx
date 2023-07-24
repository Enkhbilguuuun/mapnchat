import  { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useState } from "react";
import * as React from "react";
import { ClerkProvider } from '@clerk/nextjs';
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";



configureAbly({key : "Gk_6OA.L15T4Q:Iboyq9-_wQBDusD7444A8nZ0piAh20AnamsrCiblLZ4", clientId: Date.now() + ""});

export default function Home(){

  const publishableKey =
  "pk_test_YWxlcnQtb2N0b3B1cy0zOS5jbGVyay5hY2NvdW50cy5kZXYk"

  interface Message {
    time: number;
    text: string;

   }

  const [text, setText] = useState<String>("");
  const [messages, setMessages] = React.useState<Array<Message>>([]);

  const [channel] = useChannel("public-chat", (message) => {
    setMessages((prev : any ) => [...prev, message]);
  })

  async function sendMessage(){
    channel.publish("message", {text, date:Date.now()});
    setText('');

  }

  return(
  <>
<UserButton/>
      <SignedIn>
    <main>
      {messages.map((message : any) => (
        <div>
          <div>
            {message.data.text}
          </div>
        </div>
      ))}
      <textarea onChange={(e) => setText(e.target.value)} />
      <button type="button" onClick={sendMessage}>Send</button>
    </main>
    </SignedIn>
    <SignedOut>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </SignedOut>
    </>


//   <>
  
//   <div>Your page's content can go here. </div>
// </>
  )
}
