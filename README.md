# Mini X

Mini X to **minimalistyczna aplikacja typu mini Facebook/Messenger**, stworzona w Next.js.  
Pozwala na przeglądanie postów, dodawanie nowych z walidacją w czasie rzeczywistym i pokazuje powiadomienia (Snackbar) po dodaniu posta.

---

## Funkcjonalności

- Strona startowa (`/`) – powitalna, minimalistyczna, czarno-biała.
- Feed (`/feed`) – lista postów z:
  - Autorem
  - Treścią
  - Datą dodania
- Dodawanie posta (`/add-post`) – formularz z:
  - Live validation przy użyciu **Zod**
  - Snackbar MUI potwierdzający dodanie posta
  - Minimalistyczny design

---

## Technologie i narzędzia

- **Next.js** – frontend + backend w jednym projekcie (API Routes)
- **React 18** – komponenty, state, hooks
- **Material UI (MUI)** – przyciski i Snackbar
- **Tailwind CSS** – szybki i minimalistyczny design
- **Zod** – walidacja formularzy po stronie klienta
- **PostgreSQL** – baza danych do przechowywania postów
- **Prisma ORM** – łatwa obsługa bazy danych

---

## Architektura

- **Komunikacja z backendem**: Next.js API Routes (`/api/posts`)
- **Protokół:** HTTP POST/GET w API Routes

---

## Instalacja i uruchomienie

Wejdź przez link vercel-app:

Link do strony:

LUB

1. Zainstaluj zależności:

```bash
npm install
```

2. Skonfiguruj bazę danych w .env:

```bash
DATABASE_URL="postgres://790576897ebd7d1c78369c8fc38a086a3084a4a88f5dee8cc5bbf0a524138bd2:sk_g0OuI4Y2riMX4bcIGo7Yk@db.prisma.io:5432/postgres?sslmode=require"
```

3. Migracja bazy danych (Prisma):

```bash
npx prisma migrate dev --name init
```

4. Uruchom projekt w trybie deweloperskim:

```bash
npm run dev
```

5. Otwórz w przeglądarce:

```bash
http://localhost:3000
```
