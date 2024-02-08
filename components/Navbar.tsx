"use client";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material"; 
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isAuthActions } from "@/store/auth-store";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const isAuth = useSelector<boolean | any>(({ isAuth }) => isAuth);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task
          </Typography>
          {isAuth ? (
            <Link href="/login">
              <Button
                onClick={() => dispatch(isAuthActions.logout())}
                color="inherit"
              >
                Logout
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/signup">
                <Button color="inherit">Sign up</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
