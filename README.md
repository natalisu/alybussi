# Älybussipysäkkisovellus

# GOOGLE -TUNNUKSET (API-lisenssejä varten):
email: sohjoa.api@gmail.com
salasana: 6aikaespoo

# GOOGLE MAPS JS -APIAVAIN:
AIzaSyAsKit0QXl6tApOMluYh8do3jaKrwfyUxs

Sovellus käyttää kolmea ulkoista APIa:
- Google Maps JS (kartta, palvelut ja niiden aukioloajat, osoitteet, koordinaatit)
- Digitransit API (HSL:n bussipysäkkien koordinaatit, nimet, bussien aikataulut)
- HSL News API (uutisvirran tiedoitteet suomeksi, englanniksi ja ruotsiksi)

# OHJEET MAINOSVIDEON TOISTAMISEEN
Mainosvideoon sopii VAIN YOUTUBEN EMBED -VIDEOT!
1. Lataa YouTubeen haluamasi video, ja avaa se selaimessa.
2. Katso selaimen osoitepalkista, mikä videon ID on.
    esim. Sohjoa-bussiprojektin videon osoite: https://www.youtube.com/watch?v=2FzAE9EPCq0
    Osoitteessa ID on watch?v= jälkeinen sekamelska, tässä tapauksessa 2FzAE9EPCq0
    Kopioi ID itsellesi talteen.
3. Avaa video.json -tiedosto, ja katso default -arvon osoitetta:
    https://www.youtube.com/embed/2FzAE9EPCq0?playlist=2FzAE9EPCq0&autoplay=1&loop=1&rel=0&controls=0&showinfo=0&disablekb=1&modestbranding=1&mute=1
    
    Tässä ID tulee siis kahteen kohtaan, heti embed/ jälkeen, sekä playlist -parametrin arvoksi.
    Muut asetukset:
      autoplay | Määrittää, alkaako video pyörimään automaattisesti sivun latautuessa vai ei.
      loop | Määrittää, pyöriikö video koko ajan eli alkaako se uudelleen aina sen päätyttyä.
      rel | Määrittää, ehdottaako soitin videon päätyttyä samankaltaisia videoita.
      controls | Videon kontrollit pois tai päälle (play/pause-nappi, alareunan aikapalkki)
      shhowinfo | Näyttää videon tiedot (nimi yläreunassa)
      disablekb | Ottaa näppäimistökomennot pois päältä, esim. välilyönnillä pause/play
      modestbranding | Piilottaa Youtube -logon
      mute | Hiljentää videon äännen.
    
    Kaikkiin asetuksiin on arvo joko 1 tai 0. 1 tarkoittaa true eli asetus on päällä ja 0 on false eli pois päältä.
    
    On suositeltavaa käyttää default -videon mallia, ja muuttaa osoitteesta vain videon ID.
    HUOM! Jos mainostilaan halutaan pyörimään useampi video, on niistä tehtävä Youtubeen soittolista. Tällöin osoitteeseen tuleva videon ID on sen videon ID jolla halutaan aloittaa soittolista, ja soittolistan ID (playlist -asetus) on erikseen soittolistan oma ID. Jos mainosvideoita on vain yksi, sekä video-ID että soittolistan ID ovat samat.
4. Laita lopullinen URL video.json -tiedostoon "video" -parametrin jälkeen. Jos sen arvo on tyhjä, sivusto toistaa automaattisesti default-videon. Videon pitäisi käynnistyä, kun tiedosto tallennetaan ja sivusto päivitetään.
      