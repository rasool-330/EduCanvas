import { RefreshCw } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  iconClassName = "text-brand",
  small = false,
  loading = false,
  error = null,
  onRefresh,
  refreshLabel = "Refresh",
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <div className="flex items-center gap-1.5">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="rounded p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50"
              aria-label={refreshLabel}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
            </button>
          )}
          {Icon && <Icon className={`h-5 w-5 ${iconClassName}`} aria-hidden="true" />}
        </div>
      </div>

      {loading ? (
        <div className="mt-3 h-8 w-16 animate-pulse rounded bg-slate-100" />
      ) : error ? (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      ) : (
        <p className={`mt-2 font-bold text-slate-800 ${small ? "text-sm" : "text-2xl"}`}>{value}</p>
      )}
    </div>
  );
}
