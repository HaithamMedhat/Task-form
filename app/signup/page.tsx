"use client";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Form from "@/components/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usersInfo } from "@/interfaces/interfaces";
import { postData } from "@/api/useCall";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

const regexPassword =
  /^(?=.{10,}$)(?=(?:.*?[A-Z]){2,})(?=.*?[a-z])(?=(?:.*?[0-9]){2}(?!.*-)(?!.*%)).*$/;
const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("Name can not be empty")
    .matches(
      /^[a-zA-Z]{3,8}$/gm,
      "Name must contain only letters (min 3 - max 8)"
    ),
  lastName: yup
    .string()
    .required("Name can not be empty")
    .matches(
      /^[a-zA-Z]{3,8}$/gm,
      "Name must contain only letters (min 3 - max 8)"
    ),
  email: yup
    .string()
    .required("Email can not be empty")
    .email("Invalid email Format"),
  password: yup
    .string()
    .required("Password can not be empty")
    .matches(
      regexPassword,
      "Please use at least two upper case and do not include neither % or - special charachter"
    ),
});

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export default function Login() {
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
    return  <LoadingSpinner/> 
  }
  
  function onSubmit(data: usersInfo) {
    postData(data).then((e) => {
      if (e) {
        setIsLoading(false);
        router.push("/login");
        return;
      } else {
        setIsLoading(false);
        setErrorLogin("server error please try again later");
      }
    });
  }

  return (
    <Form
      isloading={isloading}
      errorLogin={errorLogin}
      formContent="sign up"
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errorsMessages}
    />
  );
}
