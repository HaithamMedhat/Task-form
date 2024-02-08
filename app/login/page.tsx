"use client";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import Form from "@/components/Form";
import { useForm } from "react-hook-form";
import { usersInfo } from "@/interfaces/interfaces";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getData } from "@/api/useCall";
import { useDispatch } from "react-redux";
import { isAuthActions } from "@/store/auth-store";
import { useRouter } from "next/navigation"; 
import LoadingSpinner from "@/components/LoadingSpinner";


const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email can not be empty")
    .email("Invalid email Format"),
  password: yup
    .string()
    .required("Password can not be empty"),
});
export type FormValues = {
  email: string;
  password: string;
};
export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorsMessages, setErrorsMessages] = useState<any>({});
  const [errorLogin, setErrorLogin] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [loadPage , setLoadPage] = useState<boolean>(true);
  const isAuth = useSelector<boolean | any>(({ isAuth }) => isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUseNativeValidation: true,
    resolver: yupResolver(validationSchema),
  });
  useLayoutEffect(() => {
    if (isAuth) {
      router.push("/");
    }else{
      setLoadPage(false)
    }
    setErrorsMessages(errors);
  }, [errors , isAuth]);
 
   
  if(loadPage){
    return <LoadingSpinner/> 
  }
  
  function onSubmit(data: usersInfo) {
    setIsLoading(true);
    getData(data.email, data.password).then((e) => {
      if (e) {
        setIsLoading(false);
        dispatch(isAuthActions.login());
        router.push("/");
      } else {
        setIsLoading(false);
        setErrorLogin("incorrect email or password");
      }
    });
  }
  return (
    <Form
      isloading={isloading}
      errorLogin={errorLogin}
      formContent="log in"
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errorsMessages}
    />
  );
}
