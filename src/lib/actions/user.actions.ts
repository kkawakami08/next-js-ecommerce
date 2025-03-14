"use server";

import { signInFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    //signInFormSchema.parse helps with type safety
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    //credentials is how it is signing in (google etc)
    await signIn("credentials", user);
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

//Sign out user
export async function signOutUser() {
  await signOut();
}
