"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { productFormSchema } from "@/schemas";
import { SelectCategoryType } from "@/types";
import TabsListComp from "./_components/tabs-list-comp";
import MobileStepIndicator from "./_components/mobile-step-indicator";
import { createProductAction } from "@/actions/products";

// Import tab components
import BasicInfoTab from "./_components/tabs/basic-info-tab";
import DescriptionTab from "./_components/tabs/description-tab";
import ImagesTab from "./_components/tabs/images-tab";
import AdditionalInfoTab from "./_components/tabs/additional-info-tab";
import CategoriesTab from "./_components/tabs/categories-tab";

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

  const onSubmit = async (data: FormValues) => {
    try {
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }

      const result = await createProductAction({
        ...data,
        userId: user.id,
      });

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
              <BasicInfoTab form={form} goToNextTab={goToNextTab} />
            </TabsContent>

            <TabsContent
              value="description"
              className="space-y-6 pt-2 focus:outline-none"
            >
              <DescriptionTab
                form={form}
                goToNextTab={goToNextTab}
                goToPreviousTab={goToPreviousTab}
              />
            </TabsContent>

            <TabsContent
              value="images"
              className="space-y-6 pt-2 focus:outline-none"
            >
              <ImagesTab
                form={form}
                goToNextTab={goToNextTab}
                goToPreviousTab={goToPreviousTab}
              />
            </TabsContent>

            <TabsContent
              value="additional"
              className="space-y-6 pt-2 focus:outline-none"
            >
              <AdditionalInfoTab
                form={form}
                goToNextTab={goToNextTab}
                goToPreviousTab={goToPreviousTab}
              />
            </TabsContent>

            <TabsContent
              value="categories"
              className="space-y-6 pt-2 focus:outline-none"
            >
              <CategoriesTab
                form={form}
                categories={CATEGORIES}
                goToPreviousTab={goToPreviousTab}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default CreateProductForm;
