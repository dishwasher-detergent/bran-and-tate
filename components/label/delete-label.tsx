"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/interfaces/label.interface";
import { deleteLabel } from "@/lib/db";
import { DeleteLabelFormData, deleteLabelSchema } from "@/lib/db/schemas";
import { DyanmicDrawer } from "../ui/dynamic-drawer";

export function DeleteLabel({ label }: { label: Label }) {
  const [open, setOpen] = useState(false);

  return (
    <DyanmicDrawer
      title={`Delete ${label.scent}`}
      description="Are you sure you want to delete this label?"
      button={
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete
        </Button>
      }
      setOpen={setOpen}
      open={open}
    >
      <DeleteForm label={label} setOpen={setOpen} />
    </DyanmicDrawer>
  );
}

interface FormProps extends React.ComponentProps<"form"> {
  label: Label;
  setOpen: (e: boolean) => void;
}

function DeleteForm({ label, setOpen }: FormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<DeleteLabelFormData>({
    resolver: zodResolver(deleteLabelSchema),
    defaultValues: {
      scent: "",
    },
  });

  async function onSubmit(values: DeleteLabelFormData) {
    if (values.scent !== label.scent) {
      form.setError("scent", {
        message: "Scent name does not match.",
      });
      toast.error("Scent name does not match.");
      return;
    }

    setLoading(true);
    const result = await deleteLabel(label.$id);

    if (result.success) {
      toast.success("Label deleted successfully!");
      setOpen(false);
      router.push("/app");
      router.refresh();
    } else {
      toast.error(result.message || "Failed to delete label");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4 p-4 md:p-0"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="scent"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="scent">Scent Name</FieldLabel>
              <FieldContent>
                <Input {...field} placeholder={label.scent} id="scent" />
              </FieldContent>
              <FieldDescription>
                Enter the scent name to confirm deletion.
              </FieldDescription>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex flex-col-reverse md:flex-row flex-wrap gap-1">
        <Button
          className="md:flex-1"
          variant="ghost"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          className="md:flex-1"
          type="submit"
          variant="destructive"
          disabled={loading || !form.formState.isValid}
        >
          {loading ? (
            <>
              Deleting
              <IconLoader2 className="ml-2 size-3.5 animate-spin" />
            </>
          ) : (
            <>
              Delete Label
              <IconTrash className="ml-2 size-3.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
