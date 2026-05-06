import { AdminTable } from "./AdminTable";

const AdminSubscriptions = () => (
  <AdminTable
    title="Subscriptions"
    subtitle="Active &amp; past plans"
    table="subscriptions"
    columns={[
      { key: "plan_name", label: "Plan" },
      { key: "monthly_fee", label: "Fee", render: (v) => `₹${v}` },
      { key: "status", label: "Status", render: (v) => <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase">{v}</span> },
      { key: "start_date", label: "Start" },
      { key: "end_date", label: "End" },
      { key: "user_id", label: "User", render: (v) => <code className="text-[10px]">{String(v).slice(0, 8)}…</code> },
    ]}
  />
);
export default AdminSubscriptions;
