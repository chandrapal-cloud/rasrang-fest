import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminTable } from "./AdminTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const fmtDate = (v: string) => v ? new Date(v).toLocaleString() : "—";

const AdminDeliveries = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    rider_id: "", customer_name: "", pickup_address: "", drop_address: "", distance_km: 0, payout: 0,
  });
  const [busy, setBusy] = useState(false);

  const create = async () => {
    if (!form.rider_id || !form.customer_name) return toast.error("Rider ID and customer required");
    setBusy(true);
    const { error } = await supabase.from("deliveries").insert(form);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Delivery assigned");
    setOpen(false);
    setForm({ rider_id: "", customer_name: "", pickup_address: "", drop_address: "", distance_km: 0, payout: 0 });
  };

  return (
    <AdminTable
      title="Deliveries"
      subtitle="All delivery jobs"
      table="deliveries"
      toolbar={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-1" /> Assign delivery</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Assign new delivery</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Rider user id (UUID)</Label><Input value={form.rider_id} onChange={(e) => setForm({ ...form, rider_id: e.target.value })} placeholder="copy from Users tab"/></div>
              <div><Label>Customer name</Label><Input value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })}/></div>
              <div><Label>Pickup</Label><Input value={form.pickup_address} onChange={(e) => setForm({ ...form, pickup_address: e.target.value })}/></div>
              <div><Label>Drop</Label><Input value={form.drop_address} onChange={(e) => setForm({ ...form, drop_address: e.target.value })}/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Distance (km)</Label><Input type="number" value={form.distance_km} onChange={(e) => setForm({ ...form, distance_km: Number(e.target.value) })}/></div>
                <div><Label>Payout (₹)</Label><Input type="number" value={form.payout} onChange={(e) => setForm({ ...form, payout: Number(e.target.value) })}/></div>
              </div>
            </div>
            <DialogFooter><Button onClick={create} disabled={busy}>{busy ? "Saving…" : "Create"}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      }
      columns={[
        { key: "customer_name", label: "Customer" },
        { key: "pickup_address", label: "Pickup" },
        { key: "drop_address", label: "Drop" },
        { key: "distance_km", label: "Km" },
        { key: "payout", label: "Payout", render: (v) => `₹${v}` },
        { key: "status", label: "Status", render: (v) => <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase">{v}</span> },
        { key: "rider_id", label: "Rider", render: (v) => <code className="text-[10px]">{String(v).slice(0, 8)}…</code> },
        { key: "created_at", label: "Created", render: fmtDate },
      ]}
    />
  );
};
export default AdminDeliveries;
