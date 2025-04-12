import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import ArrayField from "../array-field";

type AdditionalInfoTabProps = {
  form: UseFormReturn<any>;
  goToNextTab: () => void;
  goToPreviousTab: () => void;
};

const AdditionalInfoTab = ({
  form,
  goToNextTab,
  goToPreviousTab,
}: AdditionalInfoTabProps) => {
  return (
    <>
      {/* Benefits */}
      <ArrayField
        form={form}
        fieldName="benefits"
        label="Beneficios"
        placeholder="Agregar un beneficio"
        emptyMessage="No hay beneficios añadidos"
      />

      {/* Ingredients */}
      <div className="mt-6 border-t pt-4">
        <ArrayField
          form={form}
          fieldName="ingredients"
          label="Ingredientes"
          placeholder="Agregar un ingrediente"
          emptyMessage="No hay ingredientes añadidos"
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

export default AdditionalInfoTab;
