import React, { useState, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import { HangangPark } from '../types';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Star, 
  Navigation, 
  Layers, 
  Info, 
  Compass, 
  Bike, 
  Tent, 
  Utensils, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  KeyRound
} from 'lucide-react';

interface GoogleHangangMapProps {
  parks: HangangPark[];
  selectedParkId?: string | null;
  onSelectPark: (parkId: string) => void;
}

// Han River Bridges Lat/Lng coordinates for Google Maps
const REAL_BRIDGES = [
  { name: '행주대교', lat: 37.5976, lng: 126.8182, desc: '고양 ↔ 강서 개화' },
  { name: '방화대교', lat: 37.5878, lng: 126.8390, desc: '강서습지생태원 인접 (붉은 아치)' },
  { name: '가양대교', lat: 37.5702, lng: 126.8624, desc: '난지 ↔ 강서 가양' },
  { name: '월드컵대교', lat: 37.5540, lng: 126.8833, desc: '상암 ↔ 목동 연결' },
  { name: '성산대교', lat: 37.5492, lng: 126.8928, desc: '망원 ↔ 양화 (붉은 트러스 석양)' },
  { name: '양화대교', lat: 37.5420, lng: 126.9045, desc: '선유도공원 경유 & 전망카페' },
  { name: '당산철교', lat: 37.5375, lng: 126.9100, desc: '합정 ↔ 당산 (2호선)' },
  { name: '서강대교', lat: 37.5348, lng: 126.9248, desc: '밤섬 경유 ↔ 여의도 서단' },
  { name: '마포대교', lat: 37.5332, lng: 126.9360, desc: '마포 ↔ 여의도 물빛광장' },
  { name: '원효대교', lat: 37.5262, lng: 126.9450, desc: '용산 ↔ 여의도 63스퀘어' },
  { name: '한강철교', lat: 37.5186, lng: 126.9550, desc: '용산 ↔ 노량진 (1호선/KTX)' },
  { name: '한강대교', lat: 37.5160, lng: 126.9602, desc: '이촌 ↔ 노들섬 ↔ 본동' },
  { name: '동작대교', lat: 37.5098, lng: 126.9818, desc: '이촌 ↔ 서초/동작 (전망카페)' },
  { name: '반포대교(잠수교)', lat: 37.5135, lng: 126.9960, desc: '달빛무지개분수 & 세빛섬' },
  { name: '한남대교', lat: 37.5230, lng: 127.0145, desc: '한남동 ↔ 신사 가로수길' },
  { name: '동호대교', lat: 37.5350, lng: 127.0225, desc: '옥수 ↔ 압구정 (3호선 야경)' },
  { name: '성수대교', lat: 37.5378, lng: 127.0370, desc: '성수 서울숲 ↔ 압구정' },
  { name: '영동대교', lat: 37.5305, lng: 127.0560, desc: '자양 ↔ 청담' },
  { name: '청담대교', lat: 37.5270, lng: 127.0655, desc: '뚝섬 자벌레 ↔ 강남 청담' },
  { name: '잠실대교', lat: 37.5255, lng: 127.0870, desc: '광진 자양 ↔ 송파 잠실/롯데타워' },
  { name: '올림픽대교', lat: 37.5360, lng: 127.1040, desc: '구의 ↔ 풍납 (성화대 주탑)' },
  { name: '천호대교', lat: 37.5440, lng: 127.1230, desc: '광장 ↔ 천호/광나루' },
  { name: '광진교', lat: 37.5475, lng: 127.1265, desc: '광진교 8번가 하부 전망대' },
];

// Inner Controller for camera interactions
const MapController: React.FC<{
  selectedPark: HangangPark | null;
  onReset: () => void;
}> = ({ selectedPark }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!map || !selectedPark) return;
    map.panTo({ lat: selectedPark.coords.lat, lng: selectedPark.coords.lng });
    map.setZoom(14);
  }, [map, selectedPark]);

  return null;
};

