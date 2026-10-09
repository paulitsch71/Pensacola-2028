import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Plane, Utensils, ShoppingBag, 
  FileText, Plus, Trash2, ChevronDown, ChevronUp 
} from 'lucide-react';

const initialItinerary = [
  { id: 1, date: "Do, 13.05.2027", region: "Oahu (Honolulu)", isFlight: true, morning: "Flug von Frankfurt (FRA) nach Honolulu (HNL)", evening: "Landung in Honolulu, Transfer & Hotel-Check-in" },
  { id: 2, date: "Fr, 14.05.2027", region: "Oahu (Honolulu)", morning: "Freizeit in Honolulu (z. B. Waikiki Beach)", evening: "Entspannung nach dem Langstreckenflug" },
  { id: 3, date: "Sa, 15.05.2027", region: "Oahu (Honolulu)", morning: "Erkundung von Oahu auf eigene Faust", evening: "Freizeit auf der Hauptinsel" },
  { id: 4, date: "So, 16.05.2027", region: "Oahu (Honolulu)", morning: "Ausflug oder Strandtag auf Oahu", evening: "Abendstimmung in Honolulu genießen" },
  { id: 5, date: "Mo, 17.05.2027", region: "Maui (Kahului)", isFlight: true, morning: "Inselwechsel: Flug von Honolulu (HNL) nach Kahului (OGG), Maui", evening: "Mietwagenübernahme & Hotel-Check-in auf Maui" },
  { id: 6, date: "Di, 18.05.2027", region: "Maui", morning: "Erkundung von Maui (z. B. Road to Hana oder Strände)", evening: "Gemütlicher Abend auf Maui" },
  { id: 7, date: "Mi, 19.05.2027", region: "Maui", morning: "Freizeit auf Maui / Aktivität nach Wahl", evening: "Entspannung im Resort / Ort" },
  { id: 8, date: "Do, 20.05.2027", region: "Maui", morning: "Weiterer Tag für Highlight-Spots auf Maui", evening: "Sonnenuntergang genießen" },
  { id: 9, date: "Fr, 21.05.2027", region: "Big Island (Kona)", isFlight: true, morning: "Inselwechsel: Flug von Kahului (OGG) nach Kona (KOA), Big Island", evening: "Ankunft, Mietwagen & Hotel-Check-in in Kona" },
  { id: 10, date: "Sa, 22.05.2027", region: "Big Island", morning: "Erkundung der Vulkaninsel (z. B. Kona Coast / Hawaii Volcanoes NP)", evening: "Abend in Kona" },
  { id: 11, date: "So, 23.05.2027", region: "Big Island", morning: "Freizeit oder Ausflug auf Big Island", evening: "Entspannter Ausklang" },
  { id: 12, date: "Mo, 24.05.2027", region: "Big Island", morning: "Letzter voller Tag auf Big Island", evening: "Vorbereitung auf den Weiterflug" },
  { id: 13, date: "Di, 25.05.2027", region: "Phoenix (Arizona)", isFlight: true, morning: "Flug von Kona (KOA) nach Phoenix (PHX)", evening: "Ankunft in Arizona, Transfer & Check-in" },
  { id: 14, date: "Mi, 26.05.2027", region: "Phoenix", morning: "Erkundung von Phoenix / Scottsdale", evening: "Abendessen & Freizeit in Phoenix" },
  { id: 15, date: "Do, 27.05.2027", region: "Rancho Cucamonga (CA)", isFlight: true, morning: "Fahrt / Flug nach Rancho Cucamonga, Kalifornien", evening: "Check-in & Entspannung" },
  { id: 16, date: "Fr, 28.05.2027", region: "Rancho Cucamonga", morning: "Tag in Rancho Cucamonga / Umgebung", evening: "Freizeit" },
  { id: 17, date: "Sa, 29.05.2027", region: "Los Angeles", morning: "Weiterfahrt nach Los Angeles", evening: "Check-in & erste Eindrücke in LA" },
  { id: 18, date: "So, 30.05.2027", region: "Los Angeles", morning: "Sightseeing in LA (z. B. Hollywood, Santa Monica)", evening: "Abendprogramm in LA" },
  { id: 19, date: "Mo, 31.05.2027", region: "Los Angeles", morning: "Freizeit in Los Angeles", evening: "Letzter Abend der Reise" },
  { id: 20, date: "Di, 01.06.2027", region: "Flug", isFlight: true, morning: "Rückflug ab Los Angeles (LAX)", evening: "Nachtflug Richtung Europa" },
  { id: 21, date: "Mi, 02.06.2027", region: "Flug", isFlight: true, morning: "Flug / Zwischenstopp", evening: "Weiterflug nach Frankfurt" },
  { id: 22, date: "Do, 03.06.2027", region: "Frankfurt (Ankunft)", morning: "Ankunft am Flughafen Frankfurt (FRA)", evening: "Heimreise" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('plan');
  const [selectedRegion, setSelectedRegion] = useState('Alle');
  const [expandedDay, setExpandedDay] = useState(null);

  // LocalStorage state for notes
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('usa2027_reminders');
    return saved ? JSON.parse(saved) : {};
  });

  const [inputState, setInputState] = useState({});

  useEffect(() => {
    localStorage.setItem('usa2027_reminders', JSON.stringify(reminders));
  }, [reminders]);

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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <header className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
            <Plane className="w-6 h-6 text-indigo-400" /> USA & Hawaii 2027
          </h1>
          <p className="text-xs text-slate-400">13. Mai 2027 – 03. Juni 2027</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'plan' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            Reiseplan
          </button>
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            Übersicht
          </button>
        </div>
      </header>

      {activeTab === 'plan' && (
        <main className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-1">Region:</span>
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedRegion === r ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredItinerary.map((item) => {
              const dayNotes = reminders[item.id] || { food: [], shopping: [], misc: [] };
              const isExpanded = expandedDay === item.id;
              const totalNotes = (dayNotes.food?.length || 0) + (dayNotes.shopping?.length || 0) + (dayNotes.misc?.length || 0);

              return (
                <div key={item.id} className="bg-slate-800/90 rounded-xl border border-slate-700 shadow-md overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <h2 className="font-bold text-slate-100">{item.date}</h2>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${item.isFlight ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                        {item.isFlight ? <Plane className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {item.region}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">Vormittag</span>
                        <p className="text-slate-300">{item.morning}</p>
                      </div>
                      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-1">Nachmittag / Abend</span>
                        <p className="text-slate-300">{item.evening}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <span>Reminder & Ideen {totalNotes > 0 && `(${totalNotes})`}</span>
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="bg-slate-900/90 p-4 border-t border-slate-700/60 space-y-4">
                      {/* Essen Category */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                          <Utensils className="w-3.5 h-3.5" /> Essensvorschläge & Gastro
                        </div>
                        <ul className="space-y-1">
                          {dayNotes.food?.map((note, i) => (
                            <li key={i} className="flex justify-between items-center text-xs bg-slate-800 p-2 rounded border border-slate-700">
                              <span>{note}</span>
                              <button onClick={() => handleDeleteNote(item.id, 'food', i)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3 h-3" /></button>
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="z. B. Poke Bowl bei Foodtruck X..."
                            className="flex-1 text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500 text-slate-200"
                            value={inputState[`${item.id}-food`] || ''}
                            onChange={e => setInputState({ ...inputState, [`${item.id}-food`]: e.target.value })}
                            onKeyDown={e => e.key === 'Enter' && handleAddNote(item.id, 'food')}
                          />
                          <button onClick={() => handleAddNote(item.id, 'food')} className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>

                      {/* Shopping Category */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-pink-400">
                          <ShoppingBag className="w-3.5 h-3.5" /> Shopping & Outlets
                        </div>
                        <ul className="space-y-1">
                          {dayNotes.shopping?.map((note, i) => (
                            <li key={i} className
