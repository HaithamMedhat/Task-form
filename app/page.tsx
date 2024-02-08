"use client";
import React, { useLayoutEffect  , useState} from "react"; 
import { Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; 
import LoadingSpinner from "@/components/LoadingSpinner";

const CustomContainer = styled(Container)({
  marginTop: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const CustomHeader = styled(Typography)({
  marginBottom: "1rem",
});

const CustomButton = styled(Button)({
  marginTop: "2rem",
});

export default function Home() {
  const router = useRouter();
  const isAuth = useSelector<boolean | any>(({ isAuth }) => isAuth);
  const [loadPage , setLoadPage] = useState<boolean>(true);
  useLayoutEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }else{
      setLoadPage(false)
    }
    
  });
  if(loadPage){
    return <LoadingSpinner/> 
  }
  
  return (
    <CustomContainer maxWidth="xs">
    <CustomHeader variant="h4">
      Welcome to Our Website
    </CustomHeader>
    <Typography variant="body1" paragraph>
      Explore our amazing features and services.
    </Typography>
    <CustomButton
      variant="contained"
      color="primary"
    >
      Learn More
    </CustomButton>
  </CustomContainer>
  );
}
