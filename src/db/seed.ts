import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  //wipe all data
  await prisma.product.deleteMany();

  //create products
  await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log("Database has been seeded successfully!");
}

main();
