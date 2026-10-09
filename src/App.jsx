import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Plane, Utensils, ShoppingBag, 
  FileText, Plus, Trash2, ChevronDown, ChevronUp, Bookmark, Clock, Compass, Sun, Palmtree, CloudSun, Waves, Car
} from 'lucide-react';

const initialItinerary = [
  { id: 1, date: "Mi, 20.05.2028", region: "Pensacola", isFlight: true, isFlorida: true, morning: "Ankunft & Landung in Pensacola", evening: "Mietwagenübernahme & Hotel-Check-in am Golf von Mexiko" },
  { id: 2, date: "Do, 21.05.2028", region: "Baton Rouge (LA)", isFlight: false, isFlorida: false, morning: "Fahrt von Pensacola nach Baton Rouge (~4,5 Std.)", evening: "Ankunft, Check-in & Entspannung in Louisiana" },
  { id: 3, date: "Fr, 22.05.2028", region: "Houston (TX)", isFlight: false, isFlorida: false, morning: "Fahrt von Baton Rouge nach Houston (~4,5 Std.)", evening: "Ankunft in Texas & erster Abend in Houston" },
  { id: 4, date: "Sa, 23.05.2028", region: "Houston", isFlight: false, isFlorida: false, morning: "Erkundung von Houston & Shopping-Tag", evening: "Abendessen & Freizeit in Houston" },
  { id: 5, date: "So, 24.05.2028", region: "Houston", isFlight: false, isFlorida: false, morning: "Freizeit oder Ausflug in Houston (z. B. NASA Space Center)", evening: "Gemütlicher Ausklang in Houston" },
  { id: 6, date: "Mo, 25.05.2028", region: "Houston", isFlight: false, isFlorida: false, morning: "Weiterer Tag für Malls, Outlets & Kultur in Houston", evening: "Abend in Houston genießen" },
  { id: 7, date: "Di, 26.05.2028", region: "Dallas (TX)", isFlight: false, isFlorida: false, morning: "Fahrt von Houston nach Dallas (~3,5 Std.)", evening: "Ankunft in Dallas & Hotel-Check-in" },
  { id: 8, date: "Mi, 27.05.2028", region: "Dallas", isFlight: false, isFlorida: false, morning: "Erkundung von Dallas & Mega-Shopping", evening: "Abendprogramm in Dallas" },
  { id: 9, date: "Do, 28.05.2028", region: "Dallas", isFlight: false, isFlorida: false, morning: "Outlets & Sehenswürdigkeiten in der Dallas-Region", evening: "Freizeit in Dallas" },
  { id: 10, date: "Fr, 29.05.2028", region: "Dallas", isFlight: false, isFlorida: false, morning: "Letzter voller Tag in Dallas für Shopping & Co.", evening: "Besonderes Abendessen in Dallas" },
  { id: 11, date: "Sa, 30.05.2028", region: "Vicksburg (MS)", isFlight: false, isFlorida: false, morning: "Fahrt von Dallas nach Vicksburg, Mississippi (~5 Std.)", evening: "Ankunft & geschichtsträchtiger Abend am Mississippi River" },
  { id: 12, date: "So, 31.05.2028", region: "Pensacola", isFlight: false, isFlorida: true, morning: "Rückfahrt von Vicksburg nach Pensacola (~5 Std.)", evening: "Zurück an der Küste von Florida – Willkommen im Paradies!" },
  { id: 13, date: "Mo, 01.06.2028", region: "Pensacola", isFlight: false, isFlorida: true, morning: "Erster Strandtag in Pensacola Beach", evening: "Sonnenuntergang am Golf von Mexiko" },
  { id: 14, date: "Di, 02.06.2028", region: "Pensacola", isFlight: false, isFlorida: true, morning: "Entspannung & Freizeit in Pensacola", evening: "Gemütlicher Abend" },
  { id: 15, date: "Mi, 03.06.2028", region: "Pensacola", isFlight: false, isFlorida: true, morning: "Ausflug oder Strandtag in Pensacola", evening: "Abendessen in der Coastal City" },
  { id: 16, date: "Do, 04.06.2028", region: "Pensacola", isFlight: false, isFlorida: true, morning: "Freizeit in Pensacola", evening: "Entspannter Ausklang" },
  { id: 17, date: "Fr, 05.06.2028", region: "Pensacola", isFlight: false, isFlorida: true, morning: "Wochenend-Feeling in Pensacola Beach", evening: "Nachtleben / Abend genießen" },
  { id: 18, date: "Sa, 06.06.2028", region: "Pensacola", isFlight: false, isFlorida: true, morning: "Strand, Sonne & Erholung", evening: "Gemeinsamer Abend" },
  { id: 19, date: "So, 07.06.2028", region: "Pensacola", isFlight: false, isFlorida: true, morning: "Letzter ganzer Tag am Strand von Pensacola", evening: "Abschiedsessen am Meer" },
  { id: 20, date: "Mo, 08.06.2028", region: "Pensacola", isFlight: true, isFlorida: true, morning: "Letzte Souvenirs & Abreisevorbereitung", evening: "Rückflug / Abflug ab Pensacola" },
  { id: 21, date: "Di, 09.06.2028", region: "Frankfurt (Ankunft)", isFlight: true, isFlorida: false, morning: "Ankunft am Flughafen Frankfurt (FRA)", evening: "Heimreise & Urlaubsabschluss" }
];

