import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StickyDesktopAd } from '@/components/ads/sticky-desktop-ad';
import { MobileAnchorAd } from '@/components/ads/mobile-anchor-ad';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 mx-auto w-full max-w-[var(--container-content)] px-4 py-12 sm:px-6">
        {children}
      </main>
      <Footer />
      {/* Sticky/Anchor-Ads — gleiche Strategie wie im Rechner-Bereich, weil
          Ratgeber-Artikel ähnlich lang sind und die Verweildauer hoch ist. */}
      <StickyDesktopAd />
      <MobileAnchorAd />
    </>
  );
}
