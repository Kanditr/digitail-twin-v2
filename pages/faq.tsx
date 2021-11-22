import React from "react";
import Hero from "./Faq/Hero/hero";
import HotBid from "../components/HotBid/hotbid";
import Header from "../components/Header/header";
import Footers from "../components/Footer/footer";

const Faq = () => {
  return (
    <>
      <Header />
      <Hero />
      <HotBid classSection="section-pb" />
      <Footers />
    </>
  );
};

export default Faq;
