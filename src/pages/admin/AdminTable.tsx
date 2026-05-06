import { useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type Col = { key: string; label: string; render?: (v: any, row: any) => ReactNode };

interface Props {
  title: string;
  subtitle?: string;
  table: string;
  columns: Col[];
  orderBy?: string;
  toolbar?: ReactNode;
}

export const AdminTable = ({ title, subtitle, table, columns, orderBy = "created_at", toolbar }: Props) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table as any).select("*").order(orderBy, { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [table]);

  const remove = async (id: string) => {
    if (!confirm("Delete this row?")) return;
    const { error } = await supabase.from(table as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <header className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle} · {rows.length} rows</p>}
        </div>
        {toolbar}
      </header>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => <TableHead key={c.key}>{c.label}</TableHead>)}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && <TableRow><TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>}
            {!loading && rows.length === 0 && <TableRow><TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">No data</TableCell></TableRow>}
            {rows.map((r) => (
              <TableRow key={r.id}>
                {columns.map((c) => (
                  <TableCell key={c.key} className="max-w-[260px] truncate">
                    {c.render ? c.render(r[c.key], r) : (r[c.key] ?? "—")}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </Card>
    </div>
  );
};
