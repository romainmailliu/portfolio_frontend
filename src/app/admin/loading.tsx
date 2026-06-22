export default function DashboardLoading() {
  return (
    <main className="page-container max-w-7xl py-10">
      <div className="admin-skeleton mb-10 h-28 animate-pulse" />
      <div className="flex flex-col gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="admin-skeleton h-56 animate-pulse sm:h-52 lg:h-48"
          />
        ))}
      </div>
    </main>
  );
}
