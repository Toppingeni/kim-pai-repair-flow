import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "production" | "engineering" | "engineeringHead";

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userData: {
    name: string;
    department: string;
  };
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>("production");

  const userData = {
    name:
      userRole === "production"
        ? "คุณสมศรี"
        : userRole === "engineeringHead"
        ? "หัวหน้าสมชาย"
        : "นายสมชาย",
    department:
      userRole === "production"
        ? "ฝ่ายผลิต"
        : userRole === "engineeringHead"
        ? "หัวหน้าฝ่ายวิศวกรรม"
        : "ฝ่ายวิศวกรรม",
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole, userData }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
}
