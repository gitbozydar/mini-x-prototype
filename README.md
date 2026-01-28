# Mini X

**Mini X** to **minimalistyczna aplikacja typu mini Facebook/Messenger**, stworzona w Next.js.  
Pozwala na przeglądanie postów, dodawanie nowych z walidacją w czasie rzeczywistym, logowanie/rejestrację użytkowników oraz pokazuje powiadomienia (Snackbar) po dodaniu posta.

---

## Funkcjonalności

- **Strona startowa (`/`)** – powitalna, minimalistyczna, czarno-biała.
- **Feed (`/feed`)** – lista postów z:
  - Autorem (zarejestrowany użytkownik)
  - Treścią
  - Datą dodania
  - Tytułem posta
- **Dodawanie posta (`/add-post`)** – formularz dostępny tylko dla zalogowanych użytkowników:
  - Autor przypisany automatycznie z kontekstu użytkownika
  - Live validation przy użyciu **Zod**
  - Snackbar MUI potwierdzający dodanie posta
  - Minimalistyczny design
- **Logowanie (`/login`)** – umożliwia zalogowanie istniejącego użytkownika
- **Rejestracja (`/register`)** – tworzenie nowego konta
- **Autoryzacja** – tylko zalogowani użytkownicy mogą dodawać posty
- **Kontekst użytkownika** – globalny dostęp do zalogowanego użytkownika w całej aplikacji
- **Powiadomienia (Snackbar)** – informacja o dodaniu posta lub błędach przy logowaniu/rejestracji

---

## Technologie i narzędzia

- **Next.js** – frontend + backend w jednym projekcie (API Routes)
- **React 18** – komponenty, state, hooks, Client/Server Components
- **Material UI (MUI)** – przyciski, Snackbar, Avatar
- **Tailwind CSS** – szybki i minimalistyczny design
- **Zod** – walidacja formularzy po stronie klienta
- **PostgreSQL** – baza danych do przechowywania użytkowników i postów
- **Prisma ORM** – łatwa obsługa bazy danych
- **Context API** – globalny stan zalogowanego użytkownika

---

## Architektura

- **Komunikacja z backendem**: Next.js API Routes (`/api/posts`, `/api/register`, `/api/login`)
- **Protokół:** HTTP POST/GET w API Routes
- **Autoryzacja:** token JWT + kontekst React do sprawdzania zalogowanego użytkownika
- **Baza danych:** relacja `Post` → `User` (`authorId`) w Prisma

---

## Instalacja i uruchomienie

Aplikacja dostępna online przez hosting Vercel:

[🔗 Otwórz Mini X](https://mini-x-prototype.vercel.app/)

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
