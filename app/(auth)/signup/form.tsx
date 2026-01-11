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
import { signUpWithEmail } from "@/lib/auth";
import { signUpSchema, type SignUpFormData } from "@/lib/auth/schemas";
import { IconLoader2, IconUserPlus } from "@tabler/icons-react";

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpFormData) {
    setLoading(true);
    const result = await signUpWithEmail(values);
    toast.error(result.message);
    setLoading(false);
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldContent>
                  <Input {...field} placeholder="John Doe" id="name" />
                </FieldContent>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
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
              Signing up
              <IconLoader2 className="ml-2 size-3.5 animate-spin" />
            </>
          ) : (
            <>
              Sign Up
              <IconUserPlus className="ml-2 size-3.5" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}
