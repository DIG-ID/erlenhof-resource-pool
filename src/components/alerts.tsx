import { createContext, useContext, useState, ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Definir a interface do contexto
interface AlertContextType {
  showAlert: (message: string, type?: "success" | "error") => void;
}

// Criar contexto
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Criar o Provider que vai armazenar os alerts
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showAlert = (message: string, type: "success" | "error" = "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000); // Auto-close após 5 segundos
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert variant={alert.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
};

// Criar um hook para facilitar o uso do alerta em qualquer componente
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