const regionCoords = {
  'Alle': { lat: 30.4213, lon: -87.2169, waterTemp: "27°C" },
  'Pensacola': { lat: 30.4213, lon: -87.2169, waterTemp: "27°C" },
  'Baton Rouge (LA)': { lat: 30.4515, lon: -91.1871, waterTemp: null },
  'Houston (TX)': { lat: 29.7604, lon: -95.3698, waterTemp: null },
  'Houston': { lat: 29.7604, lon: -95.3698, waterTemp: null },
  'Dallas (TX)': { lat: 32.7767, lon: -96.7970, waterTemp: null },
  'Dallas': { lat: 32.7767, lon: -96.7970, waterTemp: null },
  'Vicksburg (MS)': { lat: 32.3526, lon: -90.8779, waterTemp: null },
  'Frankfurt (Ankunft)': { lat: 50.1109, lon: 8.6821, waterTemp: null }
};

const regionVisuals = {
  'Alle': { title: "Pensacola & Südstaaten Roadtrip 2028", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
  'Pensacola': { title: "Pensacola – Traummenschen & weißer Sand", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
  'Baton Rouge (LA)': { title: "Baton Rouge – Louisiana Vibes", bg: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80" },
  'Houston (TX)': { title: "Houston – Space City & Shopping", bg: "https://images.unsplash.com/photo-1531219436234-972d3c91d88a?auto=format&fit=crop&w=1200&q=80" },
  'Houston': { title: "Houston – Metropole in Texas", bg: "https://images.unsplash.com/photo-1531219436234-972d3c91d88a?auto=format&fit=crop&w=1200&q=80" },
  'Dallas (TX)': { title: "Dallas – Big D & Malls", bg: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80" },
  'Dallas': { title: "Dallas – Texas Lifestyle", bg: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80" },
  'Vicksburg (MS)': { title: "Vicksburg – Mississippi Geschichte", bg: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80" },
  'Frankfurt (Ankunft)': { title: "Ankunft in Deutschland", bg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80" }
};

const defaultBatonRougeShopping = [
  "Tanger Outlet Gonzales"
];

const defaultHoustonShopping = [
  "Houston Tanger Outlet",
  "Katy Mills Mall + Outlet",
  "Houston Premium Outlet",
  "The Woodlands Market (offene Mall, inkl. Louis Vuitton)",
  "The Galleria Mall (inkl. Louis Vuitton)",
  "Memorial City Mall"
];

const defaultDallasShopping = [
  "Fort Worth Tanger Outlet",
  "Grand Prairie Premium Outlet",
  "Allen Premium Outlet",
  "Grapevine Mills Mall + Outlet",
  "Northpark Center Mall (inkl. Louis Vuitton)",
  "Galleria Dallas Mall (inkl. Louis Vuitton)"
];

export default function App() {
  const [activeTab, setActiveTab] = useState('plan');
  const [selectedRegion, setSelectedRegion] = useState('Alle');
  const [expandedDay, setExpandedDay] = useState(null);
  const [isRegionNotesExpanded, setIsRegionNotesExpanded] = useState(true);

  // Weather State
  const [weather, setWeather] = useState({ temp: null, loading: true });

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const targetDate = new Date('2028-05-20T12:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        setTimeLeft({ days, hours, minutes });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Weather Data from Open-Meteo API
  useEffect(() => {
    const coords = regionCoords[selectedRegion] || regionCoords['Alle'];
    setWeather({ temp: null, loading: true });

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          setWeather({ temp: Math.round(data.current_weather.temperature), loading: false });
        } else {
          setWeather({ temp: '--', loading: false });
        }
      })
      .catch(() => setWeather({ temp: '--', loading: false }));
  }, [selectedRegion]);

  // LocalStorage state for daily notes
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('pensacola2028_reminders');
    return saved ? JSON.parse(saved) : {};
  });

  // LocalStorage state for destination/region notes
  const [regionReminders, setRegionReminders] = useState(() => {
    const saved = localStorage.getItem('pensacola2028_region_reminders');
    const parsed = saved ? JSON.parse(saved) : {};

    // Baton Rouge defaults
    if (!parsed["Baton Rouge (LA)"]) {
      parsed["Baton Rouge (LA)"] = { food: [], shopping: defaultBatonRougeShopping, misc: [] };
    } else {
      parsed["Baton Rouge (LA)"].shopping = defaultBatonRougeShopping;
    }

    // Houston defaults
    if (!parsed["Houston (TX)"]) {
      parsed["Houston (TX)"] = { food: [], shopping: defaultHoustonShopping, misc: [] };
    } else {
      parsed["Houston (TX)"].shopping = defaultHoustonShopping;
    }
    if (!parsed["Houston"]) {
      parsed["Houston"] = { food: [], shopping: defaultHoustonShopping, misc: [] };
    } else {
      parsed["Houston"].shopping = defaultHoustonShopping;
    }

    // Dallas defaults
    if (!parsed["Dallas (TX)"]) {
      parsed["Dallas (TX)"] = { food: [], shopping: defaultDallasShopping, misc: [] };
    } else {
      parsed["Dallas (TX)"].shopping = defaultDallasShopping;
    }
    if (!parsed["Dallas"]) {
      parsed["Dallas"] = { food: [], shopping: defaultDallasShopping, misc: [] };
    } else {
      parsed["Dallas"].shopping = defaultDallasShopping;
    }

    return parsed;
  });

  const [inputState, setInputState] = useState({});

  useEffect(() => {
    localStorage.setItem('pensacola2028_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('pensacola2028_region_reminders', JSON.stringify(regionReminders));
  }, [regionReminders]);

  const regions = ['Alle', ...new Set(initialItinerary.map(item => item.region))];

  const filteredItinerary = selectedRegion === 'Alle' 
    ? initialItinerary 
    : initialItinerary.filter(item => item.region === selectedRegion);

  const toggleExpand = (id) => {
    setExpandedDay(expandedDay === id ? null : id);
  };

  const handleAddNote = (dayId, category) => {
    const text = inputState[`${dayId}-${category}`];
    if (!text || !text.trim()) return;

    setReminders(prev => {
      const dayNotes = prev[dayId] || { food: [], shopping: [], misc: [] };
      return {
        ...prev,
        [dayId]: {
          ...dayNotes,
          [category]: [...(dayNotes[category] || []), text.trim()]
        }
      };
    });

    setInputState(prev => ({ ...prev, [`${dayId}-${category}`]: '' }));
  };

  const handleDeleteNote = (dayId, category, index) => {
    setReminders(prev => {
      const dayNotes = prev[dayId];
      if (!dayNotes) return prev;
      const updatedCat = dayNotes[category].filter((_, i) => i !== index);
      return {
        ...prev,
        [dayId]: {
          ...dayNotes,
          [category]: updatedCat
        }
      };
    });
  };

  const handleAddRegionNote = (regionName, category) => {
    const text = inputState[`reg-${regionName}-${category}`];
    if (!text || !text.trim()) return;

    setRegionReminders(prev => {
      const regNotes = prev[regionName] || { food: [], shopping: [], misc: [] };
      return {
        ...prev,
        [regionName]: {
          ...regNotes,
          [category]: [...(regNotes[category] || []), text.trim()]
        }
      };
    });

    setInputState(prev => ({ ...prev, [`reg-${regionName}-${category}`]: '' }));
  };

  const handleDeleteRegionNote = (regionName, category, index) => {
    setRegionReminders(prev => {
      const regNotes = prev[regionName];
      if (!regNotes) return prev;
      const updatedCat = regNotes[category].filter((_, i) => i !== index);
      return {
        ...prev,
        [regionName]: {
          ...regNotes,
          [category]: updatedCat
        }
      };
    });
  };

  const currentRegionNotes = regionReminders[selectedRegion] || { food: [], shopping: [], misc: [] };
  const totalRegionNotes = (currentRegionNotes.food?.length || 0) + (currentRegionNotes.shopping?.length || 0) + (currentRegionNotes.misc?.length || 0);

  const activeVisual = regionVisuals[selectedRegion] || regionVisuals['Alle'];
  const isSelectedFlorida = initialItinerary.find(i => i.region === selectedRegion)?.isFlorida || selectedRegion === 'Pensacola';
  const currentWaterTemp = regionCoords[selectedRegion]?.waterTemp;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 font-sans relative overflow-x-hidden">
      {/* Background Glow Accents */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Banner */}
      <header className="max-w-4xl mx-auto mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-slate-900/60 backdrop-blur-xl">
        <div 
          className="h-44 sm:h-52 bg-cover bg-center relative transition-all duration-700"
          style={{ backgroundImage: `url(${activeVisual.bg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${activeTab === 'plan' ? 'bg-teal-600/90 text-white shadow-lg border border-teal-400/40' : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-white/10'}`}
            >
              Reiseplan
            </button>
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${activeTab === 'overview' ? 'bg-teal-600/90 text-white shadow-lg border border-teal-400/40' : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-white/10'}`}
            >
              Übersicht
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-teal-300 uppercase bg-teal-400/10 px-2.5 py-1 rounded-full border border-teal-400/20 backdrop-blur-md">
                20. Mai – 09. Juni 2028
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 drop-shadow-md">
                Pensacola & Südstaaten 2028
              </h1>
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Live Weather Widget */}
              <div className="bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg">
                <CloudSun className="w-4 h-4 text-sky-400" />
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Luft</p>
                  <p className="text-xs font-bold text-sky-200">
                    {weather.loading ? '...' : `${weather.temp}°C`}
                  </p>
                </div>
              </div>

              {/* Water Temperature Widget */}
              {currentWaterTemp && (
                <div className="bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-teal-500/30 flex items-center gap-2 shadow-lg">
                  <Waves className="w-4 h-4 text-teal-300" />
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider text-teal-300 font-medium">Wasser</p>
                    <p className="text-xs font-bold text-teal-200">{currentWaterTemp}</p>
                  </div>
                </div>
              )}

              {/* Countdown Badge */}
              <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex items-center gap-2.5 shadow-lg">
                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Countdown</p>
                  <p className="text-xs font-bold text-amber-300">
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {activeTab === 'plan' && (
        <main className="max-w-4xl mx-auto space-y-5">
          {/* Region Filter Bar (Glassmorphism) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-slate-900/40 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
            <Compass className="w-4 h-4 text-teal-400 ml-2 flex-shrink-0" />
            {regions.map(r => {
              const isFl = r === 'Pensacola' || r.includes('Florida');
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedRegion === r 
                      ? (isFl 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg border border-teal-400/40' 
                          : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg border border-orange-400/40')
                      : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-white/5'
                  }`}
                >
                  {isFl && <Palmtree className="w-3 h-3 text-teal-300" />}
                  {!isFl && r !== 'Alle' && <Sun className="w-3 h-3 text-amber-400" />}
                  {r}
                </button>
              );
            })}
          </div>

          {/* Region Overview Card */}
          <div className={`rounded-2xl border shadow-xl overflow-hidden backdrop-blur-xl transition-all ${
            isSelectedFlorida 
              ? 'bg-gradient-to-b from-teal-950/40 to-slate-900/60 border-teal-500/30' 
              : 'bg-gradient-to-b from-amber-950/30 to-slate-900/60 border-amber-500/20'
          }`}>
            <button 
              onClick={() => setIsRegionNotesExpanded(!isRegionNotesExpanded)}
              className={`w-full p-4 flex items-center justify-between text-left transition-all ${
                isSelectedFlorida ? 'bg-teal-900/20 hover:bg-teal-900/30' : 'bg-amber-900/20 hover:bg-amber-900/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${
                  isSelectedFlorida ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    Allgemeine Notizen für: 
                    <span className={isSelectedFlorida ? 'text-teal-300 font-extrabold' : 'text-amber-400 font-extrabold'}>
                      {selectedRegion}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {isSelectedFlorida ? '🌴 Florida & Strand Tipps' : '🤠 Südstaaten & Outlet Tipps'} ({totalRegionNotes} Einträge)
                  </p>
                </div>
              </div>
              {isRegionNotesExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {isRegionNotesExpanded && (
              <div className="p-4 bg-slate-950/80 border-t border-white/5 space-y-4">
                {/* Food Category */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Utensils className="w-3.5 h-3.5" /> Gastro & Restaurant-Tipps für {selectedRegion}
                  </div>
                  <ul className="space-y-1.5">
                    {currentRegionNotes.food?.map((note, i) => (
                      <li key={i} className="flex justify-between items-center text-xs bg-slate-900/90 p-2.5 rounded-xl border border-white/5">
                        <span className="text-slate-200">{note}</span>
                        <button onClick={() => handleDeleteRegionNote(selectedRegion, 'food', i)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder={`Neuer Restaurant-Tipp für ${selectedRegion}...`}
                      className="flex-1 text-xs bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500 text-slate-200 placeholder:text-slate-500"
                      value={inputState[`reg-${selectedRegion}-food`] || ''}
                      onChange={e => setInputState({ ...inputState, [`reg-${selectedRegion}-food`]: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleAddRegionNote(selectedRegion, 'food')}
                    />
                    <button onClick={() => handleAddRegionNote(selectedRegion, 'food')} className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition-all shadow-md"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Shopping Category */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-pink-400">
                    <ShoppingBag className="w-3.5 h-3.5" /> Shopping & Malls für {selectedRegion}
                  </div>
                  <ul className="space-y-1.5">
                    {currentRegionNotes.shopping?.map((note, i) => (
                      <li key={i} className="flex justify-between items-center text-xs bg-slate-900/90 p-2.5 rounded-xl border border-white/5">
                        <span className="text-slate-200">{note}</span>
                        <button onClick={() => handleDeleteRegionNote(selectedRegion, 'shopping', i)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder={`Shopping-Tipp für ${selectedRegion}...`}
                      className="flex-1 text-xs bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500 text-slate-200 placeholder:text-slate-500"
                      value={inputState[`reg-${selectedRegion}-shopping`] || ''}
                      onChange={e => setInputState({ ...inputState, [`reg-${selectedRegion}-shopping`]: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleAddRegionNote(selectedRegion, 'shopping')}
                    />
                    <button onClick={() => handleAddRegionNote(selectedRegion, 'shopping')} className="bg-pink-600 hover:bg-pink-500 text-white p-2 rounded-xl transition-all shadow-md"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Misc Category */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                    <FileText className="w-3.5 h-3.5" /> Sonstiges & Highlights für {selectedRegion}
                  </div>
                  <ul className="space-y-1.5">
                    {currentRegionNotes.misc?.map((note, i) => (
                      <li key={i} className="flex justify-between items-center text-xs bg-slate-900/90 p-2.5 rounded-xl border border-white/5">
                        <span className="text-slate-200">{note}</span>
                        <button onClick={() => handleDeleteRegionNote(selectedRegion, 'misc', i)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder={`Reminder/Highlight für ${selectedRegion}...`}
                      className="flex-1 text-xs bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500 text-slate-200 placeholder:text-slate-500"
                      value={inputState[`reg-${selectedRegion}-misc`] || ''}
                      onChange={e => setInputState({ ...inputState, [`reg-${selectedRegion}-misc`]: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleAddRegionNote(selectedRegion, 'misc')}
                    />
                    <button onClick={() => handleAddRegionNote(selectedRegion, 'misc')} className="bg-sky-600 hover:bg-sky-500 text-white p-2 rounded-xl transition-all shadow-md"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Daily Cards */}
          <div className="space-y-4">
            {filteredItinerary.map((item) => {
              const dayNotes = reminders[item.id] || { food: [], shopping: [], misc: [] };
              const isExpanded = expandedDay === item.id;
              const totalNotes = (dayNotes.food?.length || 0) + (dayNotes.shopping?.length || 0) + (dayNotes.misc?.length || 0);
              const isDayFlorida = item.isFlorida || item.region === 'Pensacola';

              return (
                <div key={item.id} className="bg-slate-900/50 rounded-2xl border border-white/10 shadow-lg overflow-hidden backdrop-blur-md transition-all hover:border-white/20">
                  <div className="p-4 sm:p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <h2 className="font-bold text-slate-100 text-base">{item.date}</h2>
                      </div>
                      
                      {/* Region Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md ${
                        item.isFlight 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : (isDayFlorida 
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' 
                              : 'bg-orange-500/20 text-orange-300 border border-orange-500/30')
                      }`}>
                        {item.isFlight ? <Plane className="w-3 h-3" /> : (isDayFlorida ? <Palmtree className="w-3 h-3" /> : <Car className="w-3 h-3" />)}
                        {item.region}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-xs mb-3">
                      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                        <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-1">Vormittag</span>
                        <p className="text-slate-300 font-medium leading-relaxed">{item.morning}</p>
                      </div>
                      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">Nachmittag / Abend</span>
                        <p className="text-slate-300 font-medium leading-relaxed">{item.evening}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-950/40 p-3 rounded-xl border border-white/5 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <span>Tages-Reminder & Notizen</span>
                        {totalNotes > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
                            {totalNotes}
                          </span>
                        )}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="bg-slate-950/90 p-4 border-t border-white/10 space-y-4">
                      {/* Daily Essen Category */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                          <Utensils className="w-3.5 h-3.5" /> Essensvorschläge für {item.date}
                        </div>
                        <ul className="space-y-1.5">
                          {dayNotes.food?.map((note, i) => (
                            <li key={i} className="flex justify-between items-center text-xs bg-slate-900/90 p-2.5 rounded-xl border border-white/5">
                              <span className="text-slate-200">{note}</span>
                              <button onClick={() => handleDeleteNote(item.id, 'food', i)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="z. B. Restaurant, Diner..."
                            className="flex-1 text-xs bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500 text-slate-200 placeholder:text-slate-500"
                            value={inputState[`${item.id}-food`] || ''}
                            onChange={e => setInputState({ ...inputState, [`${item.id}-food`]: e.target.value })}
                            onKeyDown={e => e.key === 'Enter' && handleAddNote(item.id, 'food')}
                          />
                          <button onClick={() => handleAddNote(item.id, 'food')} className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition-all shadow-md"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>

                      {/* Daily Shopping Category */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-pink-400">
                          <ShoppingBag className="w-3.5 h-3.5" /> Shopping für {item.date}
                        </div>
                        <ul className="space-y-1.5">
                          {dayNotes.shopping?.map((note, i) => (
                            <li key={i} className="flex justify-between items-center text-xs bg-slate-900/90 p-2.5 rounded-xl border border-white/5">
                              <span className="text-slate-200">{note}</span>
                              <button onClick={() => handleDeleteNote(item.id, 'shopping', i)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="z. B. Outlet, Mall..."
                            className="flex-1 text-xs bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500 text-slate-200 placeholder:text-slate-500"
                            value={inputState[`${item.id}-shopping`] || ''}
                            onChange={e => setInputState({ ...inputState, [`${item.id}-shopping`]: e.target.value })}
                            onKeyDown={e => e.key === 'Enter' && handleAddNote(item.id, 'shopping')}
                          />
                          <button onClick={() => handleAddNote(item.id, 'shopping')} className="bg-pink-600 hover:bg-pink-500 text-white p-2 rounded-xl transition-all shadow-md"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>

                      {/* Daily Misc Category */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                          <FileText className="w-3.5 h-3.5" /> Sonstiges für {item.date}
                        </div>
                        <ul className="space-y-1.5">
                          {dayNotes.misc?.map((note, i) => (
                            <li key={i} className="flex justify-between items-center text-xs bg-slate-900/90 p-2.5 rounded-xl border border-white/5">
                              <span className="text-slate-200">{note}</span>
                              <button onClick={() => handleDeleteNote(item.id, 'misc', i)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="z. B. Notizen, Tickets..."
                            className="flex-1 text-xs bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500 text-slate-200 placeholder:text-slate-500"
                            value={inputState[`${item.id}-misc`] || ''}
                            onChange={e => setInputState({ ...inputState, [`${item.id}-misc`]: e.target.value })}
                            onKeyDown={e => e.key === 'Enter' && handleAddNote(item.id, 'misc')}
                          />
                          <button onClick={() => handleAddNote(item.id, 'misc')} className="bg-sky-600 hover:bg-sky-500 text-white p-2 rounded-xl transition-all shadow-md"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      )}

      {activeTab === 'overview' && (
        <main className="max-w-4xl mx-auto bg-slate-900/60 p-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-4 text-teal-400">Reiseübersicht & Key-Facts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-semibold text-emerald-400 mb-1 uppercase tracking-wider">Gesamtdauer</h3>
              <p className="text-2xl font-black text-slate-100">21 Tage</p>
            </div>
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">Stationen</h3>
              <p className="text-2xl font-black text-slate-100">5 Hauptziele</p>
            </div>
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-semibold text-indigo-400 mb-1 uppercase tracking-wider">Shopping-Hotspots</h3>
              <p className="text-2xl font-black text-slate-100">13 Malls & Outlets</p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
