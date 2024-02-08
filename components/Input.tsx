 import {  
    TextField
 }
from "@mui/material";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id:string ,
    label : string ,
    register: any,
    errorMessages : string | boolean ,
    fullWidth? : boolean
}

export default function Input({id , label,fullWidth, register , errorMessages} : inputProps) {
  let booleanMessageError: boolean = false;
  if(errorMessages){
    booleanMessageError = true ; 
  }

  return (
    <>
      <TextField 
        sx={{px: 1}}
        id={id}
        type={id}
        label={label} 
        fullWidth={fullWidth}
        {...register(id)}
        error={booleanMessageError}
        helperText={errorMessages}
        required  
      /> 
    </>
  );
}
