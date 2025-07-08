import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCog, Users } from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";

export function RoleSwitcher() {
  const { userRole, setUserRole } = useUserRole();

  const handleRoleSwitch = () => {
    setUserRole(userRole === "production" ? "engineering" : "production");
  };

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="secondary" className="text-xs">
        {userRole === "production" ? "ฝ่ายผลิต" : "ฝ่ายวิศวกรรม"}
      </Badge>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRoleSwitch}
        className="text-xs"
      >
        {userRole === "production" ? (
          <>
            <UserCog className="h-4 w-4 mr-1" />
            สลับเป็นวิศวกร
          </>
        ) : (
          <>
            <Users className="h-4 w-4 mr-1" />
            สลับเป็นผลิต
          </>
        )}
      </Button>
    </div>
  );
}