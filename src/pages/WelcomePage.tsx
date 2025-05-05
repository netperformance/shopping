import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabaseClient';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function WelcomePage() {
  return (
    <div className="flex justify-center items-center pt-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle>Willkommen bei Shopping!</CardTitle>
          <CardDescription>Bitte melde dich an oder registriere dich.</CardDescription>
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
                  confirmation_text: 'Prüfe deine E-Mail auf den Link zum Zurücksetzen.',
                },
                update_password: {
                  password_label: 'Neues Passwort',
                  password_input_placeholder: 'Neues Passwort eingeben',
                  button_label: 'Passwort aktualisieren',
                  confirmation_text: 'Dein Passwort wurde aktualisiert.',
                },
              },
            }}
            providers={['google', 'facebook', 'spotify', 'github']}
          />
        </CardContent>
      </Card>
    </div>
  );
}
