import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function RechnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 mx-auto w-full max-w-[var(--container-max)] px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
