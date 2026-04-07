import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto w-full max-w-[var(--container-content)] px-4 py-12 sm:px-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
