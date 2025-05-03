import './App.css';
import Product from './components/product';
import { useState, useEffect } from 'react';

// UI components from shadcn
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Icon for clearing the search input
import { X } from 'lucide-react';

// Import product data from a local JSON file
import produktData from './data/products.json';

// Type definition for a product category
type ProductCategory = {
  title: string;
  key: string;
  produkte: string[];
};

// Parse the JSON into typed product categories
const categories: ProductCategory[] = produktData;

function App() {
  
  // State for the shopping list (array of product names)
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  // State for the current search input
  const [searchTerm, setSearchTerm] = useState<string>('');

  // State for currently open accordion sections
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  // State for user-defined (custom) products
  const [customProducts, setCustomProducts] = useState<string[]>([]);

  // Adds a product to the shopping list if not already present
  const addToShoppingList = (productName: string) => {
    if (!shoppingList.includes(productName)) {
      setShoppingList([...shoppingList, productName]);
    }
  };

  // Removes a product from the shopping list
  const removeFromShoppingList = (productName: string) => {
    const updatedList = shoppingList.filter((existingProduct) => existingProduct !== productName);
    setShoppingList(updatedList);
  };

  // Checks if a product name exists in either predefined categories or custom products
  const productExists = (name: string): boolean => {
    const inCategories = categories.some(kat => kat.produkte.some(p => p.toLowerCase() === name.toLowerCase()));
    const inCustom = customProducts.some(p => p.toLowerCase() === name.toLowerCase());
    return inCategories || inCustom;
  };

  // True if the search term is not yet in the list of known products
  const isNewProduct = searchTerm.trim() !== '' && !productExists(searchTerm.trim());

  // Effect: Automatically opens matching categories when the search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setOpenAccordions([]);
      return;
    }

    // Find all category keys with products that match the search term
    const matchingKeys = categories
      .filter(category => category.produkte.some(productName =>
        productName.toLowerCase().startsWith(searchTerm.toLowerCase())
      ))
      .map(category => category.key);

      // Add custom section if custom products match the search
      if (customProducts.some(p => p.toLowerCase().startsWith(searchTerm.toLowerCase()))) {
        matchingKeys.push('eigene-produkte');
    }

    setOpenAccordions(matchingKeys);
  }, [searchTerm, customProducts]);

  return (
    <>
      {/* Header for the shopping list */}
      <p className='text-red-600'>Einkaufsliste</p>
      <p className="text-gray-500 italic mt-2">
        {shoppingList.length === 0 && 'Leer'}
      </p>
      {/* Render the current shopping list */}
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

      {/* Section header for available products */}
      <p className="mt-10 mb-4 text-red-600">Produkte</p>

      {/* Search input and "New" button */}
      <div className="flex items-center gap-2">
        <div className="relative" style={{ width: "335px" }}>
          <Input
            type="text"
            placeholder="Produkt suchen..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="text-xl pr-10"
          />
          {/* Clear button for search input */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Eingabe löschen"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {/* Button to add a new custom product */}
        <Button
          disabled={!isNewProduct}
          onClick={() => {
            if (isNewProduct) {
              setCustomProducts([...customProducts, searchTerm.trim()]);
              setOpenAccordions(prev => [...new Set([...prev, 'eigene-produkte'])]);
            }
          }}
        >
          Neu
        </Button>
      </div>

      {/* Accordion displaying both default and custom product categories */}
      <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="border-none">
        {/* Custom products section */}
        {customProducts.length > 0 && (
          <AccordionItem key="eigene-produkte" value="eigene-produkte" className="border-none">
            <AccordionTrigger className="accordion-trigger mt-2 font-bold text-xl">
              Eigene Produkte
            </AccordionTrigger>
            <AccordionContent>
              <ul className="product-list">
                {customProducts.filter((productName) =>
                  productName.toLowerCase().startsWith(searchTerm.toLowerCase())
                ).map((productName, index) => (
                  <Product
                    key={`eigene-${index}`}
                    name={productName}
                    onAction={() => addToShoppingList(productName)}
                    isAdded={shoppingList.includes(productName)}
                  />
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Render all categories from JSON data */}
        {categories.map(({ title, key, produkte }) => {
          const filteredProducts = produkte.filter((productName) =>
            productName.toLowerCase().startsWith(searchTerm.toLowerCase())
          );

          if (searchTerm.trim() !== '' && filteredProducts.length === 0) {
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

export default App;