export const GoogleHangangMap: React.FC<GoogleHangangMapProps> = ({
  parks,
  selectedParkId,
  onSelectPark,
}) => {
  const apiKey = ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const [activeInfoWindowPark, setActiveInfoWindowPark] = useState<HangangPark | null>(null);
  const [showBridges, setShowBridges] = useState<boolean>(true);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('hybrid');
  const [activeBridgeTooltip, setActiveBridgeTooltip] = useState<typeof REAL_BRIDGES[0] | null>(null);

  const selectedPark = parks.find((p) => p.id === selectedParkId) || null;

  const handleMarkerClick = (park: HangangPark) => {
    setActiveInfoWindowPark(park);
  };

  const handleRegionFocus = (region: 'all' | 'west' | 'center' | 'east') => {
    const centers: Record<string, { lat: number; lng: number; zoom: number }> = {
      all: { lat: 37.5320, lng: 126.9850, zoom: 12 },
      west: { lat: 37.5550, lng: 126.8900, zoom: 13 },
      center: { lat: 37.5200, lng: 126.9600, zoom: 13 },
      east: { lat: 37.5300, lng: 127.0600, zoom: 13 },
    };

    const target = centers[region];
    if (target) {
      setActiveInfoWindowPark(null);
      // Map will pan if handled via map instance
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950">
      {/* Map Control Bar Overlays */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Region Fast Jump Buttons */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-lg pointer-events-auto">
          <span className="text-[11px] font-bold text-slate-300 px-2 flex items-center">
            <Compass className="w-3.5 h-3.5 text-sky-400 mr-1" />
            초점:
          </span>
          <button
            onClick={() => handleRegionFocus('all')}
            className="px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
          >
            한강 전체
          </button>
          <button
            onClick={() => handleRegionFocus('west')}
            className="px-2.5 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/20 rounded-lg transition-all cursor-pointer"
          >
            서부권 (강서/망원/난지)
          </button>
          <button
            onClick={() => handleRegionFocus('center')}
            className="px-2.5 py-1 text-[11px] font-semibold text-sky-300 hover:bg-sky-500/20 rounded-lg transition-all cursor-pointer"
          >
            중부권 (여의도/반포/이촌)
          </button>
          <button
            onClick={() => handleRegionFocus('east')}
            className="px-2.5 py-1 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-500/20 rounded-lg transition-all cursor-pointer"
          >
            동부권 (뚝섬/잠실/광나루)
          </button>
        </div>

        {/* Map Type & Layer Toggles */}
        <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-lg pointer-events-auto">
          <button
            onClick={() => setMapTypeId(mapTypeId === 'hybrid' ? 'roadmap' : 'hybrid')}
            className="px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all flex items-center cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400 mr-1" />
            <span>{mapTypeId === 'hybrid' ? '위성 실사 뷰' : '일반 지도 뷰'}</span>
          </button>

          <button
            onClick={() => setShowBridges(!showBridges)}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
              showBridges ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            교량 표시 ({REAL_BRIDGES.length})
          </button>
        </div>
      </div>

      {/* Google Maps Container */}
      <div className="w-full h-[520px] sm:h-[580px] relative">
        <APIProvider apiKey={apiKey} language="ko" region="KR">
          <Map
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            mapId="DEMO_MAP_ID"
            defaultCenter={{ lat: 37.5320, lng: 126.9850 }}
            defaultZoom={12}
            minZoom={11}
            maxZoom={18}
            mapTypeId={mapTypeId}
            gestureHandling="greedy"
            disableDefaultUI={false}
            zoomControl={true}
            mapTypeControl={false}
            streetViewControl={true}
            fullscreenControl={true}
            style={{ width: '100%', height: '100%' }}
          >
            <MapController selectedPark={selectedPark} onReset={() => {}} />

            {/* Han River Parks Advanced Markers */}
            {parks.map((park) => {
              const isSelected = selectedParkId === park.id;
              const isNorth = park.bank === '강북';
              
              return (
                <AdvancedMarker
                  key={park.id}
                  position={{ lat: park.coords.lat, lng: park.coords.lng }}
                  onClick={() => handleMarkerClick(park)}
                  title={park.name}
                >
                  <div className="flex flex-col items-center group cursor-pointer transform transition-transform hover:scale-110">
                    {/* Floating Marker Badge */}
                    <div
                      className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-xl flex items-center space-x-1 border transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-400/40 scale-105'
                          : isNorth
                          ? 'bg-slate-900/95 text-cyan-300 border-cyan-400/60 hover:border-cyan-300'
                          : 'bg-slate-900/95 text-emerald-300 border-emerald-400/60 hover:border-emerald-300'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isNorth ? 'bg-cyan-400' : 'bg-emerald-400'}`} />
                      <span>{park.name.replace(' 한강공원', '')}</span>
                      <span className="text-[10px] text-amber-400 font-bold ml-0.5">★{park.rating}</span>
                    </div>

                    {/* Marker Needle Anchor */}
                    <div
                      className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-0.5 ${
                        isSelected
                          ? 'border-t-amber-400'
                          : isNorth
                          ? 'border-t-slate-900'
                          : 'border-t-slate-900'
                      }`}
                    />
                  </div>
                </AdvancedMarker>
              );
            })}

            {/* Bridges Markers (Optional toggle) */}
            {showBridges &&
              REAL_BRIDGES.map((bridge) => (
                <AdvancedMarker
                  key={bridge.name}
                  position={{ lat: bridge.lat, lng: bridge.lng }}
                  onClick={() => setActiveBridgeTooltip(bridge)}
                  title={bridge.name}
                >
                  <div className="flex flex-col items-center cursor-pointer opacity-85 hover:opacity-100 transition-opacity">
                    <div className="bg-slate-950/85 text-amber-300 px-1.5 py-0.5 rounded text-[9px] font-semibold border border-amber-500/40 shadow">
                      🌉 {bridge.name}
                    </div>
                  </div>
                </AdvancedMarker>
              ))}

            {/* Interactive InfoWindow for Clicked Park */}
            {activeInfoWindowPark && (
              <InfoWindow
                position={{
                  lat: activeInfoWindowPark.coords.lat,
                  lng: activeInfoWindowPark.coords.lng,
                }}
                onCloseClick={() => setActiveInfoWindowPark(null)}
                headerContent={
                  <div className="flex items-center space-x-1.5 text-slate-900 font-bold text-sm">
                    <span className="p-1 rounded bg-sky-100 text-sky-700">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <span>{activeInfoWindowPark.name}</span>
                    <span className="text-xs text-amber-600 ml-1">★ {activeInfoWindowPark.rating}</span>
                  </div>
                }
              >
                <div className="max-w-[260px] text-slate-800 p-1">
                  <div className="h-24 w-full rounded-lg overflow-hidden relative mb-2 shadow-inner">
                    <img
                      src={activeInfoWindowPark.images[0]}
                      alt={activeInfoWindowPark.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 left-1 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs font-semibold">
                      {activeInfoWindowPark.region} 권역 • {activeInfoWindowPark.bank}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2 font-medium">
                    {activeInfoWindowPark.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-1 text-[11px] mb-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <div className="flex items-center space-x-1 text-slate-700">
                      <Utensils className="w-3 h-3 text-sky-600 shrink-0" />
                      <span className="truncate">{activeInfoWindowPark.deliveryInfo.zoneNumbers[0] || '배달존'}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-700">
                      <Tent className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{activeInfoWindowPark.tentInfo.isAllowed ? '그늘막 허용' : '텐트 제한'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectPark(activeInfoWindowPark.id);
                      setActiveInfoWindowPark(null);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1 transition-all cursor-pointer shadow-md shadow-sky-600/30"
                  >
                    <span>공원 상세 정보 & 꿀팁 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </InfoWindow>
            )}

            {/* Bridge Info Window */}
            {activeBridgeTooltip && (
              <InfoWindow
                position={{
                  lat: activeBridgeTooltip.lat,
                  lng: activeBridgeTooltip.lng,
                }}
                onCloseClick={() => setActiveBridgeTooltip(null)}
              >
                <div className="p-1 text-slate-800 text-xs">
                  <div className="font-bold text-slate-900 flex items-center space-x-1">
                    <span>🌉</span>
                    <span>{activeBridgeTooltip.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    {activeBridgeTooltip.desc}
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>

        {/* Floating Quick Legend */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center space-x-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[11px] text-slate-300 shadow-xl">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="font-semibold text-cyan-300">강북권 4개소</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-semibold text-emerald-300">강남권 7개소</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1 text-amber-300">
            <span>🌉</span>
            <span>23개 교량</span>
          </div>
        </div>
      </div>
    </div>
  );
};
