import React, { useState } from 'react';
import { HANGANG_PARKS, HANGANG_BRIDGES } from '../data/hangangData';
import { HangangPark } from '../types';
import { GoogleHangangMap } from './GoogleHangangMap';
import { 
  MapPin, 
  Sparkles, 
  Waves, 
  Tent, 
  Compass, 
  Info, 
  ArrowRight,
  ExternalLink,
  Layers,
  Search,
  Map as MapIcon
} from 'lucide-react';

interface InteractiveMapProps {
  onSelectPark: (parkId: string) => void;
  selectedParkId?: string | null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectPark,
  selectedParkId,
}) => {
  const [mapMode, setMapMode] = useState<'google' | 'vector'>('google');
  const [activeFilter, setActiveFilter] = useState<'all' | 'picnic' | 'night' | 'sports' | 'nature'>('all');
  const [bankFilter, setBankFilter] = useState<'all' | '강북' | '강남'>('all');
  const [hoveredPark, setHoveredPark] = useState<HangangPark | null>(null);
  const [hoveredBridge, setHoveredBridge] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredParks = HANGANG_PARKS.filter((park) => {
    // Bank filter
    if (bankFilter !== 'all' && park.bank !== bankFilter) return false;

    // Category filter
    if (activeFilter === 'picnic') {
      return park.tags.some(t => t.includes('피크닉') || t.includes('배달존') || t.includes('물빛광장'));
    }
    if (activeFilter === 'night') {
      return park.tags.some(t => t.includes('야경') || t.includes('분수') || t.includes('노을'));
    }
    if (activeFilter === 'sports') {
      return park.amenities.waterSports || park.amenities.campingSite || park.amenities.dronePark || park.amenities.skatePark;
    }
    if (activeFilter === 'nature') {
      return park.tags.some(t => t.includes('생태') || t.includes('숲길') || t.includes('유채꽃') || t.includes('핑크뮬리'));
    }
    return true;
  });

  // Coordinates of bridges on the SVG map with exact endpoints crossing the river
  const bridgeCoordinates = [
    { name: '행주대교', x1: 30, y1: 175, x2: 40, y2: 245, midX: 35, midY: 210, desc: '고양 ↔ 강서 개화' },
    { name: '방화대교', x1: 75, y1: 185, x2: 85, y2: 255, midX: 80, midY: 220, desc: '강서습지생태원 인접 (붉은 아치)' },
    { name: '가양대교', x1: 140, y1: 200, x2: 150, y2: 275, midX: 145, midY: 237, desc: '난지 ↔ 강서 가양' },
    { name: '월드컵대교', x1: 190, y1: 212, x2: 200, y2: 288, midX: 195, midY: 250, desc: '상암 ↔ 목동 연결' },
    { name: '성산대교', x1: 235, y1: 225, x2: 245, y2: 305, midX: 240, midY: 265, desc: '망원 ↔ 양화 (붉은 트러스 석양)' },
    { name: '양화대교', x1: 275, y1: 238, x2: 285, y2: 320, midX: 280, midY: 279, desc: '선유도공원 경유 & 전망카페' },
    { name: '당산철교', x1: 310, y1: 252, x2: 320, y2: 335, midX: 315, midY: 293, desc: '합정 ↔ 당산 (2호선 지상철)' },
    { name: '서강대교', x1: 348, y1: 268, x2: 358, y2: 350, midX: 353, midY: 309, desc: '밤섬 경유 ↔ 여의도 서단' },
    { name: '마포대교', x1: 388, y1: 282, x2: 398, y2: 368, midX: 393, midY: 325, desc: '마포 ↔ 여의도 물빛광장/축제' },
    { name: '원효대교', x1: 428, y1: 298, x2: 438, y2: 382, midX: 433, midY: 340, desc: '용산 ↔ 여의도 63스퀘어' },
    { name: '한강철교', x1: 468, y1: 310, x2: 478, y2: 395, midX: 473, midY: 352, desc: '용산 ↔ 노량진 (1호선/KTX)' },
    { name: '한강대교', x1: 500, y1: 318, x2: 510, y2: 405, midX: 505, midY: 361, desc: '이촌 ↔ 노들섬 ↔ 본동' },
    { name: '동작대교', x1: 538, y1: 328, x2: 548, y2: 415, midX: 543, midY: 371, desc: '이촌 ↔ 서초/동작 (구름·노을전망카페)' },
    { name: '반포대교(잠수교)', x1: 578, y1: 330, x2: 588, y2: 418, midX: 583, midY: 374, desc: '달빛무지개분수 & 세빛섬' },
    { name: '한남대교', x1: 625, y1: 320, x2: 635, y2: 405, midX: 630, midY: 362, desc: '한남동 ↔ 신사 가로수길/잠원' },
    { name: '동호대교', x1: 668, y1: 300, x2: 678, y2: 380, midX: 673, midY: 340, desc: '옥수 ↔ 압구정 (3호선 주황빛 야경)' },
    { name: '성수대교', x1: 708, y1: 280, x2: 718, y2: 360, midX: 713, midY: 320, desc: '성수 서울숲 ↔ 압구정' },
    { name: '영동대교', x1: 748, y1: 265, x2: 758, y2: 345, midX: 753, midY: 305, desc: '자양 ↔ 청담' },
    { name: '청담대교', x1: 785, y1: 255, x2: 795, y2: 338, midX: 790, midY: 296, desc: '뚝섬 자벌레 ↔ 강남 청담 (7호선)' },
    { name: '잠실대교', x1: 825, y1: 255, x2: 835, y2: 338, midX: 830, midY: 296, desc: '광진 자양 ↔ 송파 잠실/롯데타워' },
    { name: '올림픽대교', x1: 875, y1: 250, x2: 885, y2: 328, midX: 880, midY: 289, desc: '구의 ↔ 풍납 (횃불 조형물)' },
    { name: '천호대교', x1: 915, y1: 245, x2: 925, y2: 322, midX: 920, midY: 283, desc: '광장 ↔ 천호/광나루' },
    { name: '광진교', x1: 945, y1: 242, x2: 955, y2: 318, midX: 950, midY: 280, desc: '광진교 8번가 하부 전망대' },
  ];

  return (
    <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 lg:p-8 text-white">
      {/* Top Header, Map Switcher & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <Waves className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              한강 11개 공원 인터랙티브 맵
            </h2>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            구글 지도 실사 배경과 한강 가이드 수계도에서 강북 4개소 • 강남 7개소 및 23개 교량을 확인하세요.
          </p>
        </div>

        {/* Filter Controls & Map Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Map Engine Toggle */}
          <div className="flex bg-slate-900/90 border border-white/20 p-1 rounded-xl text-xs font-bold shadow-inner">
            <button
              onClick={() => setMapMode('google')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                mapMode === 'google'
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md border border-sky-300/40'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>구글 실사 지도</span>
            </button>
            <button
              onClick={() => setMapMode('vector')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                mapMode === 'vector'
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md border border-sky-300/40'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>가이드 수계도</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl text-xs font-semibold backdrop-blur-md">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'all' ? 'bg-white/20 text-white shadow-md border border-white/20' : 'text-slate-300 hover:text-white'
              }`}
            >
              전체 보기
            </button>
            <button
              onClick={() => setActiveFilter('picnic')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'picnic' ? 'bg-white/20 text-white shadow-md border border-white/20' : 'text-slate-300 hover:text-white'
              }`}
            >
              피크닉·라면
            </button>
            <button
              onClick={() => setActiveFilter('night')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'night' ? 'bg-white/20 text-white shadow-md border border-white/20' : 'text-slate-300 hover:text-white'
              }`}
            >
              야경·분수
            </button>
            <button
              onClick={() => setActiveFilter('sports')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'sports' ? 'bg-white/20 text-white shadow-md border border-white/20' : 'text-slate-300 hover:text-white'
              }`}
            >
              레포츠
            </button>
            <button
              onClick={() => setActiveFilter('nature')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'nature' ? 'bg-white/20 text-white shadow-md border border-white/20' : 'text-slate-300 hover:text-white'
              }`}
            >
              생태·꽃길
            </button>
          </div>

          {/* Bank Toggle */}
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl text-xs font-semibold backdrop-blur-md">
            <button
              onClick={() => setBankFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                bankFilter === 'all' ? 'bg-sky-500/50 text-white border border-sky-400/40' : 'text-slate-300'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setBankFilter('강북')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                bankFilter === '강북' ? 'bg-cyan-500/50 text-white border border-cyan-400/40' : 'text-slate-300'
              }`}
            >
              강북권 (4)
            </button>
            <button
              onClick={() => setBankFilter('강남')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                bankFilter === '강남' ? 'bg-emerald-500/50 text-white border border-emerald-400/40' : 'text-slate-300'
              }`}
            >
              강남권 (7)
            </button>
          </div>
        </div>
      </div>

      {/* Map Content: Google Maps or Vector Map */}
      {mapMode === 'google' ? (
        <GoogleHangangMap
          parks={filteredParks}
          selectedParkId={selectedParkId}
          onSelectPark={onSelectPark}
        />
      ) : (
      /* SVG Interactive Han River Container */
      <div className="relative w-full bg-slate-950/80 rounded-2xl overflow-hidden border border-white/15 shadow-2xl select-none">
        {/* River Region Label Overlay */}
        <div className="absolute top-3 left-4 z-10 flex items-center space-x-2 text-[11px] font-semibold text-slate-300 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5"></span>서부 권역</span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-sky-400 mr-1.5"></span>중부 권역</span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-400 mr-1.5"></span>동부 권역</span>
        </div>

        <div className="absolute top-3 right-4 z-10 hidden sm:flex items-center space-x-2 text-[11px] text-slate-300 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>다리에 마우스를 올리면 교량 명칭과 연결 정보가 표시됩니다</span>
        </div>

        {/* River Graphic SVG */}
        <div className="w-full aspect-[16/9] min-h-[420px] max-h-[560px] relative">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
          >
            <defs>
              {/* Han River Gradient */}
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#0369a1" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#0891b2" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9" />
              </linearGradient>

              {/* Grid pattern for background */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.75" />
              </pattern>
            </defs>

            {/* Dark Map Background with subtle grid */}
            <rect width="1000" height="600" fill="#0b132b" />
            <rect width="1000" height="600" fill="url(#grid)" opacity="0.6" />

            {/* Seoul City Boundary contours (Stylized) */}
            <path
              d="M 50 120 Q 200 80 400 90 T 750 70 Q 900 100 960 200 L 960 520 Q 800 560 500 550 T 60 530 Z"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* North of River (강북) / South of River (강남) Area watermarks */}
            <text x="320" y="120" fill="#334155" fontSize="18" fontWeight="800" letterSpacing="3">
              강 북 (GANG-BUK) • 4개 공원
            </text>
            <text x="560" y="550" fill="#334155" fontSize="18" fontWeight="800" letterSpacing="3">
              강 남 (GANG-NAM) • 7개 공원
            </text>

            {/* Han River Main Flowing Path (Curved through Seoul from East to West) */}
            <path
              d="M 20 180 
                 C 120 200, 200 225, 250 235 
                 C 300 245, 330 260, 360 275 
                 C 410 295, 440 310, 470 315 
                 C 520 325, 540 330, 570 330 
                 C 620 330, 650 305, 670 290 
                 C 720 255, 750 255, 780 255 
                 C 830 255, 860 248, 910 245 
                 C 940 242, 970 245, 990 245
                 L 990 315
                 C 970 315, 940 318, 910 322
                 C 860 328, 830 338, 780 338
                 C 750 338, 720 345, 670 380
                 C 650 395, 620 405, 570 418
                 C 540 418, 520 415, 470 395
                 C 440 385, 410 375, 360 365
                 C 330 350, 300 330, 250 305
                 C 200 288, 120 270, 20 240
                 Z"
              fill="url(#riverGradient)"
              stroke="#38bdf8"
              strokeWidth="2"
              opacity="0.95"
            />

            {/* Flow wave arrows animation indicators */}
            <path
              d="M 950 280 Q 880 285 780 295 T 620 365 T 470 355 T 280 270 T 50 210"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="2"
              strokeDasharray="8 12"
              opacity="0.6"
            />

            {/* Famous Han River Islands */}
            {/* 1. Yeouido Island (여의도) */}
            <ellipse cx="375" cy="355" rx="38" ry="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="375" y="358" fill="#e2e8f0" fontSize="11" fontWeight="700" textAnchor="middle">
              여의도
            </text>

            {/* 2. Seonyudo Island (선유도) */}
            <ellipse cx="280" cy="279" rx="14" ry="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="280" y="282" fill="#e2e8f0" fontSize="9" fontWeight="600" textAnchor="middle">
              선유도
            </text>

            {/* 3. Nodeulseom Island (노들섬) */}
            <ellipse cx="505" cy="361" rx="13" ry="7" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="505" y="364" fill="#e2e8f0" fontSize="8" fontWeight="600" textAnchor="middle">
              노들섬
            </text>

            {/* 4. Bamseom (밤섬 - 생태보존) */}
            <ellipse cx="353" cy="309" rx="12" ry="6" fill="#065f46" stroke="#34d399" strokeWidth="1" />
            <text x="353" y="312" fill="#a7f3d0" fontSize="7" fontWeight="600" textAnchor="middle">
              밤섬
            </text>

            {/* 5. Seoraeseom (서래섬 - 반포) */}
            <ellipse cx="565" cy="385" rx="11" ry="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <text x="565" y="388" fill="#cbd5e1" fontSize="7" fontWeight="600" textAnchor="middle">
              서래섬
            </text>

            {/* Bridges (Lines crossing river accurately) */}
            {bridgeCoordinates.map((bridge) => {
              const isHovered = hoveredBridge === bridge.name;

              return (
                <g 
                  key={bridge.name}
                  onMouseEnter={() => setHoveredBridge(bridge.name)}
                  onMouseLeave={() => setHoveredBridge(null)}
                  className="cursor-pointer group"
                >
                  <line
                    x1={bridge.x1}
                    y1={bridge.y1}
                    x2={bridge.x2}
                    y2={bridge.y2}
                    stroke={isHovered ? '#fbbf24' : '#64748b'}
                    strokeWidth={isHovered ? 4 : 2}
                    strokeLinecap="round"
                    className="transition-all"
                  />
                  {isHovered && (
                    <g>
                      <rect
                        x={bridge.midX - 55}
                        y={bridge.midY - 42}
                        width="110"
                        height="32"
                        rx="6"
                        fill="#0f172a"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                        className="drop-shadow-lg"
                      />
                      <text
                        x={bridge.midX}
                        y={bridge.midY - 26}
                        fill="#fbbf24"
                        fontSize="10"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        {bridge.name}
                      </text>
                      <text
                        x={bridge.midX}
                        y={bridge.midY - 14}
                        fill="#cbd5e1"
                        fontSize="8"
                        textAnchor="middle"
                      >
                        {bridge.desc}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Park Location Pins */}
            {filteredParks.map((park) => {
              const svgX = (park.mapCoords.x / 100) * 920 + 40;
              const svgY = (park.mapCoords.y / 100) * 480 + 60;
              const isSelected = selectedParkId === park.id;
              const isHovered = hoveredPark?.id === park.id;

              // Region-based color code
              const pinColor = park.region === '서부' ? '#10b981' : park.region === '중부' ? '#0ea5e9' : '#6366f1';

              return (
                <g
                  key={park.id}
                  onClick={() => onSelectPark(park.id)}
                  onMouseEnter={() => setHoveredPark(park)}
                  onMouseLeave={() => setHoveredPark(null)}
                  className="cursor-pointer group"
                >
                  {/* Ping animation ripple for selected or hovered */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={svgX}
                      cy={svgY}
                      r="22"
                      fill={pinColor}
                      opacity="0.3"
                      className="animate-ping origin-center"
                    />
                  )}

                  {/* Outer Pin Circle */}
                  <circle
                    cx={svgX}
                    cy={svgY}
                    r={isSelected ? 16 : isHovered ? 14 : 11}
                    fill={pinColor}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-all drop-shadow-md group-hover:scale-110"
                  />

                  {/* Inner Dot */}
                  <circle
                    cx={svgX}
                    cy={svgY}
                    r="4"
                    fill="#ffffff"
                  />

                  {/* Park Label Pill */}
                  <g transform={`translate(${svgX}, ${svgY + (park.bank === '강북' ? -22 : 24)})`}>
                    <rect
                      x="-44"
                      y="-11"
                      width="88"
                      height="22"
                      rx="11"
                      fill={isSelected ? pinColor : '#0f172a'}
                      stroke={isSelected ? '#ffffff' : pinColor}
                      strokeWidth="1.5"
                      className="transition-colors drop-shadow-sm"
                    />
                    <text
                      x="0"
                      y="3"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {park.name.replace(' 한강공원', '')}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hovered Park Preview Float Card */}
        {hoveredPark && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-slate-900/95 backdrop-blur-xl text-white p-4 rounded-2xl border border-white/20 shadow-2xl z-30 animate-fade-in pointer-events-none sm:pointer-events-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  hoveredPark.region === '서부' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' :
                  hoveredPark.region === '중부' ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30'
                }`}>
                  {hoveredPark.region} 권역 • {hoveredPark.bank}
                </span>
                <h4 className="text-base font-bold text-white mt-1">{hoveredPark.name}</h4>
              </div>
              <span className="text-amber-400 text-xs font-bold flex items-center">
                ★ {hoveredPark.rating}
              </span>
            </div>
            
            <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
              {hoveredPark.summary}
            </p>

            <div className="flex flex-wrap gap-1 mt-3">
              {hoveredPark.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] bg-white/10 text-slate-200 px-2 py-0.5 rounded-md border border-white/15">
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => onSelectPark(hoveredPark.id)}
              className="w-full mt-3 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1 transition-all cursor-pointer shadow-lg shadow-sky-500/30 border border-sky-400/30"
            >
              <span>상세 정보 및 꿀팁 보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
      )}

      {/* 11 Parks Quick Selector Strip */}
      <div className="mt-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          공원 바로가기 (11개 전체)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {HANGANG_PARKS.map((park) => {
            const isSelected = selectedParkId === park.id;
            return (
              <button
                key={park.id}
                onClick={() => onSelectPark(park.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'border-sky-400 bg-sky-500/30 text-white font-bold shadow-lg shadow-sky-500/20'
                    : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="truncate pr-1">
                  <div className="text-xs font-semibold truncate">{park.name}</div>
                  <div className="text-[10px] text-slate-400">{park.region} · {park.bank}</div>
                </div>
                <span className="text-[11px] text-amber-400 font-semibold shrink-0">
                  ★{park.rating}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
