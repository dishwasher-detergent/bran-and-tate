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
import { labelSchema, type LabelFormData } from "@/lib/label/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Page() {
  const [open, setOpen] = useState(false);

  const form = useForm<LabelFormData>({
    resolver: zodResolver(labelSchema),
    defaultValues: {
      company: "Bran & Tate",
      type: "Soy Wax Candles",
      scent: "Candles Scent",
      notesOf: "Notes of good smells.",
      location: "Alva, Ok",
    },
    mode: "onChange",
  });

  const labelData = form.watch();

  const formContent = (
    <form className="grid gap-4">
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
    <div className="min-h-screen">
      <div className="hidden lg:block container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Candle Label Designer</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-1 bg-foreground/10 ring-1 ring-foreground/20 gap-1">
              <Card>
                <CardHeader>
                  <CardTitle>Label Details</CardTitle>
                </CardHeader>
                <CardContent>{formContent}</CardContent>
              </Card>
              <CardContent className="p-0 flex flex-row justify-end">
                <Button>Create</Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 items-end">
            <LabelPreview data={labelData} />
            <LabelPreview data={labelData} size="1.25x3.75" />
          </div>
        </div>
      </div>

      <div className="lg:hidden min-h-screen flex flex-col">
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
              {formContent}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
