# kb-weaponanims

De wapenhouding en loop-animaties van **KTWR** (Mr.KobraX) voor elke speler op de server, zodat niemand de mod in zijn eigen GTA-map hoeft te zetten. Het zijn geen emotes: het vervangt hoe een wapen vastgehouden wordt tijdens lopen, rennen, in dekking en in stealth.

Bron: de OpenIV-pakketten uit `Grand Theft Auto V\mods`. Controleer op de downloadpagina van de maker of gebruik op een server is toegestaan, en noem hem in je credits.

## Wat erin zit
- `stream/`: de gekozen animatiebestanden (`weapons@pistol@`, `weapons@rifle@`, `cover@move@ai@base@1h@`, `move_stealth@p_m_zero@...`). Ze vervangen de standaard animaties van GTA.
- `data/`: `weaponanimations.meta` (basis en alle DLC-wapens) en `pedpersonality.ymt` (zet stealth en actiemodus aan voor freemode-karakters).
- `variants/`: alle stijlen uit de mod. Deze map wordt niet naar spelers gestuurd.
- `data-varianten/`: de twee basisversies van de mod (zie hieronder).

## Een andere stijl kiezen
1. Zie wat er te kiezen valt: `node kies.js lijst`
2. Pas `keuze.json` aan (de naam moet exact kloppen).
3. Draai `node kies.js` in deze map. Het zet de gekozen bestanden in `stream/` en `data/`.
4. `refresh` en `restart kb-weaponanims`. Spelers die al online zijn moeten opnieuw verbinden.

`meta`:
- `vrouw-geweer`: vrouwelijke freemode-karakters gebruiken dezelfde geweer-animaties als mannen (KTWR Base + MP Female Rifle). Dit is de standaard.
- `standaard`: vrouwen houden hun eigen, ongewijzigde geweer-animaties van GTA (KTWR Base).

Voorbeeldplaatjes van elke stijl staan in de map `Grand Theft Auto V\mods\02. Choose Your Style`.

## Niet getest
Dit is niet in-game getest. Dingen om te controleren:
- Of de animaties echt gewijzigd zijn (pistool trekken, lopen, in dekking, geweer in stealth).
- Of `pedpersonality.ymt` als `PED_PERSONALITY_FILE` geladen wordt. Lukt dat niet, haal dan de laatste `data_file`-regel en de bestandsregel in `fxmanifest.lua` weg: de rest werkt dan nog wel, alleen stealth voor freemode-karakters niet.
- Of het botst met het wapenpakket `vp897` in `[assets]`: dat heeft ook een eigen `weaponanimations.meta` en `pedpersonality.meta`.

## Terugdraaien
Haal `ensure kb-weaponanims` uit de start (of verwijder de map) en herstart de server.
