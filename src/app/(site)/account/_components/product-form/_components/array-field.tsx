import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type ArrayFieldProps = {
  form: UseFormReturn<any>;
  fieldName: string;
  label: string;
  placeholder: string;
  emptyMessage: string;
};

const ArrayField = ({
  form,
  fieldName,
  label,
  placeholder,
  emptyMessage,
}: ArrayFieldProps) => {
  const [newValue, setNewValue] = useState("");
  const currentValues = form.watch(fieldName) || [];

  const addItem = () => {
    if (newValue.trim()) {
      form.setValue(fieldName, [...currentValues, newValue]);
      setNewValue("");
    }
  };

  const removeItem = (index: number) => {
    form.setValue(
      fieldName,
      currentValues.filter((_: unknown, i: number) => i !== index),
    );
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">{label}</h3>

      <div className="space-y-3">
        <Input
          placeholder={placeholder}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="h-12 w-full text-base"
        />
        <Button type="button" onClick={addItem} size="lg" className="w-full">
          <Plus className="mr-2 h-5 w-5" /> Añadir {label.toLowerCase()}
        </Button>
      </div>

      {currentValues.length > 0 ? (
        <div className="mt-4 max-h-[180px] space-y-3 overflow-y-auto rounded-md border p-2">
          {currentValues.map((item: string, index: number) => (
            <div
              key={index}
              className="bg-muted flex items-center justify-between rounded-md p-3"
            >
              <span className="max-w-[200px] truncate text-sm sm:max-w-[350px]">
                {item}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
                className="h-10 w-10 flex-shrink-0"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-4 text-sm italic">
          {emptyMessage}
        </p>
      )}
    </div>
  );
};

export default ArrayField;
