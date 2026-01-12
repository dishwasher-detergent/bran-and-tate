import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SignInFooter() {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?
        <Button
          variant="link"
          className="text-muted-foreground p-1 text-sm"
          render={
            <Link href="/signup" className="underline">
              Sign Up Here
            </Link>
          }
        ></Button>
      </p>
      <p className="text-sm text-muted-foreground">
        Forgot your password?
        <Button
          variant="link"
          className="text-muted-foreground p-1 text-sm"
          nativeButton={false}
          render={
            <Link href="/recover" className="underline">
              Reset Here
            </Link>
          }
        ></Button>
      </p>
    </>
  );
}
