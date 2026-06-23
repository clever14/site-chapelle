import Link from "next/link";

export default function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-bord-2 bg-carte/95 backdrop-blur lg:hidden">
      <div className="container-x flex gap-3 py-3">
        <Link href="/horaires" className="btn-or flex-1">
          Horaires
        </Link>
        <Link href="/contact" className="btn-outline flex-1">
          Nous trouver
        </Link>
      </div>
    </div>
  );
}
