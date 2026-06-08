export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 h-28 animate-pulse rounded-xl bg-neutral-200/80" />
      <div className="flex flex-col gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-56 animate-pulse rounded-2xl bg-neutral-200/80 sm:h-52 lg:h-48"
          />
        ))}
      </div>
    </main>
  );
}
