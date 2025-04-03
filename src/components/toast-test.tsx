"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ToastTest() {
  return (
    <Button onClick={() => toast.success("Toast a funcionar!")} className="cursor-pointer">
      Testar Toast
    </Button>
  );
}
