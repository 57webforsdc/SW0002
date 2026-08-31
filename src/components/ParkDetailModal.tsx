import React, { useState } from 'react';
import { HangangPark } from '../types';
import { HANGANG_YOUTUBE_VIDEOS } from '../data/youtubeData';
import { 
  X, 
  Bookmark, 
  Share2, 
  MapPin, 
  Train, 
  Car, 
  ShoppingBag, 
  Tent, 
  Sparkles, 
  Waves, 
  CheckCircle2, 
  ExternalLink,
  Clock,
  Compass,
  AlertTriangle,
  Info,
  Building,
  Ship,
  Camera,
  Trees,
  Footprints,
  BookOpen,
  Anchor,
  Flame,
  Music,
  Shield,
  Eye,
  Feather,
  Bike,
  Youtube,
  Film,
  Play,
  Search,
  ImageIcon
} from 'lucide-react';

interface ParkDetailModalProps {
  park: HangangPark | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (parkId: string) => void;
}

export const ParkDetailModal: React.FC<ParkDetailModalProps> = ({
  park,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transit' | 'food' | 'rules' | 'nearby' | 'youtube'>('overview');
  const [copiedToast, setCopiedToast] = useState(false);
  const [activeModalVideoId, setActiveModalVideoId] = useState<string | null>(null);

  if (!isOpen || !park) return null;

  const parkVideos = HANGANG_YOUTUBE_VIDEOS.filter(
    (v) => v.parkId === park.id || (park.id === 'yeouido' && v.tags.includes('여의도'))
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const googleImageSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(park.name + ' 실제 풍경')}`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(park.name + ' 브이로그')}`;

  const pastelThemes: Record<string, {
    headerBg: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    accentText: string;
    glowCircle1: string;
    glowCircle2: string;
    tagline: string;
    subtleWave: string;
    moodTheme: string;
  }> = {
    yeouido: {
      headerBg: 'from-rose-950/70 via-orange-950/40 to-slate-900/90',
      badgeBg: 'bg-rose-500/20',
      badgeBorder: 'border-rose-400/30',
      badgeText: 'text-rose-300',
      accentText: 'from-rose-200 via-orange-200 to-amber-200',
      glowCircle1: 'bg-rose-500/25',
      glowCircle2: 'bg-orange-400/20',
      tagline: 'text-rose-200/90',
      subtleWave: 'text-rose-400/20',
      moodTheme: '피치 코랄 파스텔 • 피크닉 & 불꽃축제',
    },
    banpo: {
      headerBg: 'from-purple-950/70 via-indigo-950/40 to-slate-900/90',
      badgeBg: 'bg-purple-500/20',
      badgeBorder: 'border-purple-400/30',
      badgeText: 'text-purple-300',
      accentText: 'from-purple-200 via-indigo-200 to-sky-200',
      glowCircle1: 'bg-purple-500/25',
      glowCircle2: 'bg-indigo-400/20',
      tagline: 'text-purple-200/90',
      subtleWave: 'text-purple-400/20',
      moodTheme: '라벤더 퍼플 파스텔 • 달빛무지개분수 & 야경',
    },
    ttukseom: {
      headerBg: 'from-teal-950/70 via-emerald-950/40 to-slate-900/90',
      badgeBg: 'bg-teal-500/20',
      badgeBorder: 'border-teal-400/30',
      badgeText: 'text-teal-300',
      accentText: 'from-teal-200 via-emerald-200 to-cyan-200',
      glowCircle1: 'bg-teal-500/25',
      glowCircle2: 'bg-emerald-400/20',
      tagline: 'text-teal-200/90',
      subtleWave: 'text-teal-400/20',
      moodTheme: '민트 시폼 파스텔 • 수상레저 & 힙플레이스',
    },
    mangwon: {
      headerBg: 'from-amber-950/70 via-orange-950/40 to-slate-900/90',
      badgeBg: 'bg-amber-500/20',
      badgeBorder: 'border-amber-400/30',
      badgeText: 'text-amber-300',
      accentText: 'from-amber-200 via-orange-200 to-rose-200',
      glowCircle1: 'bg-amber-500/25',
      glowCircle2: 'bg-rose-400/20',
      tagline: 'text-amber-200/90',
      subtleWave: 'text-amber-400/20',
      moodTheme: '살구 선셋 파스텔 • 성산대교 노을 & 망리단길',
    },
    nanji: {
      headerBg: 'from-emerald-950/70 via-lime-950/40 to-slate-900/90',
      badgeBg: 'bg-emerald-500/20',
      badgeBorder: 'border-emerald-400/30',
      badgeText: 'text-emerald-300',
      accentText: 'from-emerald-200 via-lime-200 to-teal-200',
      glowCircle1: 'bg-emerald-500/25',
      glowCircle2: 'bg-lime-400/20',
      tagline: 'text-emerald-200/90',
      subtleWave: 'text-emerald-400/20',
      moodTheme: '세이지 그린 파스텔 • 캠핑 & 에코 페스티벌',
    },
    jamsil: {
      headerBg: 'from-sky-950/70 via-blue-950/40 to-slate-900/90',
      badgeBg: 'bg-sky-500/20',
      badgeBorder: 'border-sky-400/30',
      badgeText: 'text-sky-300',
      accentText: 'from-sky-200 via-blue-200 to-indigo-200',
      glowCircle1: 'bg-sky-500/25',
      glowCircle2: 'bg-blue-400/20',
      tagline: 'text-sky-200/90',
      subtleWave: 'text-sky-400/20',
      moodTheme: '스카이 아쿠아 파스텔 • 롯데타워 뷰 & 수영장',
    },
    ichon: {
      headerBg: 'from-cyan-950/70 via-teal-950/40 to-slate-900/90',
      badgeBg: 'bg-cyan-500/20',
      badgeBorder: 'border-cyan-400/30',
      badgeText: 'text-cyan-300',
      accentText: 'from-cyan-200 via-teal-200 to-emerald-200',
      glowCircle1: 'bg-cyan-500/25',
      glowCircle2: 'bg-teal-400/20',
      tagline: 'text-cyan-200/90',
      subtleWave: 'text-cyan-400/20',
      moodTheme: '제이드 틸 파스텔 • 노들섬 연계 & 버드나무 숲길',
    },
    jamwon: {
      headerBg: 'from-pink-950/70 via-rose-950/40 to-slate-900/90',
      badgeBg: 'bg-pink-500/20',
      badgeBorder: 'border-pink-400/30',
      badgeText: 'text-pink-300',
      accentText: 'from-pink-200 via-rose-200 to-purple-200',
      glowCircle1: 'bg-pink-500/25',
      glowCircle2: 'bg-rose-400/20',
      tagline: 'text-pink-200/90',
      subtleWave: 'text-pink-400/20',
      moodTheme: '블러쉬 핑크 파스텔 • 핑크뮬리 그라스가든',
    },
    gwangnaru: {
      headerBg: 'from-amber-950/70 via-yellow-950/40 to-slate-900/90',
      badgeBg: 'bg-amber-500/20',
      badgeBorder: 'border-amber-400/30',
      badgeText: 'text-amber-300',
      accentText: 'from-amber-200 via-yellow-200 to-orange-200',
      glowCircle1: 'bg-amber-500/25',
      glowCircle2: 'bg-yellow-400/20',
      tagline: 'text-amber-200/90',
      subtleWave: 'text-amber-400/20',
      moodTheme: '버터 바닐라 파스텔 • 암사생태 & 드론공원',
    },
    yanghwa: {
      headerBg: 'from-rose-950/70 via-amber-950/40 to-slate-900/90',
      badgeBg: 'bg-rose-500/20',
      badgeBorder: 'border-rose-400/30',
      badgeText: 'text-rose-300',
      accentText: 'from-rose-200 via-amber-200 to-pink-200',
      glowCircle1: 'bg-rose-500/25',
      glowCircle2: 'bg-amber-400/20',
      tagline: 'text-rose-200/90',
      subtleWave: 'text-rose-400/20',
      moodTheme: '살몬 코랄 파스텔 • 선유도공원 & 양화카페',
    },
    gangseo: {
      headerBg: 'from-green-950/70 via-emerald-950/40 to-slate-900/90',
      badgeBg: 'bg-green-500/20',
      badgeBorder: 'border-green-400/30',
      badgeText: 'text-green-300',
      accentText: 'from-green-200 via-emerald-200 to-teal-200',
      glowCircle1: 'bg-green-500/25',
      glowCircle2: 'bg-emerald-400/20',
      tagline: 'text-green-200/90',
      subtleWave: 'text-green-400/20',
      moodTheme: '파인 미스트 파스텔 • 강서습지생태원 & 방화대교',
    },
  };

  const theme = pastelThemes[park.id] || pastelThemes.yeouido;

  const renderHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-5 h-5 text-sky-400" />;
      case 'Ship': return <Ship className="w-5 h-5 text-purple-400" />;
      case 'Sunset': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Trees': return <Trees className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'Building': return <Building className="w-5 h-5 text-blue-400" />;
      case 'Flower2': case 'Flower': return <Sparkles className="w-5 h-5 text-rose-400" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-teal-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-slate-300" />;
      case 'Camera': return <Camera className="w-5 h-5 text-amber-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Music': case 'Music2': return <Music className="w-5 h-5 text-violet-400" />;
      case 'Eye': return <Eye className="w-5 h-5 text-blue-400" />;
      case 'Feather': return <Feather className="w-5 h-5 text-emerald-400" />;
      case 'Bike': return <Bike className="w-5 h-5 text-sky-400" />;
      default: return <Sparkles className="w-5 h-5 text-sky-400" />;
    }
  };

  // Map search URLs for Kakao & Naver
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(park.name)}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(park.name)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div 
        className="relative bg-slate-900/90 backdrop-blur-2xl w-full max-w-4xl rounded-3xl shadow-2xl border border-white/15 overflow-hidden flex flex-col max-h-[92vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Controls (Share, Bookmark, Close) */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 sm:space-x-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 sm:p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
            title="공유 링크 복사"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(park.id)}
            className={`p-2 sm:p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-lg hover:scale-105 ${
              isBookmarked
                ? 'bg-rose-500 border-rose-400 text-white shadow-rose-500/30'
                : 'bg-slate-950/80 border-white/20 text-white hover:bg-slate-900'
            }`}
            title={isBookmarked ? '찜 해제' : '찜하기'}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
            title="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Share Copied Toast Alert */}
        {copiedToast && (
          <div className="absolute top-16 right-4 z-30 bg-slate-950/95 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xl border border-white/20 backdrop-blur-xl animate-bounce flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>페이지 링크가 복사되었습니다!</span>
          </div>
        )}

        {/* Pastel-Toned Header Hero */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${theme.headerBg} border-b border-white/15 p-5 sm:p-7 md:p-8 shrink-0`}>
          {/* Subtle Ambient Pastel Glows */}
          <div className={`absolute -top-12 -right-12 w-64 h-64 rounded-full ${theme.glowCircle1} blur-3xl pointer-events-none`} />
          <div className={`absolute -bottom-12 -left-12 w-64 h-64 rounded-full ${theme.glowCircle2} blur-3xl pointer-events-none`} />

          {/* Decorative River Wave Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none">
              <path d="M0,80 C150,140 350,20 500,80 C650,140 750,50 800,70 L800,200 L0,200 Z" fill="currentColor" className={theme.subtleWave} />
              <path d="M0,120 C200,60 400,160 600,100 C700,70 750,110 800,100 L800,200 L0,200 Z" fill="currentColor" className={theme.subtleWave} />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Top Row: Mood Badge (Left-aligned with ample right padding to avoid floating close buttons) */}
            <div className="flex items-center mb-3 pr-32 sm:pr-36">
              {/* Park Pastel Mood Badge */}
              <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full ${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} text-xs font-bold shadow-sm backdrop-blur-md`}>
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{theme.moodTheme}</span>
              </div>
            </div>

            {/* Middle Row: Region & Rating Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
                park.region === '서부' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                park.region === '중부' ? 'bg-sky-500/20 text-sky-300 border-sky-400/30' : 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30'
              }`}>
                📍 {park.region} 권역 • {park.bank}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-white/10 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                ★ {park.rating} (방문자 평가 {park.reviewsCount.toLocaleString()}건)
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-white/5 text-slate-300 border border-white/10">
                총 면적 {park.area}
              </span>
            </div>
            
            {/* Main Title */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {park.name}
            </h2>

            {/* Tagline */}
            <p className={`text-xs sm:text-base ${theme.tagline} font-medium mt-1 leading-relaxed`}>
              {park.heroTagline}
            </p>

            {/* External Media Search Links & Tags Row */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mt-3.5 pt-3.5 border-t border-white/10">
              {/* Tags Pills */}
              <div className="flex flex-wrap gap-1.5">
                {park.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-slate-200 text-[11px] font-medium border border-white/15 backdrop-blur-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* External Media Search Links (Google & YouTube) */}
              <div className="flex items-center space-x-2">
                <a
                  href={googleImageSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-slate-200 hover:text-white text-xs font-bold border border-white/20 backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-105"
                  title="구글에서 실제 공원 사진 더 찾아보기"
                >
                  <Search className="w-3.5 h-3.5 text-sky-400" />
                  <span>실제 사진 검색</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold border border-red-400/30 backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-105"
                  title="유튜브에서 관련 영상 검색"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>유튜브 브이로그</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-white/[0.02] px-4 sm:px-6 overflow-x-auto scrollbar-none shrink-0 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            주요 명소 & 볼거리
          </button>
          <button
            onClick={() => setActiveTab('transit')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'transit'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            교통 & 주차 안내
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'food'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            배달존 & 즉석라면
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            그늘막 텐트 & 분수
          </button>
          <button
            onClick={() => setActiveTab('nearby')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'nearby'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            주변 핫플 & 추천코스
          </button>
          <button
            onClick={() => setActiveTab('youtube')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'youtube'
                ? 'border-red-400 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Youtube className="w-3.5 h-3.5 text-red-400" />
            <span>유튜브 영상 {parkVideos.length > 0 && `(${parkVideos.length})`}</span>
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Introduction Text */}
              <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                <h4 className="text-sm font-bold text-white mb-1 flex items-center">
                  <Info className="w-4 h-4 text-sky-400 mr-1.5" /> 공원 소개
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {park.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {park.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/10 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights 4 Cards */}
              <div>
                <h4 className="text-base font-bold text-white mb-3">
                  {park.name}의 대표 볼거리 & 즐길 거리
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {park.highlights.map((item) => (
                    <div key={item.title} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-sky-400/40 backdrop-blur-md shadow-lg transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                            {renderHighlightIcon(item.iconName)}
                          </div>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-400/30">
                            {item.tag}
                          </span>
                        </div>
                        <h5 className="font-bold text-white text-sm">{item.title}</h5>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Activities & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 backdrop-blur-md">
                  <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>추천 방문 시간대</span>
                  </div>
                  <p className="text-sm font-semibold text-amber-200">{park.recommendedTime}</p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/20 backdrop-blur-md">
                  <div className="flex items-center space-x-1.5 text-sky-300 font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>추천 액티비티</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {park.bestActivities.map((act) => (
                      <span key={act} className="text-xs bg-white/10 text-sky-200 px-2 py-0.5 rounded-md font-medium border border-white/10">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRANSIT & PARKING */}
          {activeTab === 'transit' && (
            <div className="space-y-6">
              {/* Address Bar */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase">공원 주소</div>
                    <div className="text-sm font-semibold text-white">{park.address}</div>
                  </div>
                </div>
                {/* External Map Buttons */}
                <div className="flex items-center space-x-2">
                  <a
                    href={kakaoMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center space-x-1 transition-all shadow-md shadow-amber-500/20"
                  >
                    <span>카카오맵 길찾기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={naverMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold flex items-center space-x-1 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <span>네이버지도 길찾기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Subway Guide */}
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
                <div className="flex items-center space-x-2 text-white font-bold text-base mb-3">
                  <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <h4>대중교통 (지하철 & 버스) 안내</h4>
                    <p className="text-xs text-slate-400 font-normal">도보 진입로 및 나들목 상세</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {park.subwayDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm text-slate-200 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parking Guide */}
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
                <div className="flex items-center space-x-2 text-white font-bold text-base mb-3">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4>공영주차장 정보 & 요금</h4>
                    <p className="text-xs text-slate-400 font-normal">총 {park.parkingInfo.lotCount}개소 주차장 ({park.parkingInfo.totalSpaces}면 완비)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-slate-400 font-bold">주차 요금 체계</span>
                    <p className="text-sm font-semibold text-white mt-1">{park.parkingInfo.rates}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-slate-400 font-bold">주차 면수 현황</span>
                    <p className="text-sm font-semibold text-white mt-1">{park.parkingInfo.lotCount}개 구역 / {park.parkingInfo.totalSpaces}대 주차 가능</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-xs text-amber-200 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong className="text-amber-300">주차 팁:</strong> {park.parkingInfo.tip}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FOOD & DELIVERY */}
          {activeTab === 'food' && (
            <div className="space-y-6">
              {/* Delivery Zone Details */}
              <div className="p-5 rounded-2xl border border-sky-400/30 bg-sky-500/10 backdrop-blur-md">
                <div className="flex items-center space-x-2 text-white font-bold text-base mb-3">
                  <div className="p-2 rounded-xl bg-sky-500 text-white shadow-md shadow-sky-500/30">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white">공식 한강 배달존 (Delivery Zones)</h4>
                    <p className="text-xs text-sky-300 font-normal">배달 앱으로 주문하고 바로 픽업하는 전용 스팟</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {park.deliveryInfo.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {park.deliveryInfo.zoneNumbers.map((zone) => (
                      <span key={zone} className="px-3 py-1.5 rounded-xl bg-white/10 border border-sky-400/40 text-sky-200 font-bold text-xs shadow-md">
                        📍 {zone}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-sky-400/30 text-xs text-sky-200">
                  <strong className="text-sky-300">💡 추천 픽업 위치:</strong> {park.deliveryInfo.recommendedPickup}
                </div>
              </div>

              {/* Convenience Store & Ramen */}
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-white flex items-center">
                    <Flame className="w-5 h-5 text-orange-400 mr-2" />
                    편의점 즉석 라면 & 먹거리 시설
                  </h4>
                  <span className="text-xs bg-white/10 text-slate-200 border border-white/10 px-2.5 py-1 rounded-lg font-bold">
                    편의점 {park.amenities.convenienceStoreCount}개소 운영
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  공원 내 모든 편의점에 자동 라면 조리 기계(은박/종이 전용 용기)가 설치되어 있어 언제든 따끈한 한강 라면을 조리할 수 있습니다.
                </p>

                {/* Popular Menus */}
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    이 공원에서 가장 인기 있는 배달 & 포장 메뉴
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {park.deliveryInfo.popularMenus.map((menu) => (
                      <div key={menu} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 text-center">
                        🍽️ {menu}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RULES & FOUNTAIN */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              {/* Tent Rules */}
              <div className="p-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                      <Tent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">그늘막 텐트 설치 규정</h4>
                      <p className="text-xs text-emerald-300 font-normal">허용 구역 및 필수 안전 수칙</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {park.tentInfo.operatingMonths} 운영
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                    <span className="text-emerald-300 font-bold block mb-1">🕒 운영 시간</span>
                    <span className="text-slate-200 font-semibold">{park.tentInfo.operatingHours}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                    <span className="text-emerald-300 font-bold block mb-1">📍 허용 구역</span>
                    <span className="text-slate-200 font-semibold">{park.tentInfo.allowedAreas}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {park.tentInfo.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-200 bg-white/5 p-2 rounded-lg border border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-xs text-rose-200 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span><strong className="text-rose-300">주의:</strong> 규정 위반(2면 미개방, 지정구역 외 설치, 야영·취사) 시 과태료 100만 원 부과 대상입니다.</span>
                </div>
              </div>

              {/* Fountain Schedule */}
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
                <div className="flex items-center space-x-2 text-white font-bold text-base mb-3">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4>분수쇼 및 수경시설 가동 시간표</h4>
                    <p className="text-xs text-slate-400 font-normal">
                      {park.fountainInfo.hasFountain ? park.fountainInfo.name : '수경시설 정보'}
                    </p>
                  </div>
                </div>

                {park.fountainInfo.hasFountain ? (
                  <div className="space-y-2">
                    {park.fountainInfo.schedule?.map((sched, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                        💧 {sched}
                      </div>
                    ))}
                    {park.fountainInfo.notes && (
                      <p className="text-xs text-slate-400 italic mt-2">
                        * {park.fountainInfo.notes}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white/5 text-xs text-slate-300 border border-white/10">
                    이 공원에는 대형 분수쇼 시설 대신 자연 친화적인 수변 산책로와 생태 숲이 조성되어 있습니다.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: NEARBY & ATTRACTIONS */}
          {activeTab === 'nearby' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-3">
                  {park.name}과 함께 둘러보기 좋은 주변 명소
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {park.nearbyAttractions.map((attraction) => (
                    <div key={attraction} className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center font-bold text-sm shrink-0">
                        📍
                      </div>
                      <span className="text-sm font-bold text-white">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ready to go banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/80 to-indigo-950/80 border border-white/15 backdrop-blur-md text-white">
                <h5 className="font-bold text-sm text-sky-300">💡 나들이 꿀팁</h5>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  주변 명소에서 맛있는 디저트나 음식을 포장한 뒤, 노을 시간에 맞춰 공원으로 건너오시면 최고의 하루를 완성할 수 있습니다!
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: YOUTUBE VIDEOS */}
          {activeTab === 'youtube' && (
            <div className="space-y-6">
              {/* Header card with direct search */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/50 via-slate-900/60 to-slate-950/80 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
                <div>
                  <div className="flex items-center space-x-2 text-red-400 text-xs font-bold mb-1">
                    <Youtube className="w-4 h-4" />
                    <span>실시간 한강 유튜브 큐레이션</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-white">
                    {park.name} 생생 현장 영상 & 브이로그
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    공원의 실시간 풍경, 노을 스팟, 먹거리 브이로그를 4K 고화질로 미리 둘러보세요.
                  </p>
                </div>

                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-red-600/30 shrink-0 cursor-pointer"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>유튜브에서 더 검색</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </div>

              {/* In-Modal Active Video Player */}
              {activeModalVideoId && (
                <div className="rounded-2xl overflow-hidden border border-red-500/40 bg-black shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 text-xs text-white">
                    <span className="font-bold flex items-center space-x-1.5 text-red-400">
                      <Film className="w-4 h-4" />
                      <span>현재 재생 중인 영상</span>
                    </span>
                    <button
                      onClick={() => setActiveModalVideoId(null)}
                      className="text-slate-400 hover:text-white px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer text-xs"
                    >
                      영상 닫기 ✕
                    </button>
                  </div>
                  <div className="relative w-full pb-[56.25%] bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeModalVideoId}?autoplay=1&rel=0`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                </div>
              )}

              {/* Video Cards Grid */}
              {parkVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {parkVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group bg-white/[0.04] rounded-2xl border border-white/10 overflow-hidden hover:border-red-500/40 transition-all flex flex-col justify-between"
                    >
                      <div 
                        onClick={() => setActiveModalVideoId(video.youtubeId)}
                        className="relative h-40 w-full bg-slate-950 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{video.duration}</span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                          <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-red-600/40">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 
                            onClick={() => setActiveModalVideoId(video.youtubeId)}
                            className="font-bold text-xs sm:text-sm text-white group-hover:text-red-300 transition-colors line-clamp-2 leading-snug cursor-pointer mb-1.5"
                          >
                            {video.title}
                          </h5>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {video.description}
                          </p>
                        </div>

                        <div className="pt-2.5 mt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-300 truncate max-w-[120px]">
                            {video.channel}
                          </span>
                          <button
                            onClick={() => setActiveModalVideoId(video.youtubeId)}
                            className="text-red-400 hover:text-red-300 font-bold flex items-center space-x-1 cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>재생</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white/[0.02] rounded-2xl border border-white/10">
                  <Youtube className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-300 mb-3">
                    {park.name} 관련 영상을 검색해보세요!
                  </p>
                  <a
                    href={youtubeSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>유튜브에서 {park.name} 영상 보기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950/80 border-t border-white/10 flex items-center justify-between gap-3 shrink-0 backdrop-blur-md">
          <div className="text-xs text-slate-400">
            {park.name} • 서울특별시 한강사업본부
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleBookmark(park.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-md ${
                isBookmarked
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                  : 'bg-white/10 text-slate-200 border border-white/15 hover:bg-white/20'
              }`}
            >
              {isBookmarked ? '♥ 찜 보관됨' : '♡ 찜 목록 추가'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-500/20 border border-sky-400/30 cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
