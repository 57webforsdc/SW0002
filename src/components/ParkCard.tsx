import React from 'react';
import { HangangPark } from '../types';
import { 
  MapPin, 
  Bookmark, 
  ArrowRight, 
  Waves, 
  Tent, 
  Bike, 
  Sparkles,
  ShoppingBag,
  Train,
  CheckCircle2
} from 'lucide-react';

interface ParkCardProps {
  park: HangangPark;
  isBookmarked: boolean;
  onToggleBookmark: (parkId: string) => void;
  onSelectPark: (parkId: string) => void;
}

export const ParkCard: React.FC<ParkCardProps> = ({
  park,
  isBookmarked,
  onToggleBookmark,
  onSelectPark,
}) => {
  return (
    <div className="group bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/10 hover:border-sky-400/40 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col overflow-hidden text-white">
      {/* Image Banner Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={park.images[0]}
          alt={park.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

        {/* Region & Bank Badges */}
        <div className="absolute top-3 left-3 flex items-center space-x-1.5">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border ${
            park.region === '서부' ? 'bg-emerald-500/80 border-emerald-400/40 text-white' :
            park.region === '중부' ? 'bg-sky-500/80 border-sky-400/40 text-white' :
            'bg-indigo-500/80 border-indigo-400/40 text-white'
          }`}>
            {park.region} 권역
          </span>
          <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-slate-200">
            {park.bank}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(park.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
            isBookmarked
              ? 'bg-red-500 border-red-400 text-white scale-110 shadow-md shadow-red-500/40'
              : 'bg-slate-900/70 border-white/20 text-white/90 hover:bg-slate-900 hover:text-white'
          }`}
          title={isBookmarked ? '찜 해제' : '찜하기'}
        >
          <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>

        {/* Bottom Title Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
              {park.name}
            </h3>
            <span className="text-xs font-bold text-amber-300 flex items-center bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-amber-400/30">
              ★ {park.rating}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium truncate mt-0.5">
            {park.heroTagline}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Summary */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-3">
            {park.summary}
          </p>

          {/* Key Quick Facilities Pill Row */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {park.tentInfo.isAllowed && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-md backdrop-blur-md">
                <Tent className="w-3 h-3 text-emerald-400" />
                <span>텐트존 허용</span>
              </span>
            )}
            {park.deliveryInfo.zoneNumbers.length > 0 && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-medium bg-sky-500/15 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded-md backdrop-blur-md">
                <ShoppingBag className="w-3 h-3 text-sky-400" />
                <span>배달존 {park.deliveryInfo.zoneNumbers.length}곳</span>
              </span>
            )}
            {park.fountainInfo.hasFountain && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-md backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>분수쇼</span>
              </span>
            )}
            {park.amenities.waterSports && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-medium bg-blue-500/15 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-md backdrop-blur-md">
                <Waves className="w-3 h-3 text-blue-400" />
                <span>수상레저</span>
              </span>
            )}
            {park.amenities.swimmingPool && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-medium bg-amber-500/15 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-md backdrop-blur-md">
                <span>야외수영장</span>
              </span>
            )}
            {park.amenities.cruise && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-medium bg-purple-500/15 text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded-md backdrop-blur-md">
                <span>이크루즈</span>
              </span>
            )}
          </div>

          {/* Subway Transportation Hint */}
          <div className="flex items-start space-x-1.5 text-xs text-slate-300 bg-white/[0.03] p-2.5 rounded-xl border border-white/10 mb-4 backdrop-blur-md">
            <Train className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1 leading-snug font-medium text-slate-200">{park.subway}</span>
          </div>

          {/* Highlights 2 items */}
          <div className="space-y-1.5 mb-4">
            {park.highlights.slice(0, 2).map((hl) => (
              <div key={hl.title} className="flex items-start space-x-1.5 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span className="truncate">
                  <strong className="text-white font-semibold">{hl.title}:</strong> {hl.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelectPark(park.id)}
          className="w-full py-2.5 px-4 bg-white/10 hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-md border border-white/15 hover:border-sky-400/40 cursor-pointer backdrop-blur-md"
        >
          <span>상세 정보 & 꿀팁 확인하기</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
