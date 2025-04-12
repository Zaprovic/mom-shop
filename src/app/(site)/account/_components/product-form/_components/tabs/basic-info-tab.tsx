import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type BasicInfoTabProps = {
  form: UseFormReturn<any>;
  goToNextTab: () => void;
};

const BasicInfoTab = ({ form, goToNextTab }: BasicInfoTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Nombre*</FormLabel>
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
              <FormLabel className="text-sm font-medium">Marca*</FormLabel>
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
              <FormLabel className="text-sm font-medium">Precio*</FormLabel>
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
    </>
  );
};

export default BasicInfoTab;
