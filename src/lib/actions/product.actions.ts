"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get latest products
export const getLatestProducts = async () => {
  const data = await prisma.product.findMany({
    //only get first 4
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
};

// get individual product by its slug
export const getProductBySlug = async (slug: string) => {
  return await prisma.product.findFirst({
    where: {
      slug,
    },
  });
};
