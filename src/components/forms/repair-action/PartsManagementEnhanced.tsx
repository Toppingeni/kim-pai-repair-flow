import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Trash2, 
  Package, 
  ShoppingCart, 
  Wrench,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { SparePartsSelectionDialog } from "./SparePartsSelectionDialog";
import { POSelectionDialog } from "./POSelectionDialog";

export interface Part {
  id: string;
  name: string;
  code: string;
  quantity: number;
  type: "stock" | "purchase" | "internal";
  status: string;
  unitPrice?: number;
  totalPrice?: number;
  supplier?: string;
  notes?: string;
  poNumber?: string;
}

interface PartsManagementProps {
  parts: Part[];
  onAddPart: () => void;
  onRemovePart: (id: string) => void;
  onPartsSelected?: (parts: Part[]) => void;
}

export function PartsManagement({ parts, onAddPart, onRemovePart, onPartsSelected }: PartsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showPartsDialog, setShowPartsDialog] = useState(false);
  const [showPODialog, setShowPODialog] = useState(false);
  const [partTypes, setPartTypes] = useState<{[key: string]: string}>({});
  
  const partTypeOptions = [
    { value: "stock", label: "เบิกจาก Stock", icon: <Package className="h-4 w-4" /> },
    { value: "purchase", label: "สั่งซื้อใหม่", icon: <ShoppingCart className="h-4 w-4" /> },
    { value: "internal", label: "ขอยืม/โอนภายใน", icon: <Wrench className="h-4 w-4" /> },
  ];

  const statusConfig = {
    "ใหม่": { variant: "secondary" as const, icon: <AlertTriangle className="h-3 w-3" /> },
    "เบิกแล้ว": { variant: "outline" as const, icon: <CheckCircle className="h-3 w-3" /> },
    "รอรับของ": { variant: "destructive" as const, icon: <AlertTriangle className="h-3 w-3" /> },
    "รออนุมัติ": { variant: "secondary" as const, icon: <AlertTriangle className="h-3 w-3" /> },
    "ยกเลิก": { variant: "secondary" as const, icon: <Trash2 className="h-3 w-3" /> },
  };

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || part.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeInfo = (type: string) => {
    return partTypeOptions.find(t => t.value === type) || partTypeOptions[0];
  };

  const getTotalCost = () => {
    return parts.reduce((total, part) => {
      return total + (part.totalPrice || (part.unitPrice || 0) * part.quantity);
    }, 0);
  };

  const getCurrentPartType = (partId: string) => {
    return partTypes[partId] || parts.find(p => p.id === partId)?.type || "stock";
  };

  const handleTypeChange = (partId: string, newType: string) => {
    setPartTypes(prev => ({
      ...prev,
      [partId]: newType
    }));
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            การเบิกใช้อะไหล่และวัสดุ
          </span>
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => setShowPartsDialog(true)}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              เลือกจากคลัง
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => setShowPODialog(true)}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              เลือกจาก PO
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={onAddPart}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              เพิ่มใหม่
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="part-search">ค้นหาอะไหล่</Label>
            <Input
              id="part-search"
              placeholder="ค้นหาชื่อหรือรหัสอะไหล่"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="part-filter">กรองตามประเภท</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                {partTypeOptions.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Parts List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              รายการอะไหล่ที่ใช้/สั่งซื้อ ({filteredParts.length} รายการ)
            </Label>
            {parts.length > 0 && (
              <div className="text-sm text-muted-foreground">
                รวมค่าใช้จ่าย: ฿{getTotalCost().toLocaleString()}
              </div>
            )}
          </div>
          
          {filteredParts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>ยังไม่มีอะไหล่ที่บันทึก</p>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onAddPart}
                className="mt-3"
              >
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มอะไหล่แรก
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredParts.map((part, index) => (
                <div key={part.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">ชื่ออะไหล่</Label>
                          <Input 
                            placeholder="ชื่ออะไหล่"
                            defaultValue={part.name}
                            className="h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">รหัสอะไหล่</Label>
                          <Input 
                            placeholder="รหัส"
                            defaultValue={part.code}
                            className="h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">จำนวน</Label>
                          <Input 
                            type="number"
                            placeholder="จำนวน"
                            defaultValue={part.quantity}
                            min="1"
                            className="h-8"
                          />
                        </div>
                      </div>

                      {/* Type and Status */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">ประเภท</Label>
                          <Select 
                            value={getCurrentPartType(part.id)} 
                            onValueChange={(value) => handleTypeChange(part.id, value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {partTypeOptions.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    {type.icon}
                                    {type.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">สถานะ</Label>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={statusConfig[part.status as keyof typeof statusConfig]?.variant || "secondary"}
                              className="text-xs"
                            >
                              {statusConfig[part.status as keyof typeof statusConfig]?.icon}
                              <span className="ml-1">{part.status}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Cost Information */}
                      {getCurrentPartType(part.id) === "purchase" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">ราคาต่อหน่วย (฿)</Label>
                            <Input 
                              type="number"
                              placeholder="0.00"
                              defaultValue={part.unitPrice}
                              className="h-8"
                              step="0.01"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">ราคารวม (฿)</Label>
                            <Input 
                              type="number"
                              placeholder="0.00"
                              defaultValue={part.totalPrice || (part.unitPrice || 0) * part.quantity}
                              className="h-8"
                              step="0.01"
                              readOnly
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">ผู้จำหน่าย</Label>
                            <Input 
                              placeholder="ชื่อบริษัท"
                              defaultValue={part.supplier}
                              className="h-8"
                            />
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">หมายเหตุ</Label>
                        <Textarea 
                          placeholder="หมายเหตุเพิ่มเติม"
                          defaultValue={part.notes}
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Delete Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemovePart(part.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {parts.length > 0 && (
          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">จำนวนรายการ:</span>
                <span className="font-medium">{parts.length} รายการ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">เบิกจาก Stock:</span>
                <span className="font-medium">{parts.filter(p => p.type === "stock").length} รายการ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">สั่งซื้อใหม่:</span>
                <span className="font-medium">{parts.filter(p => p.type === "purchase").length} รายการ</span>
              </div>
            </div>
          </div>
        )}

        {/* Spare Parts Selection Dialog */}
        <SparePartsSelectionDialog
          open={showPartsDialog}
          onOpenChange={setShowPartsDialog}
          selectedParts={parts}
          onPartsSelected={onPartsSelected || (() => {})}
        />

        {/* PO Selection Dialog */}
        <POSelectionDialog
          open={showPODialog}
          onOpenChange={setShowPODialog}
          selectedParts={parts}
          onPartsSelected={onPartsSelected || (() => {})}
        />
      </CardContent>
    </Card>
  );
}