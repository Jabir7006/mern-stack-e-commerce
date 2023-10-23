import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);
   
  return (
    <div>
      {user && user.firstName ? (
        <>
          <h3>{user.firstName}</h3> <img src={user.image} alt="" />
        </>
      ) : (
        <h3>not logged in</h3>
      )}
      Home Page
    </div>
  );
};

export default Home;
