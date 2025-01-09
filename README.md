# Car_Rental

Ez az összegzés a Car_Rental projektben elvégzett munkát foglalja össze. A projekt célja egy egyszerű autókölcsönző alkalmazás létrehozása volt, publikus és adminisztrációs felülettel.

**Technikai részletek:**

*   **Backend:** Spring Boot 3.3.3
*   **Adatbázis:** H2 (beágyazott)
*   **Frontend:** React, Mantine UI

**Elkészült funkciók:**

**Publikus felület:**

*   **Kereső felület (dátumválasztás):** A felhasználó a főoldalon kiválaszthat egy kezdő és egy befejező dátumot egy dátumválasztóból.
*   **Kérés a szerver felé:** A dátumok kiválasztása után a frontend kérést küld a backend felé.
*   **Szabad autók listája:** A backend válasza tartalmazza az adott időszakban szabad autókat, képpel és napi árral.
*   **Foglalás kezelése (adatbevitel, összegzés, véglegesítés):** Az autó kiválasztása után a felhasználó megadhatja az adatait (név, email cím, cím, telefonszám), a foglalás napjainak számát, és láthatja a foglalás teljes összegét. A foglalás véglegesíthető.

**Adminisztrációs felület:**

*   **Admin belépés:** Az adminisztrációs felület konfigurációból betöltött adatokkal érhető el, adminisztrátori jogosultságokkal.
*   **Foglalások listája:** Az adminisztrációs felületen egy áttekinthető listában láthatók az eddigi foglalások. Ez segít nyomon követni, hogy melyik autót mikor foglalták le.
*   **Foglalásokat kiszolgáló szolgáltatás:** Készült egy háttérben futó "motor", ami kezeli a foglalásokkal kapcsolatos összes műveletet. Ez felelős például a foglalások létrehozásáért, lekérdezéséért és törléséért. Tulajdonképpen ez a rendszer "lelke" a foglalások szempontjából.
*   **Autók szerkesztése és új autó felvitele:** Az adminisztrációs felületen lehetőség van a már meglévő autók adatainak szerkesztésére (pl. napi ár, leírás), valamint teljesen új autók hozzáadására is a rendszerhez. Az autók "deaktiválása" úgy lett megoldva, hogy ha egy autót kivonunk a forgalomból (deaktiváljuk), akkor az addig hozzá tartozó foglalások automatikusan törlődnek. Ez azt jelenti, hogy ha egy autót ideiglenesen vagy véglegesen nem szeretnénk bérbe adni, akkor a jövőbeli foglalásai érvénytelenek lesznek.

**Hiányzó/Nem megvalósított funkciók:**

*   **Tesztek:** A tesztek implementálása nem történt meg.
*   **Autók szerkesztése (képek):** A képek feltöltésének és kezelésének implementálása nem történt meg.

*   **Részletesebb autóleírások:** A képek mellett érdemes lenne részletesebb leírásokat is adni az autókról, például műszaki adatok (lóerő, fogyasztás), extra felszereltség (klíma, navigáció), vagy akár rövid történet az autóról (ha van).
*   **Szűrők és rendezés a keresőben:** A felhasználók számára hasznos lenne, ha szűrhetnének az autók között különböző paraméterek alapján (pl. ár, típus, üzemanyag), vagy rendezhetnék a találatokat ár, évjárat szerint.
*   **Felhasználói fiókok:** A foglalásokhoz érdemes lenne felhasználói fiókokat létrehozni, ahol a felhasználók elmenthetik az adataikat, megtekinthetik korábbi foglalásaikat, vagy akár értékelhetik is a bérelt autókat.
*   **Fizetési integráció:** A foglalás véglegesítéséhez integrálni lehetne egy online fizetési megoldást, amit esetleg valamilyen külső api-val meg lehetne oldani.
*   **Térképes nézet:** A szabad autók megjelenítése térképen is egy érdekes funkció lehetne, különösen, ha több átvételi pont is van.
*   **Naptár nézet a foglalásokhoz:** A foglalások kezeléséhez egy naptár nézet sokat segíthetne az adminisztrációs felületen, hogy könnyen átlátható legyen, melyik autó mikor foglalt.
*   **Értesítések:** A felhasználók kaphatnának email vagy SMS értesítéseket a foglalásukról, a bérlés kezdetéről és végéről.
  
*   **Adatbázis optimalizálás:** Nagyobb adatmennyiség esetén érdemes lehet optimalizálni az adatbázis lekérdezéseket és indexeket létrehozni a gyorsabb működés érdekében.

*   **Felhasználóbarátabb felület:** A felhasználói felületet folyamatosan lehet javítani a felhasználói visszajelzések alapján.
*   **Téma választás:** Lehetőséget adni a felhasználóknak a sötét vagy világos mód kiválasztására.

