import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabaseClient'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

export default function WelcomePage() {
  const navigate = useNavigate()

  // 🚫 Bereits eingeloggt? → sofort weiterleiten
  useEffect(() => {
    // Initiale Session prüfen
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/list')
      }
    })

    // Live-Änderungen beobachten (Login, Signup etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          navigate('/list')
        }
      }
    )

    return () => listener?.subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="flex justify-center items-center pt-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle>Willkommen bei Shopping!</CardTitle>
          <CardDescription>
            Deine digitale Einkaufsliste.
            <br />
            Melde dich an oder registriere dich.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#000000',
                    brandAccent: '#ff0000',
                  },
                },
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'E-Mail-Adresse',
                  password_label: 'Passwort',
                  email_input_placeholder: 'Deine E-Mail-Adresse',
                  password_input_placeholder: 'Dein Passwort',
                  button_label: 'Anmelden',
                  link_text: 'Bereits registriert? Anmelden',
                },
                sign_up: {
                  email_label: 'E-Mail-Adresse',
                  password_label: 'Passwort',
                  email_input_placeholder: 'Deine E-Mail-Adresse',
                  password_input_placeholder: 'Ein sicheres Passwort wählen',
                  button_label: 'Registrieren',
                  link_text: 'Noch kein Konto? Jetzt registrieren!',
                },
                forgotten_password: {
                  email_label: 'E-Mail-Adresse',
                  email_input_placeholder: 'Deine E-Mail-Adresse',
                  link_text: 'Passwort vergessen?',
                  button_label: 'Link zum Zurücksetzen senden',
                  confirmation_text:
                    'Prüfe deine E-Mail auf den Link zum Zurücksetzen.',
                },
                update_password: {
                  password_label: 'Neues Passwort',
                  password_input_placeholder: 'Neues Passwort eingeben',
                  button_label: 'Passwort aktualisieren',
                  confirmation_text: 'Dein Passwort wurde aktualisiert.',
                },
              },
            }}
            providers={['google']}
            redirectTo="http://localhost:5173/list"
          />
        </CardContent>
      </Card>
    </div>
  )
}
