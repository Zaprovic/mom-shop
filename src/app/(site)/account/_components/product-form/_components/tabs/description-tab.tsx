import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

type DescriptionTabProps = {
  form: UseFormReturn<any>;
  goToNextTab: () => void;
  goToPreviousTab: () => void;
};

const DescriptionTab = ({
  form,
  goToNextTab,
  goToPreviousTab,
}: DescriptionTabProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Descripción*</FormLabel>
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
            <FormLabel className="text-sm font-medium">Modo de uso</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Instrucciones de uso"
                className="min-h-[150px] w-full p-3 text-base"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormDescription className="mt-1 text-xs">
              Proporcione instrucciones paso a paso para utilizar este producto
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
    </>
  );
};

export default DescriptionTab;
