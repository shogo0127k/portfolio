import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tools from "@/components/Tools";
import Work from "@/components/Work";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Tools />
        <Work />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
