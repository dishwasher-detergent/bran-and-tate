"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/auth";
import {
  newPasswordSchema,
  type NewPasswordFormData,
} from "@/lib/auth/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2, IconLock } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const secret = searchParams.get("secret");
  const userId = searchParams.get("userId");

  const form = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (!secret || !userId) {
    router.push("/signin");
    return null;
  }

  async function onSubmit(values: NewPasswordFormData) {
    if (!userId || !secret) {
      return;
    }

    setLoading(true);
    const result = await resetPassword(userId, secret, values.password);
    toast.error(result.message);
    setLoading(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <FieldGroup>
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter new password"
                  id="password"
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
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm new password"
                  id="confirmPassword"
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
            Resetting Password
            <IconLoader2 className="ml-2 size-3.5 animate-spin" />
          </>
        ) : (
          <>
            Reset Password
            <IconLock className="ml-2 size-3.5" />
          </>
        )}
      </Button>
    </form>
  );
}
