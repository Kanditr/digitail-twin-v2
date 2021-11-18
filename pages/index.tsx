import type { NextPage } from "next";
import React from "react";
import Modal from "../components/Modal/modal";
import Hero from "./Home/Hero/hero";
import Selection from "./Home/Selection/index";
import Popular from "./Home/Popular/popular";
import HotBid from "../components/HotBid/index";
import Collections from "./Home/Collections/index";
import Discover from "./Home/Discover/discover";
import Description from "./Home/Description/index";
import Header from "../components/Header/header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Selection />
      <Popular />
      {/* <HotBid classSection="section" /> */}
      {/* <Collections /> */}
      <Discover />
      {/* <Description /> */}
      {/* <Modal /> */}
    </>
  );
};

export default Home;
