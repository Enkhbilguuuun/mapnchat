export async function mongoDataApiRequest( action : any, options : any){
    const result = await fetch(`https://ap-south-1.aws.data.mongodb-api.com/app/data-zjiug/endpoint/data/v1/action/${action}`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'api-key': 'SYjpUor7h1CEhh0NLCktUgtjXaTC9XhOaVdYTyA2mc9d1TESZzEMYSjZYYge2gIL',
  },
  body: JSON.stringify({
    collection:"message",
    database:"test",
    dataSource:"Cluster0",
    ...options
  }),
}).then((res) => res.json());

return result
}