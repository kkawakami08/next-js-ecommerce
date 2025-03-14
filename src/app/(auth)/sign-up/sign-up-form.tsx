"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SIGN_UP_DEFAULT_VALUES } from "@/lib/constants";
import Link from "next/link";
import { signUpUser } from "@/lib/actions/user.actions";

//allow us to easily submit to signinwithcredentials and get the response back and do stuff with it
import { useActionState } from "react";

//mostly for user feedback (disabled button while submitting)
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  //data - state action - signinwithcredentials
  //first parameter = action to be used when submitting form
  //second paremter = default state
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full " variant={"default"}>
        {pending ? "Registering..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <form action={action}>
      {/* have callbackurl as a hidden input to send along with the rest of the form */}
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={SIGN_UP_DEFAULT_VALUES.name}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={SIGN_UP_DEFAULT_VALUES.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={SIGN_UP_DEFAULT_VALUES.password}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            defaultValue={SIGN_UP_DEFAULT_VALUES.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href={"/sign-in"} target="_self" className="link">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
