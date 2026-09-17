import { getSubmissions } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div>
      <h1 className="font-display text-3xl text-edgeline-white">Submissions</h1>

      <div className="mt-8 overflow-x-auto border border-edgeline-border">
        <table className="w-full text-left">
          <thead className="border-b border-edgeline-border">
            <tr className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Summary</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center font-body text-edgeline-white/50">
                  No submissions yet.
                </td>
              </tr>
            )}
            {submissions.map((s) => (
              <tr key={s.id} className="border-b border-edgeline-border last:border-0">
                <td className="px-4 py-3 font-condensed text-xs uppercase tracking-wider text-edgeline-white/70">
                  {s.type}
                </td>
                <td className="px-4 py-3 font-body text-xs text-edgeline-white/70">
                  {Object.entries(s.payload)
                    .filter(([key, value]) => value && key !== "hpField")
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(" · ")}
                </td>
                <td className="px-4 py-3 font-body text-xs text-edgeline-white/50">
                  {new Date(s.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
