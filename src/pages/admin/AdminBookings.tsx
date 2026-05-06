import { AdminTable } from "./AdminTable";

const fmtDate = (v: string) => v ? new Date(v).toLocaleString() : "—";

const AdminBookings = () => (
  <AdminTable
    title="Bookings"
    subtitle="All service bookings"
    table="bookings"
    columns={[
      { key: "service_type", label: "Service" },
      { key: "scheduled_at", label: "Scheduled", render: fmtDate },
      { key: "status", label: "Status", render: (v) => <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase">{v}</span> },
      { key: "notes", label: "Notes" },
      { key: "user_id", label: "User", render: (v) => <code className="text-[10px]">{String(v).slice(0, 8)}…</code> },
      { key: "created_at", label: "Created", render: fmtDate },
    ]}
  />
);
export default AdminBookings;
