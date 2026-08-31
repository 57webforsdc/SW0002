import React, { useState, useEffect } from 'react';
import { Search, Compass, MapPin, Sparkles, Tent, Bike, Waves, Flame } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onSelectTag: (tag: string) => void;
  onNavigateTab: (tab: string) => void;
  onSelectPark: (parkId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectTag,
  onNavigateTab,
  onSelectPark,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [timeGreeting, setTimeGreeting] = useState<{ title: string; subtitle: string; icon: string }>({
    title: '도심 속 푸른 쉼표, 서울 한강',
    subtitle: '11개 한강공원의 매력을 한눈에 둘러보세요',
    icon: '✨',
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      setTimeGreeting({
        title: '상쾌한 아침 물안개와 산책, 서울 한강',
        subtitle: '조용한 강바람 맞으며 따릉이 라이딩과 모닝 러닝을 즐겨보세요',
        icon: '🌅',
      });
    } else if (hour >= 11 && hour < 16) {
      setTimeGreeting({
        title: '햇살 가득한 잔디밭 피크닉의 계절',
        subtitle: '돗자리 펴고 바삭한 치킨과 한강 즉석라면 끓여 먹는 여유',
        icon: '☀️',
      });
    } else if (hour >= 16 && hour < 20) {
      setTimeGreeting({
        title: '황금빛으로 물드는 로맨틱 선셋 골든아워',
        subtitle: '성산대교와 마포대교 너머로 지는 붉은 노을을 놓치지 마세요',
        icon: '🌇',
      });
    } else {
      setTimeGreeting({
        title: '오색찬란하게 반짝이는 서울 한강의 야경',
        subtitle: '반포 달빛무지개분수와 세빛섬, 밤도깨비의 낭만',
        icon: '🌙',
      });
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (query) {
      onSearch(query);
    } else {
      // If submitted empty, navigate to full park list
      onSearch('');
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchInput(keyword);
    onSearch(keyword);
  };

  const quickHotPills = [
    { label: '여의도 배달존 & 유람선', parkId: 'yeouido', icon: Waves },
    { label: '반포 달빛무지개분수', parkId: 'banpo', icon: Sparkles },
    { label: '뚝섬 SUP & 자벌레', parkId: 'ttukseom', icon: Waves },
    { label: '망원시장 닭강정 피크닉', parkId: 'mangwon', icon: Compass },
    { label: '난지캠핑장 바베큐', parkId: 'nanji', icon: Flame },
    { label: '양화 선유도 노을카페', parkId: 'yanghwa', icon: MapPin },
  ];

  const popularTags = [
    '여의도', '반포 무지개분수', '뚝섬', '배달존', '한강라면', '그늘막 텐트', '따릉이 자전거', '망원시장'
  ];

  return (
    <div className="relative overflow-hidden bg-transparent text-white pt-6 pb-14 md:py-14">
      {/* Background Graphic Water Reflections & Glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/20 via-sky-400/20 to-indigo-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 right-10 w-[400px] h-[200px] bg-amber-500/20 blur-2xl rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Dynamic Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/15 text-xs font-semibold text-sky-200 mb-6 shadow-xl shadow-black/20 animate-fade-in max-w-full">
          <span>{timeGreeting.icon}</span>
          <span className="truncate">{timeGreeting.subtitle}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 whitespace-nowrap break-keep">
          서울의 심장, <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent">11개 한강공원</span> 완벽 가이드
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed font-normal break-keep">
          피크닉 명당, 배달존 번호, 즉석라면 레시피부터 분수 시간표와 자전거 코스까지 한강을 200% 즐기는 모든 정보를 한곳에서 확인하세요.
        </p>

        {/* Search Bar Input with Frosted Glass Container */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-4">
          <div className="relative flex items-center bg-white/10 backdrop-blur-2xl rounded-2xl p-1.5 shadow-2xl shadow-black/50 border border-white/20 focus-within:ring-2 focus-within:ring-sky-400/60 focus-within:border-sky-400/50 transition-all">
            <div className="pl-3.5 pr-2 text-sky-300">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="공원 이름, 지하철역, 배달존, 라면, 분수, 자전거 검색..."
              className="w-full py-2.5 sm:py-3 bg-transparent text-white placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-hidden"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="px-2 py-1 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
                title="검색어 지우기"
              >
                지우기
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 sm:py-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 active:scale-95 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-sky-500/30 whitespace-nowrap cursor-pointer border border-sky-400/30 flex items-center space-x-1.5"
            >
              <Search className="w-4 h-4 sm:hidden" />
              <span>검색</span>
            </button>
          </div>
        </form>

        {/* Recommended search keyword chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl mx-auto mb-8">
          <span className="text-[11px] text-slate-400 font-medium mr-1">인기 검색어:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleKeywordClick(tag)}
              className="text-xs text-sky-200/80 hover:text-white bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/20 hover:border-sky-400/50 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Quick Hot Keyword Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1 inline" /> 대표 명소 바로가기:
          </span>
          {quickHotPills.map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.label}
                onClick={() => onSelectPark(pill.parkId)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/15 backdrop-blur-md border border-white/15 text-xs text-slate-200 hover:text-white transition-all cursor-pointer hover:scale-105 shadow-sm"
              >
                <Icon className="w-3 h-3 text-cyan-300" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Key Quick Feature Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <button
            onClick={() => onNavigateTab('map')}
            className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl border border-white/10 hover:border-sky-400/30 transition-all text-left group cursor-pointer shadow-lg shadow-black/20"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">한강 지도</h4>
            <p className="text-xs text-slate-400 mt-0.5">강북·강남 11개 공원 한눈에</p>
          </button>

          <button
            onClick={() => onNavigateTab('guide')}
            className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl border border-white/10 hover:border-teal-400/30 transition-all text-left group cursor-pointer shadow-lg shadow-black/20"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Tent className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">피크닉 & 텐트 수칙</h4>
            <p className="text-xs text-slate-400 mt-0.5">그늘막 규정 & 배달존 번호</p>
          </button>

          <button
            onClick={() => onNavigateTab('guide')}
            className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl border border-white/10 hover:border-amber-400/30 transition-all text-left group cursor-pointer shadow-lg shadow-black/20"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">한강라면 꿀조합</h4>
            <p className="text-xs text-slate-400 mt-0.5">조리기 마스터 & 추천 토핑</p>
          </button>

          <button
            onClick={() => onNavigateTab('planner')}
            className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl border border-white/10 hover:border-pink-400/30 transition-all text-left group cursor-pointer shadow-lg shadow-black/20"
          >
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-400/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">맞춤 코스 추천</h4>
            <p className="text-xs text-slate-400 mt-0.5">데이트·가족·친구·라이딩</p>
          </button>
        </div>
      </div>
    </div>
  );
};
