
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Settings, 
  Wrench, 
  Package, 
  Users, 
  Building, 
  Zap,
  ChevronRight 
} from "lucide-react";

interface MasterDataType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

export function MasterDataManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const masterDataTypes: MasterDataType[] = [
    {
      id: "equipment",
      name: "อุปกรณ์/เครื่องจักร",
      description: "จัดการข้อมูลเครื่องจักรและอุปกรณ์ในโรงงาน",
      icon: <Settings className="h-6 w-6" />,
      count: 156,
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      id: "spare-parts",
      name: "อะไหล่",
      description: "จัดการข้อมูลอะไหล่และชิ้นส่วนสำรอง",
      icon: <Wrench className="h-6 w-6" />,
      count: 324,
      color: "bg-green-100 text-green-700 border-green-200"
    },
    {
      id: "supplies",
      name: "วัสดุสิ้นเปลือง",
      description: "จัดการข้อมูลวัสดุและอุปกรณ์สิ้นเปลือง",
      icon: <Package className="h-6 w-6" />,
      count: 89,
      color: "bg-orange-100 text-orange-700 border-orange-200"
    },
    {
      id: "vendors",
      name: "ผู้จำหน่าย",
      description: "จัดการข้อมูลผู้จำหน่ายและผู้ให้บริการ",
      icon: <Users className="h-6 w-6" />,
      count: 45,
      color: "bg-purple-100 text-purple-700 border-purple-200"
    },
    {
      id: "locations",
      name: "สถานที่/ตำแหน่ง",
      description: "จัดการข้อมูลสถานที่และตำแหน่งในโรงงาน",
      icon: <Building className="h-6 w-6" />,
      count: 78,
      color: "bg-cyan-100 text-cyan-700 border-cyan-200"
    },
    {
      id: "utilities",
      name: "ระบบสาธารณูปโภค",
      description: "จัดการข้อมูลระบบไฟฟ้า น้ำ แก๊ส และอื่นๆ",
      icon: <Zap className="h-6 w-6" />,
      count: 23,
      color: "bg-yellow-100 text-yellow-700 border-yellow-200"
    }
  ];

  const filteredTypes = masterDataTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // This would typically navigate to a detailed management page
    console.log(`Selected category: ${categoryId}`);
  };

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหาข้อมูล Master..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มข้อมูลใหม่
        </Button>
      </div>

      {/* Master Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTypes.map((type) => (
          <Card 
            key={type.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
            onClick={() => handleCategorySelect(type.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${type.color}`}>
                  {type.icon}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg">{type.name}</CardTitle>
                <CardDescription className="text-sm">
                  {type.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-sm">
                  {type.count} รายการ
                </Badge>
                <div className="text-xs text-muted-foreground">
                  คลิกเพื่อจัดการ
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTypes.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            ไม่พบข้อมูลที่ตรงกัน
          </h3>
          <p className="text-muted-foreground">
            ลองใช้คำค้นหาอื่น หรือเพิ่มข้อมูล Master ใหม่
          </p>
        </div>
      )}
    </div>
  );
}
