import "../App.css";
import Product from "../components/product";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

// UI components from shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Icon for clearing the search input
import { X } from "lucide-react";

// Import product data from a local JSON file
import produktData from "../data/products.json";

// Type definition for a product category
type ProductCategory = {
  title: string;
  key: string;
  produkte: string[];
};

const categories: ProductCategory[] = produktData;

function ShoppingListPage() {
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [customProducts, setCustomProducts] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // 👈

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      const { data, error } = await supabase
        .from("user_data")
        .select("custom_products, shopping_list")
        .eq("id", user.user.id)
        .single();

      if (data) {
        setCustomProducts(data.custom_products || []);
        setShoppingList(data.shopping_list || []);
      } else if (error?.code === "PGRST116") {
        await supabase.from("user_data").insert({
          id: user.user.id,
          custom_products: [],
          shopping_list: [],
        });
      }

      setIsLoaded(true); // 👈 jetzt darf gespeichert werden
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const saveShoppingList = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;
      await supabase
        .from("user_data")
        .update({ shopping_list: shoppingList })
        .eq("id", user.user.id);
    };
    saveShoppingList();
  }, [shoppingList, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const saveCustomProducts = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;
      await supabase
        .from("user_data")
        .update({ custom_products: customProducts })
        .eq("id", user.user.id);
    };
    saveCustomProducts();
  }, [customProducts, isLoaded]);

  const addToShoppingList = (productName: string) => {
    if (!shoppingList.includes(productName)) {
      setShoppingList([...shoppingList, productName]);
    }
  };

  const removeFromShoppingList = (productName: string) => {
    const updatedList = shoppingList.filter(
      (existingProduct) => existingProduct !== productName
    );
    setShoppingList(updatedList);
  };

  const productExists = (name: string): boolean => {
    const inCategories = categories.some((kat) =>
      kat.produkte.some((p) => p.toLowerCase() === name.toLowerCase())
    );
    const inCustom = customProducts.some(
      (p) => p.toLowerCase() === name.toLowerCase()
    );
    return inCategories || inCustom;
  };

  const isNewProduct =
    searchTerm.trim() !== "" && !productExists(searchTerm.trim());

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setOpenAccordions([]);
      return;
    }

    const matchingKeys = categories
      .filter((category) =>
        category.produkte.some((productName) =>
          productName.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      )
      .map((category) => category.key);

    if (
      customProducts.some((p) =>
        p.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    ) {
      matchingKeys.push("eigene-produkte");
    }

    setOpenAccordions(matchingKeys);
  }, [searchTerm, customProducts]);

  return (
    <>
      <p className="text-red-600">Einkaufsliste</p>
      <p className="text-gray-500 italic mt-2">
        {shoppingList.length === 0 && "Leer"}
      </p>
      <ul className="product-list">
        {shoppingList.map((productName, index) => (
          <Product
            key={index}
            name={productName}
            onAction={() => removeFromShoppingList(productName)}
            isAdded={true}
          />
        ))}
      </ul>

      <p className="mt-10 mb-4 text-red-600">Produkte</p>

      <div className="flex items-center gap-2">
        <div className="relative" style={{ width: "335px" }}>
          <Input
            type="text"
            placeholder="Produkt suchen..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="text-xl pr-10"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Eingabe löschen"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <Button
          disabled={!isNewProduct}
          onClick={() => {
            if (isNewProduct) {
              setCustomProducts((prevCustomProducts) => [
                ...prevCustomProducts,
                searchTerm.trim(),
              ]);
              setOpenAccordions((prev) => [
                ...new Set([...prev, "eigene-produkte"]),
              ]);
            }
          }}
        >
          Neu
        </Button>
      </div>

      <Accordion
        type="multiple"
        value={openAccordions}
        onValueChange={setOpenAccordions}
        className="border-none"
      >
        {customProducts.length > 0 && (
          <AccordionItem
            key="eigene-produkte"
            value="eigene-produkte"
            className="border-none"
          >
            <AccordionTrigger className="accordion-trigger mt-2 font-bold text-xl">
              Eigene Produkte
            </AccordionTrigger>
            <AccordionContent>
              <ul className="product-list">
                {customProducts
                  .filter((productName) =>
                    productName
                      .toLowerCase()
                      .startsWith(searchTerm.toLowerCase())
                  )
                  .map((productName, index) => (
                    <div
                      key={`eigene-${index}`}
                      className="relative flex items-center pb-2 mb-2"
                    >
                      <Product
                        name={productName}
                        onAction={() => addToShoppingList(productName)}
                        isAdded={shoppingList.includes(productName)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCustomProducts((prev) =>
                            prev.filter((p) => p !== productName)
                          );
                          setShoppingList((prev) =>
                            prev.filter((p) => p !== productName)
                          );
                        }}
                        className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
                        aria-label={`Remove ${productName}`}
                      >
                        <X size={18} className="mt-3.5 mr-2" />
                      </button>
                    </div>
                  ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {categories.map(({ title, key, produkte }) => {
          const filteredProducts = produkte.filter((productName) =>
            productName.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
          if (searchTerm.trim() !== "" && filteredProducts.length === 0) {
            return null;
          }

          return (
            <AccordionItem key={key} value={key} className="border-none">
              <AccordionTrigger className="accordion-trigger mt-2 font-bold text-xl">
                {title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="product-list">
                  {filteredProducts.map((productName, index) => (
                    <Product
                      key={index}
                      name={productName}
                      onAction={() => addToShoppingList(productName)}
                      isAdded={shoppingList.includes(productName)}
                    />
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}

export default ShoppingListPage;
