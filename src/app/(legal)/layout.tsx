import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto w-full max-w-[var(--container-content)] px-4 py-12 sm:px-6">
        <article className="prose prose-slate dark:prose-invert max-w-none
          prose-headings:text-text prose-p:text-text-secondary prose-li:text-text-secondary
          prose-a:text-primary-600 prose-strong:text-text
          prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
          prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-lg prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-2
          prose-p:leading-relaxed prose-li:leading-relaxed
        ">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
