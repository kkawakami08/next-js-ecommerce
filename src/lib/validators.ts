import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  //refine to match regex that matches format 49.90 (not 49.999 or 49.9 etc)
  .refine(
    //.test() compares value with regex stuff to value returned from formatNumberWithDecimal()
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );

//schema for inserting products
//won't include ratings, created at, etc field that are created after initialization
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least 1 image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
