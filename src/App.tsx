// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShoppingListPage from "./pages/ShoppingListPage";
import ProfilePage from "./pages/ProfilePage";

// ShadCN NavigationMenu UI-Komponenten
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Menü */}
      <header className="p-4 border-b mb-4">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="text-gray-600 hover:underline text-sm px-2 py-1">
                  Welcome
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/list" className="text-gray-600 hover:underline text-sm px-2 py-1">
                  Einkaufsliste
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/profile" className="text-gray-600 hover:underline text-sm px-2 py-1">
                  Profil
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/list" element={<ShoppingListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
