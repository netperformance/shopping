import './App.css';
import Product from './components/product';
import { useState, useEffect } from 'react'; // useEffect ergänzt

// ui.shadcn components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function App() {
  // React-Zustand: aktuelle Einkaufsliste (array of strings)
  // useState ist ein Hook, der es uns ermöglicht, den Zustand einer Komponente zu verwalten
  // useState gibt ein Array mit zwei Werten zurück: dem aktuellen Zustand und einer Funktion, um den Zustand zu aktualisieren
  // shoppingList ist der aktuelle Zustand (initial leer)
  // setShoppingList ist die Funktion, um den Zustand zu aktualisieren
  // useState<string[]> gibt an, dass der Zustand ein Array von Strings ist
  // () gibt denb initialen Wert an, der in diesem Fall ein leeres Array ist d.h. ([])
  // useState(...) wird einmal beim ersten Rendern (also beim Initialisieren) einer Komponente aufgerufen
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  // Suchtext für die Produktliste
  const [searchTerm, setSearchTerm] = useState<string>(''); // leere Eingabe zum Start

  // Zustand für aktuell geöffnete Accordions (mehrere gleichzeitig möglich)
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  // Zustand für eigene Produkte
  const [eigeneProdukte, setEigeneProdukte] = useState<string[]>([]);

  // Produkt zur Einkaufsliste hinzufügen, falls noch nicht vorhanden
  const addToShoppingList = (productName: string) => {
    if (!shoppingList.includes(productName)) {
      setShoppingList([...shoppingList, productName]);
    }
  };

  // Produkt aus der Einkaufsliste entfernen
  // filtert alle Produkte heraus, die nicht dem zu entfernenden entsprechen
  // filter ist eine Funktion und erwartet genau ein Argument
  // das Argument ist eine Funktion, die für jedes Element im Array aufgerufen wird
  // und true zurückgibt, wenn das Element im Array bleiben soll
  // das Ergebnis ist ein neues Array, das alle Elemente enthält, die true zurückgegeben haben
  // und alle Elemente entfernt, die false zurückgegeben haben
  // das Ergebnis wird in updatedList gespeichert
  // und dann in setShoppingList gespeichert
  // existingProduct ist ein Funktionsparameter – also der Platzhalter für jedes Element, das filter() durchläuft.
  // filter(...) ruft deine Funktion einmal für jedes Element im Array auf
  // existingProduct ist jedes Mal ein neuer Wert (z. B. 'Eier', dann 'Milch', dann 'Sahne' …)
  // Wenn die Funktion true zurückgibt, dann wird dieses Element in das neue Array übernommen
  // Wenn die Funktion false zurückgibt, dann wird dieses Element nicht in das neue Array übernommen
  const removeFromShoppingList = (productName: string) => {
    const updatedList = shoppingList.filter((existingProduct) => existingProduct !== productName);
    setShoppingList(updatedList);
  };

  // Vordefinierte Produktlisten
  const kategorien = [
    { 
      title: "Grundnahrungsmittel", 
      key: "item-0", 
      produkte: [
        'Mehl',
        'Weizenmehl',
        'Dinkelmehl',
        'Roggenmehl',
        'Maismehl',
        'Reismehl',
        'Buchweizenmehl',
        'Speisestärke',
        'Kartoffelstärke',
        'Maisstärke',
        'Zucker',
        'Rohrohrzucker',
        'Brauner Zucker',
        'Puderzucker',
        'Honig',
        'Agavendicksaft',
        'Ahornsirup',
        'Reissirup',
        'Salz',
        'Meersalz',
        'Reis',
        'Basmatireis',
        'Jasminreis',
        'Vollkornreis',
        'Risottoreis',
        'Milchreis',
        'Couscous',
        'Bulgur',
        'Polenta',
        'Grieß',
        'Nudeln',
        'Spaghetti',
        'Penne',
        'Fusilli',
        'Tagliatelle',
        'Makkaroni',
        'Lasagneplatten',
        'Glasnudeln',
        'Eiernudeln',
        'Linsen',
        'Rote Linsen',
        'Grüne Linsen',
        'Berglinsen',
        'Kichererbsen',
        'Weiße Bohnen',
        'Kidneybohnen',
        'Bohnen (getrocknet)',
        'Haferflocken',
        'Müsli',
        'Cornflakes',
        'Paniermehl',
        'Semmelbrösel',
        'Hefe',
        'Trockenhefe',
        'Backpulver',
        'Natron',
        'Vanillezucker',
        'Vanilleschote',
        'Puddingpulver',
        'Gelatine',
        'Backkakao',
        'Schokostreusel',
        'Kokosraspel',
        'Kokosmilch',
        'Tomatenmark',
        'Passierte Tomaten',
        'Tomaten in Stücken',
        'Tomatensauce',
        'Brühe (Würfel)',
        'Gemüsebrühe',
        'Hühnerbrühe',
        'Rinderbrühe',
        'Suppenwürze',
        'Instant-Suppen',
        'Fertigsaucen',
        'Sojasauce',
        'Worcestersauce',
        'Tabasco',
        'Sonnenblumenöl',
        'Rapsöl',
        'Olivenöl',
        'Leinöl',
        'Essig',
        'Weißweinessig',
        'Apfelessig',
        'Balsamicoessig',
        'Senf',
        'Ketchup',
        'Mayonnaise',
        'Erdnussbutter',
        'Marmelade',
        'Konfitüre',
        'Fruchtaufstrich',
        'Nuss-Nougat-Creme',
        'Trockenfrüchte',
        'Rosinen',
        'Datteln',
        'Feigen',
        'Aprikosen (getrocknet)',
        'Pflaumen (getrocknet)',
        'Cranberries (getrocknet)',
        'Nüsse',
        'Mandeln',
        'Walnüsse',
        'Haselnüsse',
        'Cashewkerne',
        'Pistazien',
        'Erdnüsse',
        'Samen',
        'Chiasamen',
        'Leinsamen',
        'Sesam',
        'Sonnenblumenkerne',
        'Kürbiskerne',
        'Mohn',
        'Instantkaffee',
        'Filterkaffee',
        'Kaffeebohnen',
        'Espresso',
        'Kaffee (Pads)',
        'Kaffee (Kapseln)',
        'Kakaopulver',
        'Trinkschokolade',
        'Malzkaffee',
        'Tee',
        'Schwarztee',
        'Grüntee',
        'Kräutertee',
        'Früchtetee',
        'Gewürze allgemein'
      ]
    },
    { title: "Obst & Gemüse", key: "item-1", produkte: [
      'Apfel',
      'Birne',
      'Banane',
      'Orange',
      'Mandarine',
      'Zitrone',
      'Limette',
      'Grapefruit',
      'Kiwi',
      'Ananas',
      'Mango',
      'Papaya',
      'Kaki',
      'Granatapfel',
      'Weintrauben',
      'Erdbeere',
      'Himbeere',
      'Brombeere',
      'Johannisbeere',
      'Heidelbeere',
      'Pfirsich',
      'Nektarine',
      'Aprikose',
      'Pflaume',
      'Zwetschge',
      'Melone',
      'Wassermelone',
      'Honigmelone',
      'Tomate',
      'Gurke',
      'Paprika',
      'Zucchini',
      'Aubergine',
      'Karotte',
      'Möhre',
      'Rote Bete',
      'Radieschen',
      'Rettich',
      'Pastinake',
      'Sellerie',
      'Knollensellerie',
      'Stangensellerie',
      'Lauch',
      'Porree',
      'Zwiebel',
      'Knoblauch',
      'Frühlingszwiebel',
      'Blumenkohl',
      'Brokkoli',
      'Rosenkohl',
      'Weißkohl',
      'Rotkohl',
      'Chinakohl',
      'Wirsing',
      'Grünkohl',
      'Kohlrabi',
      'Spinat',
      'Mangold',
      'Feldsalat',
      'Rucola',
      'Eisbergsalat',
      'Kopfsalat',
      'Endiviensalat',
      'Bataviasalat',
      'Chicorée',
      'Pak Choi',
      'Fenchel',
      'Artischocke',
      'Spargel',
      'Pilze',
      'Champignons',
      'Steinpilze',
      'Pfifferlinge',
      'Austernpilze',
      'Erbsen',
      'Zuckerschoten',
      'Bohnen',
      'Grüne Bohnen',
      'Brechbohnen',
      'Dicke Bohnen',
      'Mais',
      'Avocado',
      'Süßkartoffel',
      'Kartoffel'
    ] },
    { title: "Brot & Backwaren", key: "item-2", produkte: [
      'Croissants',
      'Laugengebäck',
      'Weißbrot',
      'Vollkornbrot',
      'Roggenbrot',
      'Dinkelbrot',
      'Mehrkornbrot',
      'Toastbrot',
      'Baguette',
      'Ciabatta',
      'Brötchen',
      'Kaiserbrötchen',
      'Laugenbrötchen',
      'Croissant',
      'Brezel',
      'Knäckebrot',
      'Zwieback',
      'Pumpernickel',
      'Fladenbrot',
      'Toasties',
      'Sandwichbrot',
      'Kuchen',
      'Muffins',
      'Donuts',
      'Plundergebäck',
      'Blätterteiggebäck',
      'Streuselkuchen',
      'Obstkuchen',
      'Apfelkuchen',
      'Schwarzwälder Kirschtorte',
      'Bienenstich',
      'Berliner',
      'Stollen'
    ] },
    { title: "Milch & Käse", key: "item-3", produkte: [
      'Frische Vollmilch',
      'H-Milch',
      'Fettarme Milch',
      'Laktosefreie Milch',
      'Sojamilch',
      'Hafermilch',
      'Mandelmilch',
      'Reismilch',
      'Buttermilch',
      'Kefir',
      'Joghurt',
      'Naturjoghurt',
      'Fruchtjoghurt',
      'Griechischer Joghurt',
      'Skyr',
      'Quark',
      'Magerquark',
      'Sahnequark',
      'Frischkäse',
      'Hüttenkäse',
      'Mascarpone',
      'Crème fraîche',
      'Schmand',
      'Sahne',
      'Kochsahne',
      'Kaffeesahne',
      'Butter',
      'Margarine',
      'Gouda',
      'Edamer',
      'Emmentaler',
      'Tilsiter',
      'Butterkäse',
      'Camembert',
      'Brie',
      'Mozzarella',
      'Feta',
      'Parmesan',
      'Bergkäse',
      'Raclettekäse',
      'Schmelzkäse',
      'Ziegenkäse',
      'Blauschimmelkäse',
      'Weichkäse',
      'Hartkäse',
      'Schnittkäse'
    ] },
    { title: "Fleisch & Fisch", key: "item-4", produkte: [
      'Rindfleisch',
      'Schweinefleisch',
      'Hähnchenfleisch',
      'Putenfleisch',
      'Hackfleisch',
      'Bratwurst',
      'Wiener Würstchen',
      'Salami',
      'Schinken',
      'Leberwurst',
      'Teewurst',
      'Fleischkäse',
      'Kasseler',
      'Speck',
      'Gulasch',
      'Schnitzel',
      'Steaks',
      'Lachs',
      'Forelle',
      'Kabeljau',
      'Seelachs',
      'Thunfisch',
      'Hering',
      'Makrele',
      'Garnelen',
      'Krabben',
      'Fischfilets',
      'Räucherfisch'
    ] },
    { title: "Getränke", key: "item-5", produkte: [
      'Mineralwasser',
      'Tafelwasser',
      'Apfelsaft',
      'Orangensaft',
      'Multivitaminsaft',
      'Tomatensaft',
      'Karottensaft',
      'Cola',
      'Zitronenlimonade',
      'Orangenlimonade',
      'Eistee',
      'Schorle',
      'Energydrink',
      'Sportgetränk',
      'Kaffee',
      'Kakao',
      'Bier',
      'Weißbier',
      'Radler',
      'Rotwein',
      'Weißwein',
      'Roséwein',
      'Sekt',
      'Prosecco',
      'Wodka',
      'Rum',
      'Whisky',
      'Likör',
      'Aperitif'
    ] },
    { title: "Süßigkeiten", key: "item-6", produkte: [
      'Tafelschokolade',
      'Pralinen',
      'Schokoriegel',
      'Schokodrops',
      'Schokoladenaufstrich',
      'Fruchtbonbons',
      'Kräuterbonbons',
      'Kaugummi',
      'Kekse',
      'Waffeln',
      'Lebkuchen',
      'Spekulatius',
      'Müsliriegel',
      'Energieriegel',
      'Nussriegel',
      'Popcorn',
      'Reiswaffeln',
      'Salzstangen',
      'Chips',
      'Studentenfutter'
    ] },
    { title: "Gewürze", key: "item-7", produkte: [
      'Petersilie',
      'Schnittlauch',
      'Dill',
      'Basilikum',
      'Thymian',
      'Rosmarin',
      'Oregano',
      'Majoran',
      'Estragon',
      'Koriander',
      'Salbei',
      'Minze',
      'Lorbeerblätter',
      'Kräutersalz',
      'Pfeffer',
      'Paprikapulver',
      'Chili',
      'Curry',
      'Kurkuma',
      'Kreuzkümmel',
      'Kümmel',
      'Muskatnuss',
      'Zimt',
      'Vanille',
      'Ingwer',
      'Knoblauchpulver',
      'Zwiebelpulver',
      'Senfkörner',
      'Nelken',
      'Kardamom',
      'Anis',
      'Wacholderbeeren',
      'Balsamico'
    ] },
    { title: "Haushalt", key: "item-8", produkte: [
      'Allzweckreiniger',
      'Glasreiniger',
      'Badreiniger',
      'Küchenreiniger',
      'WC-Reiniger',
      'Entkalker',
      'Spülmittel',
      'Waschmittel',
      'Weichspüler',
      'Fleckenentferner',
      'Schwämme',
      'Lappen',
      'Mikrofasertücher',
      'Besen',
      'Schaufel',
      'Eimer',
      'Wischmopp',
      'Staubtücher',
      'Müllbeutel',
      'Alufolie',
      'Frischhaltefolie',
      'Backpapier',
      'Gefrierbeutel',
      'Einweggeschirr',
      'Einwegbesteck',
      'Servietten',
      'Batterien',
      'Glühbirnen',
      'Kerzen',
      'Feuerzeuge',
      'Streichhölzer',
      'Taschenlampen'
    ] },
    { title: "Körperpflege & Drogerie", key: "item-9", produkte: [
      'Duschgel',
      'Shampoo',
      'Spülung',
      'Seife',
      'Handseife',
      'Körperlotion',
      'Gesichtscreme',
      'Feuchtigkeitscreme',
      'Sonnenschutzmittel',
      'After-Sun-Lotion',
      'Deodorant',
      'Rasiergel',
      'Rasierschaum',
      'Rasierklingen',
      'Wattestäbchen',
      'Wattepads',
      'Zahnbürste',
      'Zahnpasta',
      'Zahnseide',
      'Mundspülung',
      'Tampons',
      'Binden',
      'Slipeinlagen',
      'Intimwaschlotion',
      'Feuchttücher',
      'Wundcreme',
      'Pflaster',
      'Verbandsmaterial',
      'Desinfektionsmittel',
      'Fieberthermometer',
      'Nasenspray',
      'Hustenbonbons'
    ] },
    { title: "Tiefkühlprodukte", key: "item-10", produkte: [
      'Tiefkühlgemüse',
      'Gemüsemischung',
      'Tiefkühlkräuter',
      'Beerenmischung',
      'Erdbeeren',
      'Himbeeren',
      'Tiefkühlpizza',
      'Lasagne',
      'Nudelgericht',
      'Pfannengericht',
      'Suppe',
      'Eintopf',
      'Fischstäbchen',
      'Hähnchenschenkel',
      'Frikadellen',
      'Eiscreme',
      'Sorbet',
      'Tiefkühltorte'
    ] },
    { title: "Baby & Kleinkind", key: "item-11", produkte: [
      'Milchpulver',
      'Babybrei',
      'Getreidebrei',
      'Obstbrei',
      'Gemüsebrei',
      'Kindersnack',
      'Windeln',
      'Wundschutzcreme',
      'Babyöl',
      'Babylotion',
      'Babyshampoo',
      'Badezusatz',
      'Schnuller',
      'Babyflasche',
      'Sauger',
      'Lätzchen',
      'Waschlappen',
      'Wickelunterlage'
    ] },
    { title: "Sonstiges & Büro", key: "item-12", produkte: [
      'Kugelschreiber',
      'Bleistifte',
      'Textmarker',
      'Radiergummi',
      'Lineal',
      'Notizblock',
      'Haftnotizen',
      'Briefumschläge',
      'Schreibpapier',
      'Klebeband',
      'Tesafilm',
      'Tacker',
      'Heftklammern',
      'Büroklammern',
      'Locher',
      'Schere',
      'Klebestift'
    ] }
  ];
  

  // Hilfsfunktion: prüft, ob Produkt bereits existiert (auch in eigeneProdukte)
  const productExists = (name: string): boolean => {
    const inKategorien = kategorien.some(kat => kat.produkte.some(p => p.toLowerCase() === name.toLowerCase()));
    const inEigene = eigeneProdukte.some(p => p.toLowerCase() === name.toLowerCase());
    return inKategorien || inEigene;
  };

  // Zustand: ob es sich um ein neues Produkt handelt (nicht gefunden)
  const isNewProduct = searchTerm.trim() !== '' && !productExists(searchTerm.trim());

  // Effekt: öffnet alle Kategorien, die zum Suchbegriff passen, oder schließt sie alle bei leerem Suchfeld
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setOpenAccordions([]);
      return;
    }

    const matchingKeys = kategorien
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

      {/* Eingabefeld zum Suchen mit Neu-Button */}
      <div className="flex items-center gap-2">
        <Input
          className="search-input text-xl"
          type="text"
          placeholder="Produkt suchen..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button disabled={!isNewProduct} onClick={() => {
          if (isNewProduct) {
            setEigeneProdukte([...eigeneProdukte, searchTerm.trim()]);
            setOpenAccordions(prev => [...new Set([...prev, 'eigene-produkte'])]);
          }
        }}>Neu</Button>
      </div>

      <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="border-none">
        {/* Eigene Produkte anzeigen */}
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

        {/* Standardkategorien */}
        {kategorien.map(({ title, key, produkte }) => {
          const filteredProducts = produkte.filter((productName) =>
            productName.toLowerCase().startsWith(searchTerm.toLowerCase())
          );

          if (searchTerm.trim() !== '' && filteredProducts.length === 0) {
            return null; // Kategorie ausblenden, wenn kein Treffer
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
