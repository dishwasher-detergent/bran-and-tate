"use client";

import { LabelPreview } from "@/components/label-preview";
import { DownloadLabel } from "@/components/label/download-label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getLabelById, updateLabel } from "@/lib/db";
import { labelSchema, type LabelFormData } from "@/lib/db/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditLabelFormProps {
  labelId: string;
}

export function EditLabelForm({ labelId }: EditLabelFormProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<LabelFormData>({
    resolver: zodResolver(labelSchema),
    defaultValues: {
      company: "",
      type: "",
      scent: "",
      notesOf: "",
      location: "",
    },
    mode: "onChange",
  });

  const labelData = form.watch();

  useEffect(() => {
    const loadLabel = async () => {
      try {
        const result = await getLabelById(labelId);
        if (result.success && result.data) {
          form.reset({
            company: result.data.company,
            type: result.data.type,
            scent: result.data.scent,
            notesOf: result.data.notesOf,
            location: result.data.location,
          });
        } else {
          toast.error("Failed to load label");
          router.push("/app");
        }
      } catch {
        toast.error("An error occurred while loading the label");
        router.push("/app");
      }
    };

    loadLabel();
  }, [labelId, form, router]);

  const onSubmit = async (data: LabelFormData) => {
    setIsUpdating(true);
    try {
      const result = await updateLabel({ id: labelId, data });

      if (result.success) {
        toast.success("Label updated successfully!");
        setOpen(false);
        router.push("/app");
      } else {
        toast.error(result.message || "Failed to update label");
      }
    } catch {
      toast.error("An error occurred while updating the label");
    } finally {
      setIsUpdating(false);
    }
  };

  const formFields = (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <FieldGroup>
        <Controller
          control={form.control}
          name="company"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="company">Company Name</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id="company"
                  placeholder="e.g., Bran & Tate"
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
          name="type"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="type">Product Type</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id="type"
                  placeholder="e.g., Soy Wax Candles"
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
          name="scent"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">Candle Scent</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id="name"
                  placeholder="e.g., A Winters Morning"
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
          name="notesOf"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="notes">Notes Of</FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id="notes"
                  placeholder="e.g., Bergamot, Clove, Vanilla, and Patchouli."
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
          name="location"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="location">Handmade Location</FieldLabel>
              <FieldContent>
                <Input {...field} id="location" placeholder="e.g., Alva, Ok" />
              </FieldContent>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );

  return (
    <>
      <div className="grid-cols-1 lg:grid-cols-2 gap-8 hidden lg:grid">
        <div className="space-y-6">
          <Card className="p-1 bg-foreground/10 ring-1 ring-foreground/20 gap-1">
            <Card>
              <CardHeader>
                <CardTitle>Edit Label</CardTitle>
              </CardHeader>
              <CardContent>{formFields}</CardContent>
            </Card>
            <div className="flex gap-2">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isUpdating || !form.formState.isValid}
                className="flex-1"
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
              <DownloadLabel data={labelData} />
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-4 items-end">
          <LabelPreview data={labelData} size="2x4" responsive />
          <LabelPreview data={labelData} size="1.25x3.75" responsive />
        </div>
      </div>
      <div className="lg:hidden flex flex-col">
        <div className="flex-1 p-4 overflow-auto pb-24">
          <h1 className="text-2xl font-bold mb-6">Edit Label</h1>
          <div className="flex flex-col gap-4 items-start">
            <LabelPreview data={labelData} size="2x4" responsive />
            <LabelPreview data={labelData} size="1.25x3.75" responsive />
          </div>
        </div>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              className="fixed bottom-4 right-4 z-40 rounded-full h-14 w-14 shadow-lg"
              size="icon"
            >
              <IconPencil className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit Label Details</DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto max-h-[60vh] px-4 pb-4">
              {formFields}
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isUpdating || !form.formState.isValid}
                  className="flex-1"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </Button>
                <DownloadLabel data={labelData} />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
