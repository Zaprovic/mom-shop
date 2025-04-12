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
import ArrayField from "../array-field";

type ImagesTabProps = {
  form: UseFormReturn<any>;
  goToNextTab: () => void;
  goToPreviousTab: () => void;
};

const ImagesTab = ({ form, goToNextTab, goToPreviousTab }: ImagesTabProps) => {
  return (
    <>
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
        <ArrayField
          form={form}
          fieldName="images"
          label="Imágenes adicionales"
          placeholder="URL de la imagen"
          emptyMessage="No hay imágenes adicionales"
        />
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
    </>
  );
};

export default ImagesTab;
