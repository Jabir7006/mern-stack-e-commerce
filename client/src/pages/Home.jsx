import React from "react";
import { useSelector } from "react-redux";
import Hero from "../components/Hero";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <main className="py-8 px-3 md:px-4 lg:px-5 overflow-x-hidden">
      <div>
        <Hero />
      </div>
    </main>
  );
};

export default Home;
