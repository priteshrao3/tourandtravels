import IndexPage from "./homepage";
import FAQ from "./homepage/faq";
import Features from "./homepage/features";
import Footer from "./homepage/footer";
import TaxiServiceChandigarh from "./homepage/info";
import NavigationBar from "./homepage/navigationbar";
import Offers from "./homepage/offers";
import Testimonials from "./homepage/testomonials";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <NavigationBar />

      <IndexPage />

      <Testimonials />

      <Offers />

      <TaxiServiceChandigarh />

      <Features />

      <FAQ />

      <Footer />
    </div>
  );
}
