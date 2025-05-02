import './App.css';
import Product from './components/product';
import { useState, useEffect } from 'react';

// ui.shadcn components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { X } from 'lucide-react';

// Produktdaten importieren
import produktDaten from './data/products.json';

type ProduktKategorie = {
  title: string;
  key: string;
  produkte: string[];
};

const categories: ProduktKategorie[] = produktDaten;

function App() {
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [eigeneProdukte, setEigeneProdukte] = useState<string[]>([]);

  const addToShoppingList = (productName: string) => {
    if (!shoppingList.includes(productName)) {
      setShoppingList([...shoppingList, productName]);
    }
  };

  const removeFromShoppingList = (productName: string) => {
    const updatedList = shoppingList.filter((existingProduct) => existingProduct !== productName);
    setShoppingList(updatedList);
  };

  const productExists = (name: string): boolean => {
    const inKategorien = categories.some(kat => kat.produkte.some(p => p.toLowerCase() === name.toLowerCase()));
    const inEigene = eigeneProdukte.some(p => p.toLowerCase() === name.toLowerCase());
    return inKategorien || inEigene;
  };

  const isNewProduct = searchTerm.trim() !== '' && !productExists(searchTerm.trim());

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setOpenAccordions([]);
      return;
    }

    const matchingKeys = categories
      .filter(category => category.produkte.some(productName =>
        productName.toLowerCase().startsWith(searchTerm.toLowerCase())
      ))
      .map(category => category.key);

    if (eigeneProdukte.some(p => p.toLowerCase().startsWith(searchTerm.toLowerCase()))) {
      matchingKeys.push('eigene-produkte');
    }

    setOpenAccordions(matchingKeys);
  }, [searchTerm, eigeneProdukte]);

  return (
    <>
      <p className='text-red-600'>Einkaufsliste</p>
      <p className="text-gray-500 italic mt-2">
        {shoppingList.length === 0 && 'Leer'}
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
              onClick={() => setSearchTerm('')}
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
              setEigeneProdukte([...eigeneProdukte, searchTerm.trim()]);
              setOpenAccordions(prev => [...new Set([...prev, 'eigene-produkte'])]);
            }
          }}
        >
          Neu
        </Button>
      </div>

      <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="border-none">
        {eigeneProdukte.length > 0 && (
          <AccordionItem key="eigene-produkte" value="eigene-produkte" className="border-none">
            <AccordionTrigger className="accordion-trigger mt-2 font-bold text-xl">
              Eigene Produkte
            </AccordionTrigger>
            <AccordionContent>
              <ul className="product-list">
                {eigeneProdukte.filter((productName) =>
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
