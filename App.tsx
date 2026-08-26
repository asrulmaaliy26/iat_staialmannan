import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Curriculum from './pages/Curriculum';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Journals from './pages/Journals';
import JournalDetail from './pages/JournalDetail';
import Facilities from './pages/Facilities';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import ManageNews from './pages/Admin/ManageNews';
import CreateNews from './pages/Admin/CreateNews';
import EditNews from './pages/Admin/EditNews';
import ManageProjects from './pages/Admin/ManageProjects';
import CreateProject from './pages/Admin/CreateProject';
import EditProject from './pages/Admin/EditProject';
import ManageJournals from './pages/Admin/ManageJournals';
import CreateJournal from './pages/Admin/CreateJournal';
import EditJournal from './pages/Admin/EditJournal';

import { MessageCircle, X, Send, Sparkles, BookOpen } from 'lucide-react';
import { getSchoolAssistantResponse } from './services/gemini';
import { EducationLevel, LevelConfigData } from './types';
import { fetchLevelConfig } from './services/api';
import { CacheProvider } from './context/CacheContext';
import { ToastProvider } from './components/ToastProvider';

export const LevelContext = createContext<{
  activeLevel: EducationLevel;
  setActiveLevel: (level: EducationLevel) => void;
}>({ activeLevel: 'KAMPUS', setActiveLevel: () => { } });

export const LevelConfigContext = createContext<LevelConfigData | null>(null);

const App: React.FC = () => {
  const location = useLocation();
  const [activeLevel, setActiveLevel] = useState<EducationLevel>('KAMPUS');
  const [levelConfig, setLevelConfig] = useState<LevelConfigData | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await fetchLevelConfig();
        setLevelConfig(config);
      } catch (err) {
        console.error(err);
        setLevelConfig({
          KAMPUS: {
            name: 'STAI AL Mannan',
            type: 'Sekolah Tinggi Agama Islam',
            color: 'islamic-green',
            bg: 'bg-emerald-800',
            text: 'text-emerald-800'
          }
        });
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSendChat = async () => {
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage('');
    setIsTyping(true);
    try {
      const botResponse = await getSchoolAssistantResponse(userMsg);
      setChatHistory((prev) => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { role: 'bot', text: "Maaf, sedang ada kendala jaringan. Silakan coba sesaat lagi." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ToastProvider>
      <CacheProvider>
        <LevelContext.Provider value={{ activeLevel, setActiveLevel }}>
          <LevelConfigContext.Provider value={levelConfig}>
            <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
              {!isAdminPath && <Navbar />}
              
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/tentang/:section" element={<About />} />
                  <Route path="/kurikulum" element={<Curriculum />} />
                  <Route path="/berita" element={<News />} />
                  <Route path="/berita/:id" element={<NewsDetail />} />
                  <Route path="/projek" element={<Projects />} />
                  <Route path="/projek/:id" element={<ProjectDetail />} />
                  <Route path="/jurnal" element={<Journals />} />
                  <Route path="/jurnal/:id" element={<JournalDetail />} />
                  <Route path="/fasilitas" element={<Facilities />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="news" element={<ManageNews />} />
                    <Route path="news/create" element={<CreateNews />} />
                    <Route path="news/edit/:id" element={<EditNews />} />
                    <Route path="projects" element={<ManageProjects />} />
                    <Route path="projects/create" element={<CreateProject />} />
                    <Route path="projects/edit/:id" element={<EditProject />} />
                    <Route path="journals" element={<ManageJournals />} />
                    <Route path="journals/create" element={<CreateJournal />} />
                    <Route path="journals/edit/:id" element={<EditJournal />} />
                  </Route>
                </Routes>
              </main>

              {!isAdminPath && <Footer />}

              {/* Floating AI Virtual Assistant */}
              {!isAdminPath && (
                <div className="fixed bottom-6 right-6 z-[60]">
                  {!isChatOpen ? (
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group border border-emerald-600/40"
                      aria-label="Tanya Asisten AI IAT"
                    >
                      <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap px-0 group-hover:px-2 text-xs">
                        Asisten Virtual IAT
                      </span>
                    </button>
                  ) : (
                    <div className="bg-white w-80 sm:w-96 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[520px] animate-fadeIn">
                      {/* Chat Header */}
                      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 p-5 flex justify-between items-center text-white border-b border-emerald-800/40">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-800/80 rounded-xl">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                          </div>
                          <div>
                            <p className="font-extrabold text-xs">Asisten AI Prodi IAT</p>
                            <p className="text-[10px] text-emerald-300">Fakultas Ushuluddin STAI Al-Mannan</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsChatOpen(false)}
                          className="hover:rotate-90 transition-transform p-1 text-slate-300 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Chat Messages */}
                      <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
                        {chatHistory.length === 0 && (
                          <div className="text-center py-8 px-4 space-y-2">
                            <div className="bg-emerald-100 p-3.5 rounded-2xl w-fit mx-auto mb-2 text-emerald-800">
                              <MessageCircle className="w-7 h-7" />
                            </div>
                            <p className="text-slate-800 font-bold text-sm">Assalamu'alaikum!</p>
                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              Ada yang bisa saya bantu seputar Program Studi Ilmu Al-Qur'an dan Tafsir (IAT), kurikulum, beasiswa tahfidz, atau pendaftaran PMB online?
                            </p>
                          </div>
                        )}

                        {chatHistory.map((chat, idx) => (
                          <div
                            key={idx}
                            className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                                chat.role === 'user'
                                  ? 'bg-emerald-800 text-white rounded-br-none shadow-sm'
                                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                              }`}
                            >
                              {chat.text}
                            </div>
                          </div>
                        ))}

                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-white border border-slate-200 p-3 rounded-2xl flex gap-1.5 items-center">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                              <div className="w-2 h-2 bg-emerald-800 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chat Input */}
                      <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input
                          type="text"
                          className="flex-grow bg-slate-100 px-4 py-2.5 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-700"
                          placeholder="Ketik pertanyaan seputar prodi IAT..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                        />
                        <button
                          onClick={handleSendChat}
                          className="bg-emerald-800 hover:bg-emerald-900 text-white p-2.5 rounded-xl transition-colors shadow-sm"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </LevelConfigContext.Provider>
        </LevelContext.Provider>
      </CacheProvider>
    </ToastProvider>
  );
};

export default App;
