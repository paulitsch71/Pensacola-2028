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
    morning: "Ausflug oder Strandtag auf Oahu",
    afternoon: "Abendstimmung in Honolulu genießen",
    isTransfer: false
  },
  {
    date: "2027-05-17",
    displayDate: "Mo, 17.05.2027",
    region: "Oahu / Kahului (Maui)",
    morning: "Check-out Honolulu & Flug nach Kahului (OGG, Maui)",
    afternoon: "Ankunft Maui, Mietwagen-Übernahme & Hotel-Check-in",
    isTransfer: true
  },
  {
    date: "2027-05-18",
    displayDate: "Di, 18.05.2027",
    region: "Maui (Kahului)",
    morning: "Inselerkundung Maui (z. B. West Maui Coastline)",
    afternoon: "Entspannung am Strand / Pool",
    isTransfer: false
  },
  {
    date: "2027-05-19",
    displayDate: "Mi, 19.05.2027",
    region: "Maui (Kahului)",
    morning: "Ausflug entlang der Road to Hana oder Haleakala",
    afternoon: "Sonnenuntergang auf Maui genießen",
    isTransfer: false
  },
  {
    date: "2027-05-20",
    displayDate: "Do, 20.05.2027",
    region: "Maui (Kahului)",
    morning: "Schnorcheln / Wassersport oder Sightseeing",
    afternoon: "Freizeit in Kahului und Umgebung",
    isTransfer: false
  },
  {
    date: "2027-05-21",
    displayDate: "Fr, 21.05.2027",
    region: "Maui / Kona (Big Island)",
    morning: "Check-out Maui & Flug nach Kona (KOA, Big Island)",
    afternoon: "Ankunft Kona, Mietwagen & Hotel-Check-in",
    isTransfer: true
  },
  {
    date: "2027-05-22",
    displayDate: "Sa, 22.05.2027",
    region: "Big Island (Kona)",
    morning: "Erkundung der Kona-Küste oder Kaffee-Plantagen",
    afternoon: "Kona Strand / Historisches Städtchen",
    isTransfer: false
  },
  {
    date: "2027-05-23",
    displayDate: "So, 23.05.2027",
    region: "Big Island (Kona)",
    morning: "Ausflug Volcanoes National Park / Mauna Kea",
    afternoon: "Naturerlebnisse auf Big Island",
    isTransfer: false
  },
  {
    date: "2027-05-24",
    displayDate: "Mo, 24.05.2027",
    region: "Big Island (Kona)",
    morning: "Wassersport / Manta-Ray-Tour Vorbereitung",
    afternoon: "Entspannung im Hotel",
    isTransfer: false
  },
  {
    date: "2027-05-25",
    displayDate: "Di, 25.05.2027",
    region: "Big Island / Phoenix",
    morning: "Letzter Vormittag auf Big Island & Check-out",
    afternoon: "Flug von Kona (KOA) nach Phoenix (PHX)",
    isTransfer: true
  },
  {
    date: "2027-05-26",
    displayDate: "Mi, 26.05.2027",
    region: "Phoenix (Arizona)",
    morning: "Ankunft / Erkundung Phoenix & Umgebung",
    afternoon: "Desert Botanical Garden oder Old Town Scottsdale",
    isTransfer: false
  },
  {
    date: "2027-05-27",
    displayDate: "Do, 27.05.2027",
    region: "Phoenix / Rancho Cucamonga",
    morning: "Fahrt von Phoenix nach Rancho Cucamonga",
    afternoon: "Check-in Hotel / Erholung nach der Fahrt",
    isTransfer: true
  },
  {
    date: "2027-05-28",
    displayDate: "Fr, 28.05.2027",
    region: "Rancho Cucamonga (CA)",
    morning: "Shopping / Erkundung Victoria Gardens",
    afternoon: "Ausflug in die Umgebung (z. B. Mt. Baldy / Inland Empire)",
    isTransfer: false
  },
  {
    date: "2027-05-29",
    displayDate: "Sa, 29.05.2027",
    region: "Rancho Cucamonga / Los Angeles",
    morning: "Weiterfahrt von Rancho Cucamonga nach Los Angeles",
    afternoon: "Check-in LA Hotel & Strandpromenade (Santa Monica)",
    isTransfer: true
  },
  {
    date: "2027-05-30",
    displayDate: "So, 30.05.2027",
    region: "Los Angeles",
    morning: "Hollywood Walk of Fame & Griffith Observatory",
    afternoon: "Beverly Hills / Rodeo Drive",
    isTransfer: false
  },
  {
    date: "2027-05-31",
    displayDate: "Mo, 31.05.2027",
    region: "Los Angeles",
    morning: "Universal Studios oder Venice Beach",
    afternoon: "Freizeit & Sightseeing in LA",
    isTransfer: false
  },
  {
    date: "2027-06-01",
    displayDate: "Di, 01.06.2027",
    region: "Los Angeles",
    morning: "Letzte Einkäufe & Souvenirs",
    afternoon: "Entspannung am Strand",
    isTransfer: false
  },
  {
    date: "2027-06-02",
    displayDate: "Mi, 02.06.2027",
    region: "Los Angeles / Rückflug",
    morning: "Mietwagen-Rückgabe am Flughafen LAX",
    afternoon: "Rückflug von Los Angeles (LAX) nach Frankfurt (FRA)",
    isTransfer: true
  },
  {
    date: "2027-06-03",
    displayDate: "Do, 03.06.2027",
    region: "Frankfurt (Ankunft)",
    morning: "Landung in Frankfurt am Main (FRA)",
    afternoon: "Heimreise",
    isTransfer: true
  }
];

