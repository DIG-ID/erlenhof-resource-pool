import { useState } from "react";
import { useJobActions } from "@/hooks/useJobActions";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApplyButtonProps {
  jobId: string;
}

export function ApplyButton({ jobId }: ApplyButtonProps) {
  const { assignJob } = useJobActions();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await assignJob(jobId);

      // ✅ Aguarda para permitir que o toast seja visível antes de recarregar
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = window.location.href; // ou outro destino
        }
      }, 1500);
    } catch (err) {
      console.error("Erro ao aplicar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-green-600 text-white cursor-pointer"
      size="sm"
      type="button"
      disabled={loading}
    >
      <CheckCircle size={16} className="mr-2" />
      {loading ? "Applying..." : "Apply"}
    </Button>
  );
}
