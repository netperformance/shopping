// src/App.tsx
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import ShoppingListPage from "./pages/ShoppingListPage"
import ProfilePage from "./pages/ProfilePage"
import WelcomePage from "./pages/WelcomePage"

import { supabase } from "./lib/supabaseClient"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

function AppWrapper() {
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Initiale Session abfragen
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Auth-Änderungen beobachten
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/") // Zurück zur Welcome-Seite
  }

  return (
    <>
      <header className="border-b mb-4">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {/* Nur zeigen, wenn **nicht** eingeloggt */}
            {!session && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className="text-gray-600 hover:underline text-sm px-2 py-1">
                    Welcome
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
            {/* Diese Seiten nur anzeigen, wenn eingeloggt */}
            {session && (
              <>
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
                <NavigationMenuItem>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:underline px-2 py-1 pb-3.5"
                  >
                    Logout
                  </button>
                </NavigationMenuItem>
              </>
            )}
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
    </>
  )
}

// BrowserRouter außerhalb, damit useNavigate funktioniert
export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  )
}
