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
  onAction: () => void; // Função a ser executada ao clicar em "Continuar"
}

export function AlertDialogDJ({
  triggerText,
  title,
  description,
  cancelText,
  actionText,
  onAction,
}: AlertDialogDJProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"} size="sm">
          <Trash2 /> {triggerText}
        </Button>
        </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>
            <Button variant={"destructive"} size="sm">
              <Trash2 /> {actionText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}