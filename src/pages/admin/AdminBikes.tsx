import { AdminTable } from "./AdminTable";

const fmtDate = (v: string) => v ? new Date(v).toLocaleDateString() : "—";

const AdminBikes = () => (
  <AdminTable
    title="Bikes"
    subtitle="All bikes in the fleet"
    table="bikes"
    columns={[
      { key: "model", label: "Model" },
      { key: "plate_number", label: "Plate" },
      { key: "status", label: "Status", render: (v) => <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase">{v}</span> },
      { key: "battery_percent", label: "Battery", render: (v) => `${v}%` },
      { key: "battery_health", label: "Health", render: (v) => `${v}%` },
      { key: "odometer_km", label: "Odo (km)" },
      { key: "created_at", label: "Added", render: fmtDate },
    ]}
  />
);
export default AdminBikes;
