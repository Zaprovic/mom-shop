"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { insertCategorySchema } from "@/schemas";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import { insertCategoryAction } from "@/actions/categories";
import { Loader2Icon } from "lucide-react";

const formSchema = insertCategorySchema.omit({
  userId: true,
});

const CategoryCreationForm = () => {
  // Initialize the form
  const { getUser, isLoading } = useKindeBrowserClient();
  const user = getUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isActive: true,
    },
  });

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    const newVals = {
      ...values,
      userId: user.id,
    };
    const response = await insertCategoryAction(newVals);

    if ("error" in response) {
      toast.error("Error al crear la categoría");
    }

    toast.success(
      `Categoría: '${newVals.name.trim().toUpperCase()}' creada con éxito`,
      {
        className: "bg-emerald-500 text-white",
      },
    );

    form.reset();
  };

  if (isLoading) {
    return (
      <Skeleton className="h-60 w-full rounded-md">
        <div className="flex items-center justify-between">
          <Skeleton className="h-60 w-full rounded-md" />
        </div>
      </Skeleton>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground text-sm">
          Agrega una nueva categoría para organizar tus productos
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de categoría</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ej. Electrónicos, Ropa, Libros"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Este es el nombre que se mostrará para esta categoría.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? true}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Activa</FormLabel>
                  <FormDescription>
                    Esta categoría estará disponible para asignar productos si
                    está activa.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              "Crear categoría"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryCreationForm;
