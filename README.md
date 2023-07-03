# Dylemat

Projekt dotyczy stworzenia gry miejskiej i wykorzystania Webflow jako front-endu dla tworu przypominającego bardziej aplikacje webową anizeli strony internetowej.

## Tech Stack:

- Webflow -> Front-end.
- Draggabilly -> Interactywna mapa.
- Howler -> Audio.

### Problemy zaistniałe w trakcie realizacji:

- Integrating libraries that will respond with Webflow CSS & Interactions.
- Zintegrowanie bibliotek uzywanych w projekcie (mapa, audio) wraz z ekosystemem Webflow - mozliwość edycji z poziomu Webflow Designer (CSS, Interakcje).
- Flow uzytkownika
  - Zrozumienie i modyfikacje UX.
  - Poprawne zaimplementowanie ściezki - przejście w pewnym rodzaju z SPA (Single Page Application) na MPA (Multi Page Application).
- Źródło audio - Brak własnego hostingu FTP wymaga uzywanie chmur, jednakze chmury tez niezbyt lubią gdy wrzuca się tam pliki i wykorzystuje jako embed. Stąd nalezało bardzo mocno zmodyfikować sposób przekazywania pliku audio do Webflow aby odtwarzanie audio z Google Drive było mozliwe.

### Rozwiązania dostępne do wykorzystania w przyszłości:

- Howler -> Audio Player.

## Uruchamianie środowiska:

Projekt korzysta z boilerplate `@finsweet/developer-starter`. Dokładna instrukcja uzytkowania dostępna w repozytorium o takiej samej nazwie.
