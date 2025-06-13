// src/components/alert-dialog-send-now.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { toast } from "sonner";

interface AlertDialogSendNowProps {
  id: string; // Job ID
  triggerText: string;
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
}

export function AlertDialogSendNow({
  id,
  triggerText,
  title,
  description,
  cancelText,
  actionText,
}: AlertDialogSendNowProps) {
  const handleSendNow = async () => {
    try {
      const response = await fetch("/api/jobs/send-now", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId: id }),
      });

      if (response.ok) {
        toast.success("Die Schicht wurde erfolgreich an alle Benutzer gesendet.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Fehler beim Versenden der Schicht. Bitte versuchen Sie es später erneut.");
      }
    } catch (error) {
      console.error("Fehler beim Senden der Schicht:", error);
      toast.error("Unbekannter Fehler. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="cursor-pointer bg-yellow-400 text-black hover:bg-amber-600">
          <Rocket />
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="default"
              onClick={handleSendNow}
              className="cursor-pointer bg-yellow-400 text-black hover:bg-amber-600"
            >
              <Rocket />
              {actionText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
