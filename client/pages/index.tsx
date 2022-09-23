import axios, { AxiosRequestHeaders } from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { FC } from "react";
import { IUser } from "./auth/signup";

interface InitialPageProps {
  currentUser: IUser;
}

const LandingPage = (props: InitialPageProps) => {
  return props.currentUser ? (
    <h1>You are logged in</h1>
  ) : (
    <h1>You are not logged in</h1>
  );
};

export const getServerSideProps = async ({
  req,
}: {
  req: { headers: AxiosRequestHeaders };
}) => {
  let res;
  if (typeof window === "undefined") {
    res = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        withCredentials: true,
        headers: req.headers,
      }
    );
  } else {
    res = await axios.get("/api/users/currentuser");
  }

  return { props: res.data };
};

export default LandingPage;
