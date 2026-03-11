import { Hero } from '@/components/hero';
import { Work } from '@/components/work';
import { Engineering } from '@/components/engineering';
import { Experience } from '@/components/experience';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background bg-grid">
        <Hero />
        <Work />
        <Engineering />
        <Experience />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
