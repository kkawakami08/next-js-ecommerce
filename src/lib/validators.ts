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

//schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//schema for signing up users
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  //data = everything in schema (name,email,password,confirmPassword)
  //first param = function that returns true or false (checking if passwords match)
  .refine(
    (data) => data.password === data.confirmPassword,
    //second param = object to return if false
    {
      message: "Passwords don't match",
      //field in which the message will display
      path: ["confirmPassword"],
    }
  );
