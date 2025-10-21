import HeroSection from "../Components/Hero";
import Vibes from "../Components/Vibes";
import Services from "../Components/Services";
import Gallery from "../Components/Gallary";
// import Testimonials from "../Components/Testimonials";
import BlogPreview from "../Components/BlogPreview";

const Home = () => {
  return (
    <div className="relative min-h-screen ">
      <HeroSection />
      <Vibes />
      <Services />
      {/* <Testimonials /> */}
      <Gallery />
      <BlogPreview />
    </div>
  );
};

export default Home;
