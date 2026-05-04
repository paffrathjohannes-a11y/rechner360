import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StickyDesktopAd } from '@/components/ads/sticky-desktop-ad';
import { MobileAnchorAd } from '@/components/ads/mobile-anchor-ad';

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
      {/* Sticky Desktop-Ad (nur ≥xl, schließbar, nur wenn Ad liefert). */}
      <StickyDesktopAd />
      {/* Mobile Anchor-Ad (nur <xl, schließbar). Schließt die Mobile-Revenue-
          Lücke des Sticky-Desktop-Ads. */}
      <MobileAnchorAd />
    </>
  );
}
