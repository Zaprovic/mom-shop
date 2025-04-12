import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectCategoryType } from "@/types";
import { UseFormReturn } from "react-hook-form";

type CategoriesTabProps = {
  form: UseFormReturn<any>;
  categories: SelectCategoryType[];
  goToPreviousTab: () => void;
  isSubmitting: boolean;
};

const CategoriesTab = ({
  form,
  categories,
  goToPreviousTab,
  isSubmitting,
}: CategoriesTabProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="categoryIds"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-sm font-medium">Categorías*</FormLabel>
              <FormDescription className="mt-1 text-xs">
                Seleccione al menos una categoría
              </FormDescription>
            </div>
            <div className="grid grid-cols-1 gap-3 rounded-md border p-4">
              {categories.map((category) => (
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
                                ? field.onChange([...field.value, category.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (id: number) => id !== category.id,
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
    </>
  );
};

export default CategoriesTab;
