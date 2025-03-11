// src/components/AlertDialogComponent.tsx
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
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


interface AlertDialogDJProps {
  triggerText: string; // Texto do botão que abre o diálogo
  title: string; // Título do diálogo
  description: string; // Descrição do diálogo
  cancelText: string; // Texto do botão "Cancelar"
  actionText: string; // Texto do botão "Continuar"
}

export function AlertDialogDJ({
  triggerText,
  title,
  description,
  cancelText,
  actionText,
}: AlertDialogDJProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
          <Trash2 /> {triggerText}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction>

              <Trash2 /> {actionText}

          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}