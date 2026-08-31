import React from 'react';
import { 
  Waves, 
  MapPin, 
  Compass, 
  BookOpen, 
  Sparkles, 
  Bookmark, 
  Search,
  Sunset,
  Youtube
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
  sunsetMinutesLeft: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenBookmarks,
  bookmarkCount,
  sunsetMinutesLeft,
}) => {
  const navItems = [
    { id: 'map', label: '한강 지도', icon: MapPin },
    { id: 'parks', label: '11개 공원 탐색', icon: Waves },
    { id: 'guide', label: '한강 꿀팁 백과', icon: BookOpen },
    { id: 'planner', label: '맞춤 코스 플래너', icon: Compass },
    { id: 'live', label: '라이브 한강 & 노을', icon: Sparkles },
    { id: 'youtube', label: '유튜브', icon: Youtube },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#020617]/75 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform border border-white/20">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 whitespace-nowrap">
                <span className="font-bold text-lg text-white tracking-tight">서울 한강공원</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-400/30">Guide</span>
              </div>
              <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Seoul Hangang River Parks</p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40 shadow-lg shadow-sky-500/20 backdrop-blur-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Sunset Ticker Pill */}
            <button
              onClick={() => setActiveTab('live')}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs font-medium hover:bg-amber-500/25 transition-all cursor-pointer backdrop-blur-md shadow-sm whitespace-nowrap"
            >
              <Sunset className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
              <span className="whitespace-nowrap">일몰까지 <strong className="font-bold text-amber-300">{sunsetMinutesLeft > 0 ? `${sunsetMinutesLeft}분` : '일몰 진행중'}</strong></span>
            </button>

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer backdrop-blur-md whitespace-nowrap shrink-0"
              title="공원 & 꿀팁 검색"
            >
              <Search className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="whitespace-nowrap font-medium">빠른 검색</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/10 border border-white/20 rounded text-slate-300 shrink-0 font-mono">⌘K</kbd>
            </button>

            {/* Bookmark Drawer Trigger */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-sky-300 transition-colors cursor-pointer backdrop-blur-md"
              title="찜한 공원 & 코스"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce shadow-md">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-white/10 space-x-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-sky-500/40 text-sky-200 border border-sky-400/40'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
