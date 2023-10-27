import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div>
      home
      {user && <h1>{user.firstName}</h1>}
    </div>
  );
};

export default Home;
