import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Services from "../components/Services";
import BeyondCode from "../components/BeyondCode";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

// Section order as on byaazim.in: about → work → services → beyond →
// experience → contact.
export default function Home() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Work />
      <Services />
      <BeyondCode />
      <Experience />
      <Contact />
    </main>
  );
}
