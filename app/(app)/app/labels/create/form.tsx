"use client";

import { LabelPreview } from "@/components/label-preview";
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
import { createLabel } from "@/lib/db";
import { labelSchema, type LabelFormData } from "@/lib/db/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function CreateLabelForm() {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<LabelFormData>({
    resolver: zodResolver(labelSchema),
    defaultValues: {
      company: "Bran & Tate",
      type: "Soy Wax Candles",
      scent: "",
      notesOf: "",
      location: "Alva, Ok",
    },
    mode: "onChange",
  });

  const labelData = form.watch();

  const onSubmit = async (data: LabelFormData) => {
    setIsCreating(true);
    try {
      const result = await createLabel({ data });

      if (result.success) {
        toast.success("Label created successfully!");
        form.reset({
          company: "Bran & Tate",
          type: "Soy Wax Candles",
          scent: "",
          notesOf: "",
          location: "Alva, Ok",
        });
        setOpen(false);
      } else {
        toast.error(result.message || "Failed to create label");
      }
    } catch {
      toast.error("An error occurred while creating the label");
    } finally {
      setIsCreating(false);
    }
  };

  const formContent = (
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
                <CardTitle>Label Details</CardTitle>
              </CardHeader>
              <CardContent>{formContent}</CardContent>
            </Card>
            <CardContent className="p-0 flex flex-row justify-end">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isCreating || !form.formState.isValid}
              >
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4 items-end">
          <LabelPreview data={labelData} size="2x4" responsive />
          <LabelPreview data={labelData} size="1.25x3.75" responsive />
        </div>
      </div>
      <div className="lg:hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Candle Label Designer</h1>
          <div className="flex flex-col gap-4 items-start">
            <LabelPreview data={labelData} size="2x4" responsive />
            <LabelPreview data={labelData} size="1.25x3.75" responsive />
          </div>
        </div>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              className="fixed bottom-6 right-6 z-40 rounded-full h-12 w-12 shadow-lg"
              size="icon"
            >
              <IconPencil className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit Label Details</DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto max-h-[60vh] px-4 pb-4">
              {formContent}
              <Button
                className="w-full mt-4"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isCreating || !form.formState.isValid}
              >
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
