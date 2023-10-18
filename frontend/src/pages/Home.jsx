import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return <div>{user && user.firstName}</div>;
};

export default Home;
