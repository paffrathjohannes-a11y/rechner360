import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './legal.css';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 mx-auto w-full max-w-[var(--container-content)] px-4 py-12 sm:px-6">
        <article className="legal-content">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
