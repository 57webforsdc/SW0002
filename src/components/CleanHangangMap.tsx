import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { HangangPark } from '../types';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Navigation, 
  Layers, 
  Compass, 
  Utensils, 
  Tent, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Eye,
  Check
} from 'lucide-react';

interface CleanHangangMapProps {
  parks: HangangPark[];
  selectedParkId?: string | null;
  onSelectPark: (parkId: string) => void;
}

// Han River Bridges with real coordinates
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

export const CleanHangangMap: React.FC<CleanHangangMapProps> = ({
  parks,
  selectedParkId,
  onSelectPark,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const bridgesLayerRef = useRef<L.LayerGroup | null>(null);

  const [mapTheme, setMapTheme] = useState<'dark' | 'satellite' | 'street'>('dark');
  const [showBridges, setShowBridges] = useState<boolean>(true);
  const [activePark, setActivePark] = useState<HangangPark | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Seoul Han River Center Coordinates
    const map = L.map(mapContainerRef.current, {
      center: [37.5320, 126.9850],
      zoom: 12,
      minZoom: 11,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Create layer groups
    const markersLayer = L.layerGroup().addTo(map);
    const bridgesLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    bridgesLayerRef.current = bridgesLayer;

    // Initial base tile (CartoDB Dark Matter)
    const darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    });
    darkTile.addTo(map);
    tileLayerRef.current = darkTile;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer when Theme changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let newTile: L.TileLayer;
    if (mapTheme === 'satellite') {
      newTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Esri Satellite',
      });
    } else if (mapTheme === 'dark') {
      newTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      });
    } else {
      newTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      });
    }

    newTile.addTo(map);
    tileLayerRef.current = newTile;
  }, [mapTheme]);

  // Update Park Markers
  useEffect(() => {
    if (!markersLayerRef.current || !mapInstanceRef.current) return;
    const markersLayer = markersLayerRef.current;
    markersLayer.clearLayers();

    parks.forEach((park) => {
      const isSelected = selectedParkId === park.id;
      const isNorth = park.bank === '강북';

      // Custom HTML Marker Element
      const iconHtml = `
        <div class="cursor-pointer group flex flex-col items-center" style="transform: translate(-50%, -100%);">
          <div class="px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-2xl flex items-center space-x-1 border transition-all duration-200 ${
            isSelected
              ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-400/50 scale-110 shadow-amber-400/50'
              : isNorth
              ? 'bg-slate-900/95 text-cyan-300 border-cyan-400/70 hover:border-cyan-200 hover:scale-105 hover:bg-slate-800'
              : 'bg-slate-900/95 text-emerald-300 border-emerald-400/70 hover:border-emerald-200 hover:scale-105 hover:bg-slate-800'
          }">
            <span class="w-2 h-2 rounded-full ${isNorth ? 'bg-cyan-400' : 'bg-emerald-400'} animate-pulse"></span>
            <span class="whitespace-nowrap font-bold">${park.name.replace(' 한강공원', '')}</span>
            <span class="text-[10px] text-amber-400 font-bold ml-0.5">★${park.rating}</span>
          </div>
          <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] ${
            isSelected ? 'border-t-amber-400' : 'border-t-slate-900'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'clean-park-marker',
        html: iconHtml,
        iconSize: [0, 0],
      });

      const marker = L.marker([park.coords.lat, park.coords.lng], { icon: customIcon });

      marker.on('click', () => {
        setActivePark(park);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([park.coords.lat, park.coords.lng], {
            animate: true,
            duration: 0.6,
          });
        }
      });

      marker.addTo(markersLayer);
    });
  }, [parks, selectedParkId]);

  // Update Bridge Markers
  useEffect(() => {
    if (!bridgesLayerRef.current) return;
    const bridgesLayer = bridgesLayerRef.current;
    bridgesLayer.clearLayers();

    if (!showBridges) return;

    REAL_BRIDGES.forEach((bridge) => {
      const bridgeHtml = `
        <div class="cursor-pointer group flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity" style="transform: translate(-50%, -50%);">
          <div class="bg-slate-950/90 hover:bg-slate-900 text-amber-300 hover:text-amber-200 px-1.5 py-0.5 rounded text-[9px] font-semibold border border-amber-500/40 shadow-md whitespace-nowrap">
            🌉 ${bridge.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'clean-bridge-marker',
        html: bridgeHtml,
        iconSize: [0, 0],
      });

      const marker = L.marker([bridge.lat, bridge.lng], { icon: customIcon });
      marker.bindTooltip(`<strong>${bridge.name}</strong><br/><span style="font-size:11px;color:#cbd5e1;">${bridge.desc}</span>`, {
        direction: 'top',
        className: 'leaflet-custom-tooltip',
      });

      marker.addTo(bridgesLayer);
    });
  }, [showBridges]);

  // Pan to selected park when selectedParkId changes
  useEffect(() => {
    if (!selectedParkId || !mapInstanceRef.current) return;
    const targetPark = parks.find((p) => p.id === selectedParkId);
    if (targetPark) {
      setActivePark(targetPark);
      mapInstanceRef.current.flyTo([targetPark.coords.lat, targetPark.coords.lng], 14, {
        duration: 0.8,
      });
    }
  }, [selectedParkId, parks]);

  // Region fast focus
  const handleRegionFocus = (region: 'all' | 'west' | 'center' | 'east') => {
    if (!mapInstanceRef.current) return;
    setActivePark(null);

    const regions: Record<string, { lat: number; lng: number; zoom: number }> = {
      all: { lat: 37.5320, lng: 126.9850, zoom: 12 },
      west: { lat: 37.5550, lng: 126.8900, zoom: 13 },
      center: { lat: 37.5200, lng: 126.9600, zoom: 13 },
      east: { lat: 37.5300, lng: 127.0600, zoom: 13 },
    };

    const target = regions[region];
    if (target) {
      mapInstanceRef.current.flyTo([target.lat, target.lng], target.zoom, {
        duration: 0.8,
      });
    }
  };

  const handleZoom = (delta: number) => {
    if (!mapInstanceRef.current) return;
    if (delta > 0) {
      mapInstanceRef.current.zoomIn();
    } else {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 select-none">
      {/* Top Map Control Bar Overlays */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
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
            서부권
          </button>
          <button
            onClick={() => handleRegionFocus('center')}
            className="px-2.5 py-1 text-[11px] font-semibold text-sky-300 hover:bg-sky-500/20 rounded-lg transition-all cursor-pointer"
          >
            중부권
          </button>
          <button
            onClick={() => handleRegionFocus('east')}
            className="px-2.5 py-1 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-500/20 rounded-lg transition-all cursor-pointer"
          >
            동부권
          </button>
        </div>

        {/* Map Style & Layer Toggles */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-lg pointer-events-auto">
          <div className="flex space-x-1 bg-black/40 p-0.5 rounded-lg border border-white/10">
            <button
              onClick={() => setMapTheme('dark')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer flex items-center space-x-1 ${
                mapTheme === 'dark' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>다크 뷰</span>
            </button>
            <button
              onClick={() => setMapTheme('satellite')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer flex items-center space-x-1 ${
                mapTheme === 'satellite' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>위성 실사</span>
            </button>
            <button
              onClick={() => setMapTheme('street')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer flex items-center space-x-1 ${
                mapTheme === 'street' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>일반 지도</span>
            </button>
          </div>

          <button
            onClick={() => setShowBridges(!showBridges)}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
              showBridges ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40' : 'text-slate-300 hover:bg-white/10'
            }`}
            title="23개 한강 교량 표시 토글"
          >
            교량 ({REAL_BRIDGES.length})
          </button>
        </div>
      </div>

      {/* Floating Zoom & Center Buttons */}
      <div className="absolute right-4 bottom-16 z-[400] flex flex-col space-y-1.5">
        <button
          onClick={() => handleZoom(1)}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-white/20 shadow-xl backdrop-blur-md transition-all cursor-pointer hover:scale-105"
          title="확대"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-1)}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-white/20 shadow-xl backdrop-blur-md transition-all cursor-pointer hover:scale-105"
          title="축소"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleRegionFocus('all')}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-sky-400 border border-white/20 shadow-xl backdrop-blur-md transition-all cursor-pointer hover:scale-105"
          title="전체 지도 리셋"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-[520px] sm:h-[580px] bg-slate-950 z-0" />

      {/* Active Park Info Floating Card (Smooth Card instead of InfoWindow) */}
      {activePark && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-[400] bg-slate-900/95 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  activePark.bank === '강북' 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' 
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                }`}>
                  {activePark.region} 권역 • {activePark.bank}
                </span>
                <span className="text-xs text-amber-400 font-bold">
                  ★ {activePark.rating}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-white mt-1">
                {activePark.name}
              </h4>
            </div>
            <button
              onClick={() => setActivePark(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
            {activePark.summary}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] mb-3 bg-white/5 p-2 rounded-xl border border-white/10">
            <div className="flex items-center space-x-1.5 text-slate-300">
              <Utensils className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">{activePark.deliveryInfo.zoneNumbers[0] || '배달존'}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300">
              <Tent className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{activePark.tentInfo.isAllowed ? '그늘막 허용' : '텐트 제한'}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onSelectPark(activePark.id);
                setActivePark(null);
              }}
              className="flex-1 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1 transition-all cursor-pointer shadow-md shadow-sky-500/30"
            >
              <span>공원 상세정보 & 가이드</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Quick Legend */}
      <div className="absolute bottom-4 left-4 z-[400] hidden sm:flex items-center space-x-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[11px] text-slate-300 shadow-xl pointer-events-none">
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
  );
};
