import { UserAssociation } from "@/app/(user)/profile/page";
import { Award, ExternalLink, Loader2, Users } from "lucide-react";
import { useRouter } from "vinext/shims/navigation";

interface Props {
  isLoadingAssocs: boolean;
  memberships: UserAssociation[];
}

export default function AssociationsSection({
  memberships,
  isLoadingAssocs,
}: Props) {
  const router = useRouter();

  return (
    <section className="space-y-6 rounded-2xl border-4 border-neutral-900 bg-neutral-900/90 p-6 shadow-[6px_6px_0_#202020] backdrop-blur-xl sm:p-8">
      <div className="flex flex-col items-start justify-between gap-2 border-b-2 border-neutral-800 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-neutral-950 px-3 py-0.5 text-[10px] text-yellow-400">
            <span>// ASOCIACIONES_ACTIVAS</span>
          </div>
          <h2 className="flex items-center gap-2 text-xl font-black text-white uppercase">
            <Users className="h-5 w-5 text-yellow-400" />
            Mis Asociaciones ({memberships.length})
          </h2>
        </div>
      </div>

      {isLoadingAssocs ? (
        <div className="flex items-center justify-center gap-2 p-8 text-xs text-neutral-400">
          <Loader2 className="h-4 w-4 animate-spin text-yellow-400" />
          <span>Cargando asociaciones asociadas...</span>
        </div>
      ) : memberships.length === 0 ? (
        <div className="space-y-3 rounded-xl border-2 border-dashed border-neutral-800 bg-neutral-950/40 p-8 text-center">
          <Award className="mx-auto h-8 w-8 text-neutral-600" />
          <p className="font-sans text-xs text-neutral-400">
            Aún no estás inscrito en ninguna asociación de la ETSII.
          </p>
          <button
            onClick={() => router.push("/associations")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 font-mono text-xs font-bold text-yellow-400 uppercase transition-all hover:bg-yellow-400 hover:text-neutral-950"
          >
            Explorar Asociaciones
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {memberships.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border-2 border-neutral-800 bg-neutral-950 p-5 transition-all hover:border-yellow-400/60 hover:shadow-[0_0_15px_rgba(250,204,21,0.1)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[10px] text-yellow-400">
                    // {item.association?.tag || "ETSII"}
                  </span>

                  {/* Badge con el Cargo del Usuario */}
                  <span className="rounded-md border border-yellow-400/40 bg-yellow-400/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-yellow-400 uppercase">
                    {item.position}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white transition-colors group-hover:text-yellow-400">
                  {item.association?.name}
                </h3>

                <p className="line-clamp-2 font-sans text-xs text-neutral-400">
                  {item.association?.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-800/80 pt-3 text-[11px] text-neutral-500">
                <span>
                  Miembro desde:{" "}
                  {new Date(item.joined_at).toLocaleDateString("es-ES")}
                </span>
                <button
                  onClick={() =>
                    window.open(item.association.website_url, "_blank")
                  }
                  className="inline-flex cursor-pointer items-center gap-1 text-yellow-400 hover:underline"
                >
                  <span>Ver</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
