import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

export interface Part {
  id: string;
  name: string;
  code: string;
  quantity: number;
  type: "stock" | "purchase";
  status: string;
}

interface PartsManagementProps {
  parts: Part[];
  onAddPart: () => void;
  onRemovePart: (id: string) => void;
}

export function PartsManagement({ parts, onAddPart, onRemovePart }: PartsManagementProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">การเบิกใช้อะไหล่</CardTitle>
        <Button type="button" variant="info" onClick={onAddPart}>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มอะไหล่
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่ออะไหล่</TableHead>
              <TableHead>รหัส</TableHead>
              <TableHead>จำนวน</TableHead>
              <TableHead>ประเภท</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>การดำเนินการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.id}>
                <TableCell>{part.name}</TableCell>
                <TableCell>{part.code}</TableCell>
                <TableCell>{part.quantity}</TableCell>
                <TableCell>
                  {part.type === "stock" ? "เบิกจาก Stock" : "สั่งซื้อใหม่"}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    part.status === "เบิกแล้ว" 
                      ? "bg-success/10 text-success" 
                      : "bg-warning/10 text-warning"
                  }`}>
                    {part.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onRemovePart(part.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}