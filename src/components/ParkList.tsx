import React, { useState, useMemo } from 'react';
import { HANGANG_PARKS } from '../data/hangangData';
import { HangangPark, ParkRegion, RiverBank } from '../types';
import { ParkCard } from './ParkCard';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  Sparkles, 
  MapPin,
  Waves
} from 'lucide-react';

interface ParkListProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarks: string[];
  onToggleBookmark: (parkId: string) => void;
  onSelectPark: (parkId: string) => void;
}

export const ParkList: React.FC<ParkListProps> = ({
  searchQuery,
  setSearchQuery,
  bookmarks,
  onToggleBookmark,
  onSelectPark,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<ParkRegion | 'all'>('all');
  const [selectedBank, setSelectedBank] = useState<RiverBank | 'all'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
  const [filterAmenities, setFilterAmenities] = useState<{
    tent: boolean;
    delivery: boolean;
    fountain: boolean;
    waterSports: boolean;
    pool: boolean;
    cruise: boolean;
  }>({
    tent: false,
    delivery: false,
    fountain: false,
    waterSports: false,
    pool: false,
    cruise: false,
  });

  const resetFilters = () => {
    setSelectedRegion('all');
    setSelectedBank('all');
    setSearchQuery('');
    setFilterAmenities({
      tent: false,
      delivery: false,
      fountain: false,
      waterSports: false,
      pool: false,
      cruise: false,
    });
  };

  const filteredParks = useMemo(() => {
    return HANGANG_PARKS.filter((park) => {
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = park.name.toLowerCase().includes(q) || park.nameEn.toLowerCase().includes(q);
        const matchesSummary = park.summary.toLowerCase().includes(q) || park.description.toLowerCase().includes(q) || park.heroTagline.toLowerCase().includes(q);
        const matchesTags = park.tags.some(t => t.toLowerCase().includes(q));
        const matchesSubway = park.subway.toLowerCase().includes(q) || park.subwayDetails.some(s => s.toLowerCase().includes(q));
        const matchesHighlights = park.highlights.some(h => h.title.toLowerCase().includes(q) || h.description.toLowerCase().includes(q) || h.tag.toLowerCase().includes(q));
        const matchesDelivery = park.deliveryInfo.zoneNumbers.some(z => z.toLowerCase().includes(q)) || 
          park.deliveryInfo.description.toLowerCase().includes(q) || 
          park.deliveryInfo.popularMenus.some(m => m.toLowerCase().includes(q)) ||
          (q.includes('배달') && park.deliveryInfo.zoneNumbers.length > 0);
        const matchesTent = (q.includes('텐트') || q.includes('그늘막')) && park.tentInfo.isAllowed;
        const matchesFountain = (q.includes('분수') || (park.fountainInfo.name && park.fountainInfo.name.toLowerCase().includes(q))) && park.fountainInfo.hasFountain;
        const matchesRamen = (q.includes('라면') || q.includes('편의점') || q.includes('매점')) && park.amenities.convenienceStore;
        const matchesBike = (q.includes('자전거') || q.includes('따릉이') || q.includes('라이딩')) && park.amenities.bikeRental;
        const matchesCamping = (q.includes('캠핑') || q.includes('바베큐')) && park.amenities.campingSite;
        const matchesSports = (q.includes('수상') || q.includes('패들보드') || q.includes('sup') || q.includes('보트')) && park.amenities.waterSports;
        const matchesPool = (q.includes('수영') || q.includes('물놀이')) && park.amenities.swimmingPool;
        const matchesCruise = (q.includes('유람선') || q.includes('크루즈')) && park.amenities.cruise;

        if (
          !matchesName && 
          !matchesSummary && 
          !matchesTags && 
          !matchesSubway && 
          !matchesHighlights &&
          !matchesDelivery &&
          !matchesTent &&
          !matchesFountain &&
          !matchesRamen &&
          !matchesBike &&
          !matchesCamping &&
          !matchesSports &&
          !matchesPool &&
          !matchesCruise
        ) {
          return false;
        }
      }

      // Region Filter
      if (selectedRegion !== 'all' && park.region !== selectedRegion) {
        return false;
      }

      // Bank Filter
      if (selectedBank !== 'all' && park.bank !== selectedBank) {
        return false;
      }

      // Amenity Checkboxes
      if (filterAmenities.tent && !park.tentInfo.isAllowed) return false;
      if (filterAmenities.delivery && park.deliveryInfo.zoneNumbers.length === 0) return false;
      if (filterAmenities.fountain && !park.fountainInfo.hasFountain) return false;
      if (filterAmenities.waterSports && !park.amenities.waterSports) return false;
      if (filterAmenities.pool && !park.amenities.swimmingPool) return false;
      if (filterAmenities.cruise && !park.amenities.cruise) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'ko');
      return 0;
    });
  }, [searchQuery, selectedRegion, selectedBank, filterAmenities, sortBy]);

  const hasActiveFilters = selectedRegion !== 'all' || selectedBank !== 'all' || searchQuery !== '' || Object.values(filterAmenities).some(Boolean);

  return (
    <section className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-5 sm:p-6 lg:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
                <Waves className="w-5 h-5" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                서울 11개 한강공원 탐색
              </h2>
            </div>
            <p className="text-sm text-slate-300 mt-1">
              조건에 맞는 나들이 공원을 찾고, 실시간 편의시설과 즐길 거리를 확인해보세요.
            </p>
          </div>

          {/* Quick Search in List */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="공원명, 지하철, 시설 검색..."
              className="w-full pl-9 pr-8 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm font-medium text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400/50 focus:bg-white/10 transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Buttons & Toggles */}
        <div className="pt-5 space-y-4">
          {/* Row 1: Region & Bank & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Region Buttons */}
            <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 p-1 rounded-xl text-xs font-semibold backdrop-blur-md">
              <span className="px-2 text-slate-400 text-[11px]">권역:</span>
              <button
                onClick={() => setSelectedRegion('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedRegion === 'all' ? 'bg-white/20 text-white shadow-md border border-white/20' : 'text-slate-300 hover:text-white'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedRegion('서부')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedRegion === '서부' ? 'bg-emerald-500/80 text-white shadow-md border border-emerald-400/40' : 'text-slate-300 hover:text-white'
                }`}
              >
                서부 (강서/난지/망원/양화)
              </button>
              <button
                onClick={() => setSelectedRegion('중부')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedRegion === '중부' ? 'bg-sky-500/80 text-white shadow-md border border-sky-400/40' : 'text-slate-300 hover:text-white'
                }`}
              >
                중부 (여의도/이촌/반포/잠원)
              </button>
              <button
                onClick={() => setSelectedRegion('동부')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedRegion === '동부' ? 'bg-indigo-500/80 text-white shadow-md border border-indigo-400/40' : 'text-slate-300 hover:text-white'
                }`}
              >
                동부 (뚝섬/잠실/광나루)
              </button>
            </div>

            {/* River Bank and Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-white/5 border border-white/10 p-1 rounded-xl text-xs font-semibold backdrop-blur-md">
                <button
                  onClick={() => setSelectedBank('all')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedBank === 'all' ? 'bg-white/20 text-white shadow-md border border-white/20' : 'text-slate-300'
                  }`}
                >
                  강남·강북 전체 (11)
                </button>
                <button
                  onClick={() => setSelectedBank('강북')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedBank === '강북' ? 'bg-sky-500/80 text-white shadow-md border border-sky-400/40' : 'text-slate-300'
                  }`}
                >
                  강북 (4)
                </button>
                <button
                  onClick={() => setSelectedBank('강남')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedBank === '강남' ? 'bg-sky-500/80 text-white shadow-md border border-sky-400/40' : 'text-slate-300'
                  }`}
                >
                  강남 (7)
                </button>
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="공원 정렬 기준"
                className="text-xs font-semibold bg-slate-900/80 border border-white/15 rounded-xl px-3 py-2 text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-400 cursor-pointer backdrop-blur-md"
              >
                <option value="rating" className="bg-slate-900 text-white">★ 평점 높은순</option>
                <option value="reviews" className="bg-slate-900 text-white">🔥 리뷰 많은순</option>
                <option value="name" className="bg-slate-900 text-white">가나다순</option>
              </select>
            </div>
          </div>

          {/* Row 2: Facility Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/10">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1 text-sky-400" /> 편의시설 필터:
            </span>

            <button
              onClick={() => setFilterAmenities(prev => ({ ...prev, tent: !prev.tent }))}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer backdrop-blur-md ${
                filterAmenities.tent
                  ? 'bg-emerald-500/30 border-emerald-400/60 text-emerald-200 shadow-md shadow-emerald-500/20'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>⛺ 그늘막 텐트존 허용</span>
              {filterAmenities.tent && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterAmenities(prev => ({ ...prev, delivery: !prev.delivery }))}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer backdrop-blur-md ${
                filterAmenities.delivery
                  ? 'bg-sky-500/30 border-sky-400/60 text-sky-200 shadow-md shadow-sky-500/20'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>🛵 공식 배달존 운영</span>
              {filterAmenities.delivery && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterAmenities(prev => ({ ...prev, fountain: !prev.fountain }))}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer backdrop-blur-md ${
                filterAmenities.fountain
                  ? 'bg-cyan-500/30 border-cyan-400/60 text-cyan-200 shadow-md shadow-cyan-500/20'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>✨ 분수대 / 수경시설</span>
              {filterAmenities.fountain && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterAmenities(prev => ({ ...prev, waterSports: !prev.waterSports }))}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer backdrop-blur-md ${
                filterAmenities.waterSports
                  ? 'bg-blue-500/30 border-blue-400/60 text-blue-200 shadow-md shadow-blue-500/20'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>🏄 패들보드/수상레포츠</span>
              {filterAmenities.waterSports && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterAmenities(prev => ({ ...prev, pool: !prev.pool }))}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer backdrop-blur-md ${
                filterAmenities.pool
                  ? 'bg-amber-500/30 border-amber-400/60 text-amber-200 shadow-md shadow-amber-500/20'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>🏊 야외수영장/물놀이장</span>
              {filterAmenities.pool && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterAmenities(prev => ({ ...prev, cruise: !prev.cruise }))}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer backdrop-blur-md ${
                filterAmenities.cruise
                  ? 'bg-purple-500/30 border-purple-400/60 text-purple-200 shadow-md shadow-purple-500/20'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>🚢 이크루즈 유람선</span>
              {filterAmenities.cruise && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition-colors ml-auto cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>필터 초기화</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Status Count & Active Search Chip */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-sm text-slate-400">
        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
          <span>
            총 <strong className="text-white font-bold">{filteredParks.length}개</strong>의 한강공원이 검색되었습니다.
          </span>
          {searchQuery.trim() && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-semibold">
              <Search className="w-3 h-3 text-sky-400" />
              <span>검색어: "{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="hover:text-white cursor-pointer ml-1 text-slate-400"
                title="검색어 지우기"
              >
                ✕
              </button>
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <div className="text-xs text-sky-400 font-medium">
            필터 적용 중
          </div>
        )}
      </div>

      {/* Grid of Park Cards */}
      {filteredParks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParks.map((park) => (
            <ParkCard
              key={park.id}
              park={park}
              isBookmarked={bookmarks.includes(park.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectPark={onSelectPark}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/10 p-12 text-center text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">조건에 맞는 한강공원이 없습니다</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
            검색어나 필터 조건을 변경해보시거나 필터 초기화 버튼을 눌러보세요.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl text-xs font-semibold hover:from-sky-400 hover:to-cyan-400 transition-all cursor-pointer shadow-lg shadow-sky-500/25 border border-sky-400/30"
          >
            필터 초기화
          </button>
        </div>
      )}
    </section>
  );
};
