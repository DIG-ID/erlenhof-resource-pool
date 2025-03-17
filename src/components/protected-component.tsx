import React from "react";

interface ProtectedComponentProps {
  allowedRoles: string[];
  userRole: string;
  children: React.ReactNode;
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ allowedRoles, userRole, children }) => {
  if (!allowedRoles.includes(userRole)) return null; // Se o user não tem permissão, não renderiza nada
  return <>{children}</>;
};

export default ProtectedComponent;
