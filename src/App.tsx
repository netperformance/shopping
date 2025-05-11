import { useEffect, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom"
import ShoppingListPage from "./pages/ShoppingListPage"
import ProfilePage from "./pages/ProfilePage"
import WelcomePage from "./pages/WelcomePage"
import ContactPage from "./pages/ContactPage"
import ProtectedRoute from "./components/ProtectedRoute"

import { supabase } from "./lib/supabaseClient"
import { Session } from "@supabase/supabase-js"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import logo from "@/assets/shopping-logo.jpg"

function AppWrapper() {
  const [session, setSession] = useState<Session | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  const isWelcomePage = location.pathname === "/"

  return (
    <>
      <header className="border-b px-4 pb-2 flex items-center justify-between">
        <Link to={session ? "/list" : "/"} className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-1.5 items-center">
            {session && !isWelcomePage && (
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
              </>
            )}

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/contact" className="text-gray-600 hover:underline text-sm px-2 py-1">
                  Kontakt
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {session && !isWelcomePage && (
              <NavigationMenuItem>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:underline px-2 py-1 pb-3.5"
                >
                  Logout
                </button>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/list" element={<ProtectedRoute><ShoppingListPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  )
}