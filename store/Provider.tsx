"use client";
import { Provider } from "react-redux";
import store from "../store/auth-store";
import { ReactChildren } from "@/interfaces/interfaces";

export default function ProviderStore({children} : ReactChildren) {
  return <Provider store={store}>{children}</Provider>;
}