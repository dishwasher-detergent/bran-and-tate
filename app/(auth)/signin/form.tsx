"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInWithEmail } from "@/lib/auth";
import { signInSchema, type SignInFormData } from "@/lib/auth/schemas";
import { IconLoader2, IconLogin } from "@tabler/icons-react";

export function SignInForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormData) {
    setLoading(true);
    const result = await signInWithEmail(values);
    toast.error(result.message);
    setLoading(false);
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FieldGroup>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldContent>
                  <Input
                    {...field}
                    type="email"
                    placeholder="user@example.com"
                    id="email"
                  />
                </FieldContent>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldContent>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    id="password"
                  />
                </FieldContent>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          className="w-full"
          type="submit"
          disabled={loading || !form.formState.isValid}
        >
          {loading ? (
            <>
              Signing in
              <IconLoader2 className="ml-2 size-3.5 animate-spin" />
            </>
          ) : (
            <>
              Sign In
              <IconLogin className="ml-2 size-3.5" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}
