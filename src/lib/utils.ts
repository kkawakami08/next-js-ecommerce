import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//convert prisma object into regular js object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

//format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [intValue, floatValue] = num.toString().split(".");
  //.padEnd(2, "0") if number is 49.9 it will pad it to 49.90
  return floatValue
    ? `${intValue}.${floatValue.padEnd(2, "0")}`
    : `${intValue}.00`;
}

//format errors
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === "ZodError") {
    //handle Zod Error
    //get array of messages from error.errors
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    //handle prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    //handle other errors
    return typeof error.message === "string"
      ? error.messsage
      : JSON.stringify(error.message);
  }
}
