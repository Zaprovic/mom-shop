"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { productFormSchema } from "@/schemas";
import { SelectCategoryType } from "@/types";
import TabsListComp from "./_components/tabs-list-comp";
import MobileStepIndicator from "./_components/mobile-step-indicator";
import { createProductAction } from "@/actions/products";
import { useForm } from "react-hook-form";

const formSchema = productFormSchema.omit({
  userId: true,
});

type FormValues = z.infer<typeof formSchema>;

type props = {
  categories: SelectCategoryType[];
};

const CreateProductForm = ({ categories: CATEGORIES }: props) => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  const [activeTab, setActiveTab] = useState("basic");

  const [newImage, setNewImage] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newIngredient, setNewIngredient] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      brand: "",
      mainImage: "",
      description: "",
      discountPercentage: 0,
      images: [],
      benefits: [],
      howToUse: "",
      ingredients: [],
      inStock: true,
      categoryIds: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Navigation between tabs
  const goToNextTab = () => {
    const tabOrder = [
      "basic",
      "description",
      "images",
      "additional",
      "categories",
    ];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const tabOrder = [
      "basic",
      "description",
      "images",
      "additional",
      "categories",
    ];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  const currentImages = form.getValues("images") ?? [];

  // Helper functions for array fields
  const addImage = () => {
    if (newImage.trim()) {
      form.setValue("images", [...currentImages, newImage]);
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index),
    );
  };

  const currentBenefits = form.getValues("benefits") ?? [];

  const addBenefit = () => {
    if (newBenefit.trim()) {
      form.setValue("benefits", [...currentBenefits, newBenefit]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    form.setValue(
      "benefits",
      currentBenefits.filter((_, i) => i !== index),
    );
  };

  const currentIngredients = form.getValues("ingredients") ?? [];

  const addIngredient = () => {
    if (newIngredient.trim()) {
      form.setValue("ingredients", [...currentIngredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    form.setValue(
      "ingredients",
      currentIngredients.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }

      const result = await createProductAction({
        ...data,
        userId: user.id,
      });

      console.log("Server action result:", result);

      if (!result.wasSuccessful) {
        throw new Error(
          "error" in result ? result.error : "Failed to create product",
        );
      }

      toast.success("Producto creado exitosamente", {
        description: "El producto ha sido agregado a tu inventario",
      });

      form.reset();
    } catch (error: any) {
      console.error("Failed to create product:", error);
      toast.error("Error al crear el producto", {
        description: error.message || "Por favor intenta nuevamente",
      });
    }
  };

  return (
    <div className="mx-auto max-h-[80vh] w-full max-w-3xl overflow-y-auto p-3 sm:p-4 md:p-6 lg:max-h-[85vh] lg:max-w-4xl xl:max-w-5xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsListComp activeTab={activeTab} />

            <MobileStepIndicator
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <TabsContent
              value="basic"
              className="space-y-6 pt-2 focus:outline-none"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Nombre*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre del producto"
                          {...field}
                          className="h-12 w-full text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Marca*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Marca del producto"
                          {...field}
                          className="h-12 w-full text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Precio*
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          className="h-12 w-full text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Descuento (%)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="0"
                          className="h-12 w-full text-base"
                          {...field}
                          value={field.value ?? 0}
                        />
                      </FormControl>
                      <FormDescription className="mt-1 text-xs">
                        Valor entre 0-100
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  onClick={goToNextTab}
                  className="w-full text-sm sm:w-auto md:w-auto md:text-base"
                >
                  Siguiente
                </Button>
              </div>
            </TabsContent>

            {/* Description Tab */}
            <TabsContent
              value="description"
              className="space-y-6 pt-2 focus:outline-none"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Descripción*
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción del producto"
                        className="min-h-[150px] w-full resize-none p-3 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="howToUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Modo de uso
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Instrucciones de uso"
                        className="min-h-[150px] w-full p-3 text-base"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription className="mt-1 text-xs">
                      Proporcione instrucciones paso a paso para utilizar este
                      producto
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousTab}
                  className="w-full text-sm sm:w-auto md:w-auto md:text-base"
                >
                  Anterior
                </Button>
                <Button
                  type="button"
                  onClick={goToNextTab}
                  className="w-full text-sm sm:w-auto md:w-auto md:text-base"
                >
                  Siguiente
                </Button>
              </div>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent
              value="images"
              className="space-y-6 pt-2 focus:outline-none"
            >
              <FormField
                control={form.control}
                name="mainImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Imagen principal*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://ejemplo.com/imagen.jpg"
                        {...field}
                        className="h-12 w-full text-base"
                      />
                    </FormControl>
                    <FormDescription className="mt-1 text-xs">
                      URL de la imagen principal
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="mt-6 border-t pt-4">
                <h3 className="mb-3 text-sm font-medium">
                  Imágenes adicionales
                </h3>

                <div className="space-y-3">
                  <Input
                    placeholder="URL de la imagen"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="h-12 w-full text-base"
                  />
                  <Button
                    type="button"
                    onClick={addImage}
                    size="lg"
                    className="w-full"
                  >
                    <Plus className="mr-2 h-5 w-5" /> Añadir imagen
                  </Button>
                </div>

                {(form.watch("images") || []).length > 0 ? (
                  <div className="mt-4 max-h-[180px] space-y-3 overflow-y-auto rounded-md border p-2">
                    {(form.watch("images") || []).map((image, index) => (
                      <div
                        key={index}
                        className="bg-muted flex items-center justify-between rounded-md p-3"
                      >
                        <span className="max-w-[200px] truncate text-sm sm:max-w-[350px]">
                          {image}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeImage(index)}
                          className="h-10 w-10 flex-shrink-0"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-4 text-sm italic">
                    No hay imágenes adicionales
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousTab}
                  className="w-full text-sm sm:w-auto md:w-auto md:text-base"
                >
                  Anterior
                </Button>
                <Button
                  type="button"
                  onClick={goToNextTab}
                  className="w-full text-sm sm:w-auto md:w-auto md:text-base"
                >
                  Siguiente
                </Button>
              </div>
            </TabsContent>

            {/* Additional Information Tab */}
            <TabsContent
              value="additional"
              className="space-y-6 pt-2 focus:outline-none"
            >
              {/* Benefits */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-medium">Beneficios</h3>

                <div className="space-y-3">
                  <Input
                    placeholder="Agregar un beneficio"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="h-12 w-full text-base"
                  />
                  <Button
                    type="button"
                    onClick={addBenefit}
                    size="lg"
                    className="w-full"
                  >
                    <Plus className="mr-2 h-5 w-5" /> Añadir beneficio
                  </Button>
                </div>

                {(form.watch("benefits") || []).length > 0 ? (
                  <div className="mt-4 max-h-[180px] space-y-3 overflow-y-auto rounded-md border p-2">
                    {(form.watch("benefits") || []).map((benefit, index) => (
                      <div
                        key={index}
                        className="bg-muted flex items-center justify-between rounded-md p-3"
                      >
                        <span className="text-sm">{benefit}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBenefit(index)}
                          className="h-10 w-10 flex-shrink-0"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-4 text-sm italic">
                    No hay beneficios añadidos
                  </p>
                )}
              </div>

              {/* Ingredients */}
              <div className="mt-6 space-y-3 border-t pt-4">
                <h3 className="text-sm font-medium">Ingredientes</h3>

                <div className="space-y-3">
                  <Input
                    placeholder="Agregar un ingrediente"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    className="h-12 w-full text-base"
                  />
                  <Button
                    type="button"
                    onClick={addIngredient}
                    size="lg"
                    className="w-full"
                  >
                    <Plus className="mr-2 h-5 w-5" /> Añadir ingrediente
                  </Button>
                </div>

                {(form.watch("ingredients") || []).length > 0 ? (
                  <div className="mt-4 max-h-[180px] space-y-3 overflow-y-auto rounded-md border p-2">
                    {(form.watch("ingredients") || []).map(
                      (ingredient, index) => (
                        <div
                          key={index}
                          className="bg-muted flex items-center justify-between rounded-md p-3"
                        >
                          <span className="text-sm">{ingredient}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeIngredient(index)}
                            className="h-10 w-10 flex-shrink-0"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-4 text-sm italic">
                    No hay ingredientes añadidos
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousTab}
                  className="w-full text-sm sm:w-auto md:w-auto md:text-base"
                >
                  Anterior
                </Button>
                <Button
                  type="button"
                  onClick={goToNextTab}
                  className="w-full text-sm sm:w-auto md:w-auto md:text-base"
                >
                  Siguiente
                </Button>
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent
              value="categories"
              className="space-y-6 pt-2 focus:outline-none"
            >
              <FormField
                control={form.control}
                name="categoryIds"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-sm font-medium">
                        Categorías*
                      </FormLabel>
                      <FormDescription className="mt-1 text-xs">
                        Seleccione al menos una categoría
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 gap-3 rounded-md border p-4">
                      {CATEGORIES.map((category) => (
                        <FormField
                          key={category.id}
                          control={form.control}
                          name="categoryIds"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={category.id}
                                className="hover:bg-muted/50 flex flex-row items-center space-y-0 space-x-3 rounded-md p-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(category.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            category.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (id) => id !== category.id,
                                            ),
                                          );
                                    }}
                                    className="h-5 w-5"
                                  />
                                </FormControl>
                                <FormLabel className="cursor-pointer text-base font-normal">
                                  {category.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="mt-2 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="mt-6 flex flex-row items-center space-y-0 space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer text-base font-medium">
                        Disponible
                      </FormLabel>
                      <FormDescription className="text-sm">
                        ¿Está disponible para compra?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousTab}
                  className="w-full text-sm sm:w-auto md:w-auto md:text-base"
                >
                  Anterior
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-sm sm:w-auto md:w-auto md:text-base"
                >
                  {isSubmitting ? "Creando..." : "Crear Producto"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default CreateProductForm;
