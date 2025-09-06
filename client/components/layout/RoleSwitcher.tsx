import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCog, Users, Crown } from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";

export function RoleSwitcher() {
  const { userRole, setUserRole } = useUserRole();

  const roleLabel =
    userRole === "production"
      ? "ฝ่ายผลิต"
      : userRole === "engineeringHead"
      ? "หัวหน้าฝ่ายวิศวกรรม"
      : "ฝ่ายวิศวกรรม";

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="secondary" className="text-xs min-w-[8rem] text-center">
        {roleLabel}
      </Badge>
      <div className="flex items-center space-x-1">
        <Button
          variant={userRole === "production" ? "default" : "ghost"}
          size="sm"
          onClick={() => setUserRole("production")}
          className="text-xs"
        >
          <Users className="h-4 w-4 mr-1" /> ฝ่ายผลิต
        </Button>
        <Button
          variant={userRole === "engineering" ? "default" : "ghost"}
          size="sm"
          onClick={() => setUserRole("engineering")}
          className="text-xs"
        >
          <UserCog className="h-4 w-4 mr-1" /> ฝ่ายวิศวกรรม
        </Button>
        <Button
          variant={userRole === "engineeringHead" ? "default" : "ghost"}
          size="sm"
          onClick={() => setUserRole("engineeringHead")}
          className="text-xs"
        >
          <Crown className="h-4 w-4 mr-1" /> หัวหน้าฝ่ายวิศวกรรม
        </Button>
      </div>
    </div>
  );
}
