import { z } from "zod";
import { insertProductSchema } from "@/lib/validators";

//z.infer<typeof insertProductSchema> gets info from insertProductSchema so we don't have to repeat ourselves in Product type
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};
