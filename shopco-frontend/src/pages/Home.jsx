import Navbar from "../components/Navbar";
import Offer from "../components/offer";
import Hero from "../components/Hero";
import Brands from "../components/Brands";
import HomeProducts from "../components/HomeProducts";
import DressStyle from "../components/DressStyle";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <HomeProducts />
      <DressStyle />
      <Testimonials />
    </>
  );
}

export default Home;
