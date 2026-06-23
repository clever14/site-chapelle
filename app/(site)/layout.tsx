import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import MobileActionBar from "@/components/mobile-action-bar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh] pb-24 lg:pb-0">{children}</main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
