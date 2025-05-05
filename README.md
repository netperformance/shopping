# 🛒 Shopping – Digitale Einkaufsliste mit Supabase, React & shadcn/ui

**Shopping** ist eine moderne, digitale Einkaufsliste. Die Anwendung ermöglicht es dir, Produkte aus Kategorien auszuwählen, eigene Produkte anzulegen, eine Einkaufsliste zu pflegen und alle Daten benutzerbezogen zu speichern. Sie ist ein reines Open-Source-Übungsprojekt zur praktischen Anwendung von React, Supabase und modernen UI-Toolkits.

---

## ✨ Features

- ✅ Authentifizierung per E-Mail und Google
- ✅ Produktsuche mit Auto-Filterung nach Kategorien
- ✅ Eigene Produkte hinzufügen und verwalten
- ✅ Einkaufsliste speichern und beim Login wiederherstellen
- ✅ Benutzerkonto und alle Daten selbstständig löschen
- ✅ Responsive UI mit `shadcn/ui` und Tailwind CSS
- ✅ Navigation mit geschützten Routen (nur bei Login sichtbar)

---

## 🧰 Technologien

| Technologie        | Zweck                            |
|--------------------|----------------------------------|
| **React + Vite**   | Frontend & Dev-Server            |
| **TypeScript**     | Typsicherheit im gesamten Projekt |
| **Tailwind CSS**   | Utility-first CSS Framework      |
| **shadcn/ui**      | UI-Komponenten auf Radix UI-Basis |
| **Radix UI**       | Interaktive & barrierefreie Komponenten |
| **Lucide Icons**   | Icons für Benutzeraktionen       |
| **Supabase**       | Authentifizierung, Datenbank, API-Backend |

---

## 📦 Lokale Installation

### 1. Projekt klonen

```bash
git clone https://github.com/netperformance/shopping.git
cd shopping
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

---

## 📁 `.env` Datei anlegen

Erstelle im Projektstamm eine Datei `.env` mit folgendem Inhalt:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-api-key
```

Diese Daten findest du im Supabase-Dashboard unter  
**Project Settings → API**.

---

## 🧩 Supabase einrichten

### 1. Projekt erstellen

- Erstelle ein neues Projekt auf [https://app.supabase.com](https://app.supabase.com)
- Aktiviere unter **Authentication → Providers**:
  - E-Mail (enabled by default)
  - Google (siehe Google Login unten)

### 2. SQL für Datenmodell, RLS & Account-Löschung

Öffne den SQL Editor in Supabase und füge diesen Code ein:

```sql
-- Benutzerbezogene Tabelle
create table if not exists public.user_data (
  id uuid primary key references auth.users(id) on delete cascade,
  custom_products text[] default '{}',
  shopping_list text[] default '{}',
  updated_at timestamp with time zone default now()
);

-- Row-Level Security aktivieren
alter table public.user_data enable row level security;

-- Zugriff nur auf eigene Daten
create policy "Benutzer kann nur eigene Daten lesen und schreiben"
on public.user_data
for all
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Funktion zur Accountlöschung
create or replace function delete_user_and_data()
returns void
language plpgsql
security definer
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;
```

---

## 🔐 Google Login einrichten

1. Gehe zur [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein Projekt oder verwende ein vorhandenes
3. Navigiere zu **APIs & Dienste → Anmeldedaten**
4. Wähle **OAuth 2.0-Client-ID erstellen**
5. Trage folgende autorisierte Weiterleitungs-URL ein:

```
http://localhost:5173
```

6. Trage die erzeugte **Client ID** und das **Client Secret** in Supabase ein unter:  
**Authentication → Settings → External OAuth Providers → Google**

---

## 🧪 Entwicklung starten

```bash
npm run dev
```

Die App ist dann lokal erreichbar unter:

```
http://localhost:5173
```

---

## 🌍 Live-Version

Falls das Projekt online gestellt wurde, ist es erreichbar unter:

```
https://shopping.aaron.de
```

Hinweis: Es handelt sich um ein persönliches Lernprojekt. Der Live-Betrieb kann jederzeit beendet werden.

---

## 📁 Live-Daten & Datenschutz

- Die Anwendung verwendet Supabase zur Speicherung benutzerspezifischer Daten:
  - E-Mail-Adresse
  - Eigene Produkte
  - Einkaufsliste
- Alle Daten werden auf Servern in den **USA** gespeichert (via Supabase)
- Benutzer können ihr Konto inkl. Daten **selbstständig unter „Profil“ löschen**
- Es findet **keine Analyse oder Tracking** des Nutzerverhaltens statt
- Registrierung möglich via:
  - E-Mail-Adresse + Passwort
  - Google OAuth
- Cookies werden ausschließlich durch Supabase zur Session-Verwaltung gesetzt

### Relevante Datenschutzerklärungen

- [Supabase Privacy Policy](https://supabase.com/privacy)
- [Google Privacy Policy](https://policies.google.com/privacy)

---

## 📄 Lizenz

MIT License  
Dieses Projekt ist Open Source und darf kostenlos genutzt und weiterentwickelt werden.

---

## 👤 Autor

**Aaron Kreis**  
Düsseldorf, Deutschland  
[github.com/netperformance](https://github.com/netperformance)
