import { usersInfo } from "@/interfaces/interfaces";
import axios from "axios";

let url = "http://localhost:8000/users"; 
export async function postData(data: usersInfo) {
    const responce = await axios.post(url, data);
    if(responce.data){
        return true;
    } else{
        return false;
    }
} 
export async function getData(email:string , password:string ) { 
  const responce = await axios.get(url);  
  let returnType:boolean = false; 
  if(responce.data){ 
    for(let e of  responce.data){
      if( e.email === email && e.password === password){   
        console.log('INSIDE TRUUUUUUUE')
        returnType = true; 
        break;
       }else{ 
        console.log('INSIDE fallllse')
        returnType = false 
       }
    }
  }else{
    console.log('INSIDE ellllllse')

    returnType = false
  } 
  return returnType;
} 