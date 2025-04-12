import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type props = {
  activeTab: string;
};

const TabsListComp = ({ activeTab }: props) => {
  return (
    <div className="hidden md:block">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-muted-foreground text-lg font-medium">
          {activeTab === "basic" && "Información Básica"}
          {activeTab === "description" && "Descripción"}
          {activeTab === "images" && "Imágenes"}
          {activeTab === "additional" && "Información Adicional"}
          {activeTab === "categories" && "Categorías"}
        </h2>
        <div className="text-muted-foreground text-sm">
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
      <TabsList className="mb-6 h-auto w-full bg-transparent">
        <TabsTrigger value="basic" className="px-3 py-2 text-sm">
          Básico
        </TabsTrigger>
        <TabsTrigger value="description" className="px-3 py-2 text-sm">
          Descripción
        </TabsTrigger>
        <TabsTrigger value="images" className="px-3 py-2 text-sm">
          Imágenes
        </TabsTrigger>
        <TabsTrigger value="additional" className="px-3 py-2 text-sm">
          Adicional
        </TabsTrigger>
        <TabsTrigger value="categories" className="px-3 py-2 text-sm">
          Categorías
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default TabsListComp;
