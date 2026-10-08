import React, { useState } from 'react';
import { Calendar, MapPin, Sun, Moon, Plane, Compass } from 'lucide-react';

export const initialItinerary = [
  {
    date: "2027-05-13",
    displayDate: "Do, 13.05.2027",
    region: "Flug / Oahu",
    morning: "Flug von Frankfurt (FRA) nach Honolulu (HNL)",
    afternoon: "Landung in Honolulu, Transfer & Hotel-Check-in",
    isTransfer: true
  },
  {
    date: "2027-05-14",
    displayDate: "Fr, 14.05.2027",
    region: "Oahu (Honolulu)",
    morning: "Freizeit in Honolulu (z. B. Waikiki Beach)",
    afternoon: "Entspannung nach dem Langstreckenflug",
    isTransfer: false
  },
  {
    date: "2027-05-15",
    displayDate: "Sa, 15.05.2027",
    region: "Oahu (Honolulu)",
    morning: "Erkundung von Oahu auf eigene Faust",
    afternoon: "Freizeit auf der Hauptinsel",
    isTransfer: false
  },
  {
    date: "2027-05-16",
    displayDate: "So, 16.05.2027",
    region: "Oahu (Honolulu)",
    morning: "Letzte Erledigungen in Honolulu",
    afternoon: "Entspannter Tag zur freien Verfügung",
    isTransfer: false
  },
  {
    date: "2027-05-17",
    displayDate: "Mo, 17.05.2027",
    region: "Oahu ➔ Maui",
    morning: "Flug von Honolulu (HNL) nach Kahului (OGG)",
    afternoon: "Check-in Maui Seaside Hotel & Kaʻanapali Beach",
    isTransfer: true
  },
  {
    date: "2027-05-18",
    displayDate: "Di, 18.05.2027",
    region: "Maui",
    morning: "Start Road to Hāna & Wasserfälle",
    afternoon: "Waiʻānapanapa (Schwarzer Strand) & Pipiwai Trail",
    isTransfer: false
  },
  {
    date: "2027-05-19",
    displayDate: "Mi, 19.05.2027",
    region: "Maui",
    morning: "Panoramafahrt zum Nakalele Blowhole",
    afternoon: "Paia (Surfer-Städtchen) & Hoʻokipa Beach",
    isTransfer: false
  },
  {
    date: "2027-05-20",
    displayDate: "Do, 20.05.2027",
    region: "Maui",
    morning: "Wailea Beach Path (Klippenweg)",
    afternoon: "Fahrt ins grüne, kühle Upcountry",
    isTransfer: false
  },
  {
    date: "2027-05-21",
    displayDate: "Fr, 21.05.2027",
    region: "Maui ➔ Big Island",
    morning: "Kanaha Beach / Souvenir-Shopping",
    afternoon: "Flug nach Kona (KOA) & Mauna Kea Gipfel (Sunset)",
    isTransfer: true
  },
  {
    date: "2027-05-22",
    displayDate: "Sa, 22.05.2027",
    region: "Big Island",
    morning: "Volcanoes National Park (Crater Rim)",
    afternoon: "Thurston Lava Tube & Chain of Craters Road",
    isTransfer: false
  },
  {
    date: "2027-05-23",
    displayDate: "So, 23.05.2027",
    region: "Big Island",
    morning: "Fahrt nach Hilo zu den Rainbow Falls",
    afternoon: "Akaka Falls State Park (Dschungel-Wasserfall)",
    isTransfer: false
  },
  {
    date: "2027-05-24",
    displayDate: "Mo, 24.05.2027",
    region: "Big Island ➔ Phoenix",
    morning: "Roadtrips, Sightseeing",
    afternoon: "Erkundungen & Weiterflug",
    isTransfer: true
  },
  {
    date: "2027-05-25",
    displayDate: "25.05. - 29.05.2027",
    region: "Phoenix",
    morning: "Roadtrips, Sightseeing in & um Phoenix",
    afternoon: "Erkundungen in der Wüste & Stadt",
    isTransfer: false
  },
  {
    date: "2027-05-29",
    displayDate: "Sa, 29.05.2027",
    region: "Phoenix ➔ Rancho Cucamonga",
    morning: "Fahrt / Transfer Richtung Kalifornien",
    afternoon: "Roadtrips, Sightseeing oder Freizeit in LA",
    isTransfer: true
  },
  {
    date: "2027-05-30",
    displayDate: "29.05. - 03.06.2027",
    region: "Rancho Cucamonga / LA",
    morning: "Roadtrips, Sightseeing oder Freizeit in LA",
    afternoon: "Ausflüge, Shopping & Highlights",
    isTransfer: false
  },
  {
    date: "2027-06-03",
    displayDate: "Do, 03.06.2027",
    region: "Los Angeles ➔ FRA",
    morning: "Koffer packen & letzte Erledigungen in LA",
    afternoon:
