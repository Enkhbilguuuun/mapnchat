import  { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useState } from "react";
import * as React from "react"


configureAbly({key : "Gk_6OA.L15T4Q:Iboyq9-_wQBDusD7444A8nZ0piAh20AnamsrCiblLZ4", clientId: Date.now() + ""});

export default function Home(){

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
    setText('')
  }

  return(
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
  )
}