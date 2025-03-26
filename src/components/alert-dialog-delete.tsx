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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface AlertDialogDeleteProps {
  id: string; // ID do job a eliminar´
  resourceType: string; // Tipo de recurso (jobs, users, etc.)
  triggerText: string; // Texto do botão que abre o diálogo
  title: string; // Título do diálogo
  description: string; // Descrição do diálogo
  cancelText: string; // Texto do botão "Cancelar"
  actionText: string; // Texto do botão "Continuar"
}

export function AlertDialogDelete({
  id,
  resourceType,
  triggerText,
  title,
  description,
  cancelText,
  actionText,
}: AlertDialogDeleteProps) {
  const handleDelete = async () => {
    const response = await fetch(`/api/${resourceType}/${id}`, {
      method: "DELETE",
    });

    if (response.redirected) {
      window.location.assign(response.url);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer" ><Trash2 /> {triggerText}</Button>
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
          <AlertDialogAction asChild className="bg-destructive">
            <Button variant="destructive" onClick={handleDelete}><Trash2 /> {actionText}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
