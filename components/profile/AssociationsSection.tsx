import { Award, ExternalLink, Loader2, Users } from "lucide-react";
import { useRouter } from "vinext/shims/navigation";
import { UserAssociation } from "@/components/profile/ProfileContainer";

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
    <section className="space-y-6 rounded-2xl border-4 border-neutral-950 bg-white p-6 shadow-[8px_8px_0_#0a0a0a] backdrop-blur-xl sm:p-8">
      <div className="flex flex-col items-start justify-between gap-2 border-b-2 border-neutral-950 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-neutral-950 bg-yellow-300 px-3 py-0.5 font-mono text-[10px] font-bold text-neutral-950 shadow-[2px_2px_0_#0a0a0a]">
            <span>// ASOCIACIONES_ACTIVAS</span>
          </div>
          <h2 className="flex items-center gap-2 font-mono text-xl font-black text-neutral-950 uppercase">
            <Users className="h-5 w-5 text-neutral-950" />
            Mis Asociaciones ({memberships.length})
          </h2>
        </div>
      </div>

      {isLoadingAssocs ? (
        <div className="flex items-center justify-center gap-2 p-8 font-mono text-xs font-bold text-neutral-700">
          <Loader2 className="h-4 w-4 animate-spin text-neutral-950" />
          <span>Cargando asociaciones asociadas...</span>
        </div>
      ) : memberships.length === 0 ? (
        <div className="space-y-3 rounded-xl border-2 border-dashed border-neutral-950 bg-neutral-50 p-8 text-center">
          <Award className="mx-auto h-8 w-8 text-neutral-500" />
          <p className="font-sans text-xs font-bold text-neutral-700">
            Aún no estás inscrito en ninguna asociación de la ETSII.
          </p>
          <button
            onClick={() => router.push("/associations")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-neutral-950 bg-yellow-300 px-4 py-2 font-mono text-xs font-bold text-neutral-950 uppercase shadow-[2px_2px_0_#0a0a0a] transition-all hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Explorar Asociaciones
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {memberships.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border-2 border-neutral-950 bg-white p-5 shadow-[4px_4px_0_#0a0a0a] transition-all hover:-translate-y-1 hover:bg-neutral-50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-neutral-950 bg-yellow-300 px-2.5 py-1 font-mono text-[10px] font-bold text-neutral-950 uppercase shadow-[2px_2px_0_#0a0a0a]">
                    // {item.association?.tag || "ETSII"}
                  </span>

                  {/* Badge con el Cargo del Usuario */}
                  <span className="rounded-md border-2 border-neutral-950 bg-emerald-300 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-neutral-950 uppercase shadow-[2px_2px_0_#0a0a0a]">
                    {item.position}
                  </span>
                </div>

                <h3 className="font-mono text-base font-black text-neutral-950 uppercase transition-colors">
                  {item.association?.name}
                </h3>

                <p className="line-clamp-2 font-sans text-xs text-neutral-700">
                  {item.association?.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t-2 border-neutral-200 pt-3 font-mono text-[11px] font-bold text-neutral-600">
                <span>
                  Miembro desde:{" "}
                  {new Date(item.joined_at).toLocaleDateString("es-ES")}
                </span>
                <button
                  onClick={() =>
                    window.open(item.association.website_url, "_blank")
                  }
                  className="inline-flex cursor-pointer items-center gap-1 text-neutral-950 hover:underline"
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
