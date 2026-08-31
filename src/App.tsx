/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HANGANG_PARKS, HANGANG_COURSES } from './data/hangangData';
import { HangangPark, HangangCourse } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveMap } from './components/InteractiveMap';
import { ParkList } from './components/ParkList';
import { HangangLifeGuide } from './components/HangangLifeGuide';
import { CoursePlanner } from './components/CoursePlanner';
import { HangangLiveStatus } from './components/HangangLiveStatus';
import { HangangYouTube } from './components/HangangYouTube';
import { ParkDetailModal } from './components/ParkDetailModal';
import { BookmarkDrawer } from './components/BookmarkDrawer';
import { Footer } from './components/Footer';
import { Search, X, MapPin, Waves, Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedParkId, setSelectedParkId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isBookmarkDrawerOpen, setIsBookmarkDrawerOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  
  // Bookmarks persistence
  const [bookmarkedParkIds, setBookmarkedParkIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hangang_bookmarked_parks');
      return saved ? JSON.parse(saved) : ['yeouido', 'banpo'];
    } catch {
      return ['yeouido', 'banpo'];
    }
  });

  // Saved Courses persistence
  const [savedCourses, setSavedCourses] = useState<HangangCourse[]>(() => {
    try {
      const saved = localStorage.getItem('hangang_saved_courses');
      return saved ? JSON.parse(saved) : [HANGANG_COURSES[0]];
    } catch {
      return [HANGANG_COURSES[0]];
    }
  });

  // Sunset calculation
  const [sunsetMinutesLeft, setSunsetMinutesLeft] = useState<number>(120);

  useEffect(() => {
    const calcMinutes = () => {
      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes();
      const sunsetMin = 19 * 60 + 15; // 19:15 sunset
      setSunsetMinutesLeft(Math.max(0, sunsetMin - currentMin));
    };
    calcMinutes();
    const interval = setInterval(calcMinutes, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sync Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('hangang_bookmarked_parks', JSON.stringify(bookmarkedParkIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedParkIds]);

  // Sync Courses to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('hangang_saved_courses', JSON.stringify(savedCourses));
    } catch (e) {
      console.error(e);
    }
  }, [savedCourses]);

  // Keyboard shortcut for quick search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPark = (parkId: string) => {
    setSelectedParkId(parkId);
    setIsDetailModalOpen(true);
  };

  const handleToggleBookmarkPark = (parkId: string) => {
    setBookmarkedParkIds((prev) =>
      prev.includes(parkId) ? prev.filter((id) => id !== parkId) : [...prev, parkId]
    );
  };

  const handleSaveCourse = (course: HangangCourse) => {
    setSavedCourses((prev) => {
      if (prev.some((c) => c.id === course.id)) {
        return prev.filter((c) => c.id !== course.id);
      }
      return [...prev, course];
    });
  };

  const handleRemoveCourse = (courseId: string) => {
    setSavedCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const selectedPark = HANGANG_PARKS.find((p) => p.id === selectedParkId) || null;

  // Search Results for Quick Search Modal
  const quickSearchResults = searchQuery.trim()
    ? HANGANG_PARKS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subway.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : HANGANG_PARKS.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
      {/* Ambient Frosted Glass Background Orbs & Radial Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[650px] h-[650px] bg-sky-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[130px]" />
        <div className="absolute top-2/3 -left-32 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-[150px]" />
        <div className="absolute -bottom-20 right-1/4 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-[180px]" />
      </div>

      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenBookmarks={() => setIsBookmarkDrawerOpen(true)}
        bookmarkCount={bookmarkedParkIds.length + savedCourses.length}
        sunsetMinutesLeft={sunsetMinutesLeft}
      />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full space-y-10">
        {/* View Component Switcher */}
        <div className="transition-all duration-300">
          {activeTab === 'home' && (
            <HeroSection
              onSearch={(query) => {
                setSearchQuery(query);
                setActiveTab('parks');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectTag={(tag) => {
                setSearchQuery(tag);
                setActiveTab('parks');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectPark={handleSelectPark}
            />
          )}

          {activeTab === 'map' && (
            <InteractiveMap
              onSelectPark={handleSelectPark}
              selectedParkId={selectedParkId}
            />
          )}

          {activeTab === 'parks' && (
            <ParkList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              bookmarks={bookmarkedParkIds}
              onToggleBookmark={handleToggleBookmarkPark}
              onSelectPark={handleSelectPark}
            />
          )}

          {activeTab === 'guide' && <HangangLifeGuide />}

          {activeTab === 'planner' && (
            <CoursePlanner
              onSelectPark={handleSelectPark}
              onSaveCourse={handleSaveCourse}
              savedCourseIds={savedCourses.map((c) => c.id)}
            />
          )}

          {activeTab === 'live' && (
            <HangangLiveStatus onSelectPark={handleSelectPark} />
          )}

          {activeTab === 'youtube' && (
            <HangangYouTube onSelectPark={handleSelectPark} />
          )}
        </div>
      </main>

      {/* Park Detail Modal */}
      <ParkDetailModal
        park={selectedPark}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isBookmarked={selectedPark ? bookmarkedParkIds.includes(selectedPark.id) : false}
        onToggleBookmark={handleToggleBookmarkPark}
      />

      {/* Bookmarks & Checklist Drawer */}
      <BookmarkDrawer
        isOpen={isBookmarkDrawerOpen}
        onClose={() => setIsBookmarkDrawerOpen(false)}
        bookmarkedParkIds={bookmarkedParkIds}
        savedCourses={savedCourses}
        onToggleBookmarkPark={handleToggleBookmarkPark}
        onRemoveCourse={handleRemoveCourse}
        onSelectPark={handleSelectPark}
      />

      {/* Quick Search Modal Popup (⌘K) */}
      {isSearchModalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fade-in"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div 
            className="bg-slate-900/90 backdrop-blur-2xl w-full max-w-xl rounded-2xl shadow-2xl border border-white/15 overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/10 flex items-center space-x-3">
              <Search className="w-5 h-5 text-sky-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="공원 이름, 지하철역, 배달존, 텐트, 라면 검색..."
                className="w-full text-sm font-medium text-white placeholder:text-slate-400 bg-transparent focus:outline-hidden"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 max-h-80 overflow-y-auto space-y-1">
              <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                {searchQuery ? '검색 결과' : '추천 한강공원'}
              </div>
              {quickSearchResults.map((park) => (
                <div
                  key={park.id}
                  onClick={() => {
                    handleSelectPark(park.id);
                    setIsSearchModalOpen(false);
                  }}
                  className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between cursor-pointer group transition-colors border border-transparent hover:border-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center font-bold text-xs">
                      <Waves className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300">
                        {park.name}
                      </h4>
                      <p className="text-xs text-slate-400">{park.region} • {park.subway}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-300 transition-colors" />
                </div>
              ))}
            </div>

            <div className="p-3 bg-white/[0.03] border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>ESC를 누르면 닫힙니다.</span>
              <button
                onClick={() => {
                  setActiveTab('parks');
                  setIsSearchModalOpen(false);
                }}
                className="text-sky-400 font-bold hover:underline"
              >
                전체 결과 목록 보기 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
