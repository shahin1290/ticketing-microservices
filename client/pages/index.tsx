import { ReactElement } from "react";
import HomePageLayout from "../layout/Home";

const Home = () => {
  return <div>Hello world</div>;
};

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
