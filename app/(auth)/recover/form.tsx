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
import { createPasswordRecovery } from "@/lib/auth";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/auth/schemas";
import { IconLoader2, IconMail } from "@tabler/icons-react";

export function RecoverForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormData) {
    setLoading(true);
    const result = await createPasswordRecovery(values);
    toast.error(result.message);
    setLoading(false);
  }

  return (
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
      <Button
        className="w-full"
        type="submit"
        disabled={loading || !form.formState.isValid}
      >
        {loading ? (
          <>
            Sending Reset Link
            <IconLoader2 className="ml-2 size-3.5 animate-spin" />
          </>
        ) : (
          <>
            Send Reset Link
            <IconMail className="ml-2 size-3.5" />
          </>
        )}
      </Button>
    </form>
  );
}
