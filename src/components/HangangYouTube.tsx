import React, { useState } from 'react';
import { HANGANG_YOUTUBE_VIDEOS, HangangYouTubeVideo, getYouTubeSearchUrl } from '../data/youtubeData';
import { HANGANG_PARKS } from '../data/hangangData';
import { 
  Play, 
  Youtube, 
  Search, 
  Sparkles, 
  Clock, 
  Eye, 
  X, 
  ExternalLink, 
  Film, 
  Share2, 
  MapPin, 
  Moon, 
  Utensils, 
  Bike, 
  PartyPopper,
  Compass,
  CheckCircle2,
  Tv
} from 'lucide-react';

interface HangangYouTubeProps {
  onSelectPark: (parkId: string) => void;
}

export const HangangYouTube: React.FC<HangangYouTubeProps> = ({ onSelectPark }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedParkId, setSelectedParkId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<HangangYouTubeVideo | null>(null);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '전체 영상', icon: Film },
    { id: 'walk', label: '4K 랜선산책 & 드론', icon: Compass },
    { id: 'night', label: '야경 & 무지개분수', icon: Moon },
    { id: 'food', label: '한강라면 & 먹방 VLOG', icon: Utensils },
    { id: 'sports', label: '라이딩 & 수상레저', icon: Bike },
    { id: 'festival', label: '불꽃축제 & 페스티벌', icon: PartyPopper },
  ];

  const filteredVideos = HANGANG_YOUTUBE_VIDEOS.filter((video) => {
    if (selectedCategory !== 'all' && video.category !== selectedCategory) {
      return false;
    }
    if (selectedParkId !== 'all' && video.parkId !== selectedParkId) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = video.title.toLowerCase().includes(q);
      const matchChannel = video.channel.toLowerCase().includes(q);
      const matchPark = video.parkName.toLowerCase().includes(q);
      const matchTags = video.tags.some((t) => t.toLowerCase().includes(q));
      const matchDesc = video.description.toLowerCase().includes(q);
      if (!matchTitle && !matchChannel && !matchPark && !matchTags && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  const handleShareVideo = (video: HangangYouTubeVideo) => {
    const url = getYouTubeSearchUrl(video.youtubeQuery);
    navigator.clipboard.writeText(url);
    setCopiedToast(`'${video.title.slice(0, 20)}...' 유튜브 검색 링크가 복사되었습니다!`);
    setTimeout(() => setCopiedToast(null), 2500);
  };

  const openDirectYouTubeSearch = (query: string) => {
    const url = getYouTubeSearchUrl(query.startsWith('서울 한강') ? query : `서울 한강공원 ${query}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePlayVideo = (video: HangangYouTubeVideo) => {
    // Open the YouTube search/watch directly in YouTube or modal
    setActiveVideo(video);
  };

  return (
    <div className="space-y-8 text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-950/50 via-slate-900/70 to-slate-950/90 rounded-3xl border border-red-500/30 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-xs font-bold mb-4 shadow-sm">
            <Youtube className="w-4 h-4 text-red-400 shrink-0" />
            <span>Seoul Hangang Tube Video Lounge</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            한강 11개 공원 <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">실시간 유튜브 영상 라운지</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            4K 초고화질 랜선 산책부터 달빛무지개분수 야경, 뚝섬 SUP 패들보드, 난지 바베큐 먹방, 따릉이 라이딩 종주 브이로그까지 유튜브의 생생한 현장 영상을 바로 감상해보세요.
          </p>

          {/* YouTube Search Bar */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="relative flex-1 flex items-center bg-slate-950/90 rounded-2xl border border-white/20 px-3.5 py-2 focus-within:ring-2 focus-within:ring-red-400/60 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    openDirectYouTubeSearch(searchQuery);
                  }
                }}
                placeholder="영상 제목, 라면, 분수, 드론, 피크닉 검색..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer px-1.5"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => openDirectYouTubeSearch(searchQuery || '핫플레이스 브이로그')}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-red-600/30 cursor-pointer shrink-0 border border-red-400/40"
            >
              <Youtube className="w-4 h-4" />
              <span>유튜브에서 검색</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>

      {/* Share Toast */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-red-400/40 text-white px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center space-x-2 animate-fade-in text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* 11 Hangang Parks YouTube Quick Launcher */}
      <div className="bg-slate-900/70 rounded-2xl border border-white/10 p-4 sm:p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
            <Tv className="w-4 h-4 text-red-400" />
            <span>11개 한강공원 유튜브 실시간 바로보기</span>
          </div>
          <span className="text-[11px] text-slate-400">클릭 시 해당 공원의 최신 브이로그로 이동합니다</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {HANGANG_PARKS.map((park) => (
            <button
              key={park.id}
              onClick={() => openDirectYouTubeSearch(`${park.name} 브이로그 4K`)}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-red-600/20 hover:border-red-400/40 border border-white/10 text-xs font-medium text-slate-200 hover:text-white transition-all group cursor-pointer"
            >
              <span className="truncate">{park.name}</span>
              <Youtube className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 shrink-0 ml-1" />
            </button>
          ))}
          <button
            onClick={() => openDirectYouTubeSearch('서울세계불꽃축제 명당')}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-xs font-bold text-amber-300 transition-all cursor-pointer"
          >
            <span>불꽃축제 명당</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
          </button>
        </div>
      </div>

      {/* Category Pills & Park Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-400/40 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Park Select Filter */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs text-slate-400 font-semibold flex items-center">
            <MapPin className="w-3.5 h-3.5 text-sky-400 mr-1" /> 공원 필터:
          </span>
          <select
            value={selectedParkId}
            onChange={(e) => setSelectedParkId(e.target.value)}
            className="bg-slate-900 border border-white/20 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-sky-400 cursor-pointer"
          >
            <option value="all">전체 한강공원</option>
            {HANGANG_PARKS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Search Tag Chips */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.03] p-3 rounded-2xl border border-white/10 text-xs">
        <span className="text-slate-400 font-semibold mr-1 flex items-center">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1" /> 인기 테마 바로가기:
        </span>
        {[
          '반포 달빛무지개분수',
          '여의도 한강라면',
          '뚝섬 패들보드',
          '난지 캠핑장 바베큐',
          '망원 성산대교 노을',
          '따릉이 라이딩 코스',
          '잠실 롯데타워 야경',
          '선유도공원 산책'
        ].map((tag) => (
          <button
            key={tag}
            onClick={() => openDirectYouTubeSearch(tag)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-600/20 text-slate-300 hover:text-white border border-white/10 hover:border-red-400/40 transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span>#{tag}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </button>
        ))}
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-slate-900/80 rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/40 transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail Container with Play Overlay */}
              <div 
                onClick={() => handlePlayVideo(video)}
                className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer bg-slate-950"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 border border-white/10">
                  <Clock className="w-3 h-3 text-slate-300" />
                  <span>{video.duration}</span>
                </div>

                {/* Park Name Tag */}
                <div className="absolute top-2.5 left-2.5 bg-red-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                  <MapPin className="w-3 h-3" />
                  <span>{video.parkName}</span>
                </div>

                {/* Big Center Play Icon Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <div className="w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/50 border border-white/30">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => handlePlayVideo(video)}
                    className="font-bold text-base text-white group-hover:text-red-300 transition-colors line-clamp-2 leading-snug cursor-pointer mb-2"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {video.description}
                  </p>
                </div>

                <div>
                  {/* Meta stats & Channel */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10 mb-3">
                    <span className="font-semibold text-slate-300 truncate max-w-[130px]">
                      {video.channel}
                    </span>
                    <div className="flex items-center space-x-2 text-[11px]">
                      <span className="flex items-center space-x-0.5">
                        <Eye className="w-3 h-3 text-slate-400" />
                        <span>{video.views}</span>
                      </span>
                      <span>•</span>
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>

                  {/* Actions: Watch / Park Detail / Share */}
                  <div className="flex items-center justify-between gap-1.5">
                    <button
                      onClick={() => handlePlayVideo(video)}
                      className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-md shadow-red-600/30 flex items-center justify-center space-x-1.5 cursor-pointer border border-red-400/40"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span>유튜브에서 시청</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </button>

                    {video.parkId && (
                      <button
                        onClick={() => onSelectPark(video.parkId)}
                        className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-sky-300 font-semibold text-xs transition-colors border border-white/10 cursor-pointer"
                        title="공원 상세 가이드 보기"
                      >
                        공원 정보
                      </button>
                    )}

                    <button
                      onClick={() => handleShareVideo(video)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors border border-white/10 cursor-pointer"
                      title="유튜브 링크 복사"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/[0.02] rounded-3xl border border-white/10">
          <Youtube className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">일치하는 유튜브 영상이 없습니다</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-5">
            다른 검색어를 입력하시거나 카테고리 필터를 변경해보세요.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedParkId('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            필터 초기화
          </button>
        </div>
      )}

      {/* Video Modal Player & Info */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative bg-slate-900 w-full max-w-2xl rounded-3xl border border-red-500/30 shadow-2xl overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Controls */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950/70">
              <div className="flex items-center space-x-2 truncate mr-3">
                <span className="p-1.5 rounded-lg bg-red-600 text-white">
                  <Youtube className="w-4 h-4" />
                </span>
                <span className="font-bold text-sm sm:text-base text-white truncate">
                  {activeVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Hero Preview */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div 
                  onClick={() => openDirectYouTubeSearch(activeVideo.youtubeQuery)}
                  className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/60 border-2 border-white/40 cursor-pointer transform hover:scale-110 transition-all mb-4"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <span className="text-xs font-bold text-slate-200 bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-xs">
                  유튜브에서 고화질 4K로 재생하기
                </span>
              </div>
            </div>

            {/* Video Info Bottom Bar */}
            <div className="p-5 sm:p-6 bg-slate-900 space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-slate-400 mb-2">
                  <span className="font-bold text-white text-sm">{activeVideo.channel}</span>
                  <span>•</span>
                  <span>조회수 {activeVideo.views}</span>
                  <span>•</span>
                  <span>{activeVideo.uploadDate}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {activeVideo.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeVideo.tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-red-300 bg-red-500/10 px-2.5 py-0.5 rounded-md border border-red-500/20">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    openDirectYouTubeSearch(activeVideo.youtubeQuery);
                    setActiveVideo(null);
                  }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-2xl text-sm font-extrabold flex items-center justify-center space-x-2 shadow-lg shadow-red-600/40 transition-all cursor-pointer border border-red-400/40"
                >
                  <Youtube className="w-5 h-5" />
                  <span>유튜브 앱/웹에서 시청하기</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                {activeVideo.parkId && (
                  <button
                    onClick={() => {
                      onSelectPark(activeVideo.parkId);
                      setActiveVideo(null);
                    }}
                    className="py-3 px-4 bg-white/10 hover:bg-white/20 text-sky-300 rounded-2xl text-xs font-bold transition-colors cursor-pointer border border-white/10"
                  >
                    공원 상세정보 보기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