export default function App() {
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [selectedRegion, setSelectedRegion] = useState('Alle');
  const [activeTab, setActiveTab] = useState('plan');

  const regions = ['Alle', ...new Set(initialItinerary.map(item => item.region.split('/')[0].trim()))];

  const filteredItinerary = selectedRegion === 'Alle' 
    ? itinerary 
    : itinerary.filter(item => item.region.includes(selectedRegion));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                USA & Hawaii 2027
              </h1>
              <p className="text-xs text-slate-400">13. Mai 2027 – 03. Juni 2027</p>
            </div>
          </div>

          <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-700/50">
            <button 
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'plan' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Reiseplan
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'stats' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Übersicht
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 pt-6">
        {activeTab === 'plan' ? (
          <>
            {/* Filter */}
            <div className="mb-6 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">Region:</span>
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedRegion === region
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {filteredItinerary.map((day, idx) => (
                <div 
                  key={day.date}
                  className={`rounded-xl border transition-all ${
                    day.isTransfer 
                      ? 'bg-slate-800/40 border-amber-500/30' 
                      : 'bg-slate-800 border-slate-700'
                  } p-4 shadow-sm hover:border-slate-600`}
                >
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-3 pb-2 border-b border-slate-700/50">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span className="font-semibold text-indigo-300">{day.displayDate}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-slate-900/60 px-2.5 py-1 rounded-md text-xs border border-slate-700/50">
                      {day.isTransfer ? <Plane className="w-3.5 h-3.5 text-amber-400" /> : <MapPin className="w-3.5 h-3.5 text-emerald-400" />}
                      <span className="text-slate-300">{day.region}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start space-x-2.5 bg-slate-900/30 p-2.5 rounded-lg border border-slate-800">
                      <Sun className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Vormittag</div>
                        <div className="text-slate-200 mt-0.5">{day.morning}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5 bg-slate-900/30 p-2.5 rounded-lg border border-slate-800">
                      <Moon className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Nachmittag / Abend</div>
                        <div className="text-slate-200 mt-0.5">{day.afternoon}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Stats View */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-extrabold text-indigo-400">22</div>
              <div className="text-sm text-slate-400 mt-1">Reisetage</div>
            </div>
            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-extrabold text-emerald-400">5</div>
              <div className="text-sm text-slate-400 mt-1">Hauptstationen</div>
            </div>
            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-extrabold text-amber-400">7</div>
              <div className="text-sm text-slate-400 mt-1">Flug- / Transfertage</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
