import React, { Dispatch, SetStateAction } from "react";

type props = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

const MobileStepIndicator = ({ activeTab, setActiveTab }: props) => {
  return (
    <div className="mb-6 md:hidden">
      <div className="mb-2 text-lg font-medium">
        {activeTab === "basic" && "Información Básica"}
        {activeTab === "description" && "Descripción"}
        {activeTab === "images" && "Imágenes"}
        {activeTab === "additional" && "Información Adicional"}
        {activeTab === "categories" && "Categorías"}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-muted-foreground flex space-x-1 text-xs">
          {["basic", "description", "images", "additional", "categories"].map(
            (step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => setActiveTab(step)}
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  activeTab === step
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {index + 1}
              </button>
            ),
          )}
        </div>
        <div className="text-muted-foreground text-xs">
          Paso{" "}
          {[
            "basic",
            "description",
            "images",
            "additional",
            "categories",
          ].indexOf(activeTab) + 1}{" "}
          de 5
        </div>
      </div>
    </div>
  );
};

export default MobileStepIndicator;
