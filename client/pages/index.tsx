import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FC } from "react";
import { IUser } from "./auth/signup";

interface InitialPageProps {
  currentUser: IUser;
}

const LandingPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  console.log("props", props.);

  return <h1>Landing Page</h1>;
};

export async function getServerSideProps(request: any) {
  const { req } = request;
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

  const currentUser = res.data;

  return { props: currentUser };
}

export default LandingPage;
