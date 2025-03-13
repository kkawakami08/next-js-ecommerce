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
