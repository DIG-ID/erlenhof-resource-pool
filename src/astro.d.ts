// src/astro.d.ts
import type { UserData } from "@/lib/types";

declare module "astro" {
  interface Locals {
    userData?: UserData; // Adiciona a propriedade userData ao tipo Locals
  }
}