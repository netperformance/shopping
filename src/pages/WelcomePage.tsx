import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabaseClient';

export default function WelcomePage() {
  return (
    <div className="auth-container">
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
            ...({
              provider: {
                google: 'Melde dich mit Google an',
                facebook: 'Melde dich mit Facebook an',
                github: 'Melde dich mit GitHub an',
                spotify: 'Melde dich mit Spotify an',
              },
            } as any),
          },
        }}        
        providers={['google', 'facebook', 'spotify', 'github']}
      />
    </div>
  );
}
