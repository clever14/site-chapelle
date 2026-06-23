"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SUPABASE_CONFIGURED } from "@/lib/supabase/config";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function seConnecter() {
    setErr("");
    if (!email || !pwd) {
      setErr("Veuillez renseigner votre email et votre mot de passe.");
      return;
    }
    setLoading(true);

    if (!SUPABASE_CONFIGURED) {
      router.push("/admin");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) {
      setErr("Identifiants incorrects.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div
      className="flex min-h-[80vh] items-center justify-center p-6"
      style={{ background: "radial-gradient(circle at 50% 30%, #22386a 0%, #1a2a50 70%)" }}
    >
      <div className="card w-full max-w-md p-8 text-center">
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-or bg-marial-dark">
          <img src="/logo-jeanne.png" alt="Sainte Jeanne d'Arc" className="h-full w-full object-cover" />
        </span>
        <h1 className="mb-1 font-display text-[26px] font-semibold text-marial">Espace administration</h1>
        <p className="mb-6 text-[14px] text-attenue2">Réservé à l'équipe de la chapelle</p>

        <div className="space-y-4 text-left">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
            className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Mot de passe"
            className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          {err && <p className="text-[13px] text-bordeaux">{err}</p>}
          <Link href="#" className="block text-right text-[13px] text-marial hover:text-or">Mot de passe oublié ?</Link>
          <button onClick={seConnecter} disabled={loading} className="btn-marial w-full disabled:opacity-60">
            {loading ? "Connexion…" : "Se connecter"}
          </button>
          {!SUPABASE_CONFIGURED && (
            <p className="rounded-field bg-panneau-3 p-3 text-center text-[12px] text-attenue">
              Mode démo : cliquez sur « Se connecter » pour accéder à l'admin.
              Branchez Supabase pour activer la vraie authentification.
            </p>
          )}
        </div>

        <Link href="/" className="mt-6 inline-block text-[14px] text-attenue2 hover:text-marial">← Retour au site</Link>
      </div>
    </div>
  );
}
