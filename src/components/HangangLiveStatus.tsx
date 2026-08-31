import React, { useState, useEffect } from 'react';
import { 
  Sunset, 
  Sun, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  Sparkles, 
  ShieldAlert, 
  Phone,
  Camera,
  Compass,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface HangangLiveStatusProps {
  onSelectPark: (parkId: string) => void;
}

export const HangangLiveStatus: React.FC<HangangLiveStatusProps> = ({ onSelectPark }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Approximate sunset in Seoul around 19:15
  const sunsetHour = 19;
  const sunsetMinute = 15;
  const now = currentTime;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const sunsetTotalMinutes = sunsetHour * 60 + sunsetMinute;
  const minutesUntilSunset = sunsetTotalMinutes - currentMinutes;

  const goldenHourStart = `${sunsetHour - 1}:15`;
  const blueHourStart = `${sunsetHour}:${sunsetMinute + 15}`;

  const sunsetSpots = [
    { name: '성산대교 남단 (망원)', parkId: 'mangwon', tag: '붉은 아치 프레임 1위', desc: '아치형 다리 사이로 떨어지는 해를 정면으로 촬영' },
    { name: '반포 서래섬 (서초)', parkId: 'banpo', tag: '꽃밭 & 수변 실루엣', desc: '서래섬 3교 위에서 노을빛 한강과 남산타워 조망' },
    { name: '선유도 선유보행교 (양화)', parkId: 'yanghwa', tag: '아치 보행교 뷰', desc: '다리 위에서 노을과 강물 반사를 파노라마로 감상' },
    { name: '마포대교 생명의다리 (여의도)', parkId: 'yeouido', tag: '도심 스카이라인', desc: '63빌딩과 마포 빌딩 숲에 반사되는 황금빛 노을' },
  ];

  return (
    <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-5 sm:p-6 lg:p-8 space-y-8 text-white">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Sunset className="w-5 h-5" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            라이브 한강 & 골든아워 선셋 가이드
          </h2>
        </div>
        <p className="text-sm text-slate-300 mt-1">
          실시간 한강의 기상 지수, 일몰 카운트다운 및 최고의 노을 포토 스팟을 확인하세요.
        </p>
      </div>

      {/* Sunset Countdown Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600/60 via-rose-700/60 to-indigo-950/80 border border-white/15 backdrop-blur-xl text-white p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>오늘 서울 한강 일몰 예상 시각: <strong className="text-amber-300">19:15</strong></span>
            </div>
            
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {minutesUntilSunset > 0 ? (
                <>일몰까지 <span className="text-amber-300">{Math.floor(minutesUntilSunset / 60)}시간 {minutesUntilSunset % 60}분</span> 남음</>
              ) : minutesUntilSunset > -60 ? (
                <>현재 <span className="text-amber-300">황금빛 노을 골든아워</span> 진행 중!</>
              ) : (
                <>현재 <span className="text-cyan-300">화려한 한강 야경</span> 진행 중!</>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-amber-100/90 mt-2 max-w-xl">
              가장 아름다운 인생 사진을 건질 수 있는 <strong className="text-amber-200">골든아워(18:15~19:15)</strong>와 몽환적인 <strong className="text-sky-200">블루아워(19:30~19:50)</strong>를 놓치지 마세요.
            </p>
          </div>

          {/* Current Time Clock Pill */}
          <div className="bg-slate-950/60 backdrop-blur-xl border border-white/20 p-4 sm:p-5 rounded-2xl text-center shrink-0 shadow-lg">
            <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">서울 현재 시각</div>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold mt-1 text-white">
              {currentTime.toLocaleTimeString('ko-KR')}
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              골든아워: {goldenHourStart} ~ 19:15
            </div>
          </div>
        </div>
      </div>

      {/* Live Han River Weather & Comfort Index Grid */}
      <div>
        <h3 className="text-base font-bold text-white mb-3 flex items-center">
          <Sun className="w-4 h-4 text-amber-400 mr-2" />
          한강 실시간 나들이 쾌적 지수
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Temperature */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">기온 & 체감</span>
              <Thermometer className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">22.4°C</div>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">✓ 피크닉 최적 기온</p>
          </div>

          {/* Wind & Riding Comfort */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">강바람 & 풍속</span>
              <Wind className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">2.1 m/s</div>
            <p className="text-[11px] text-sky-400 font-semibold mt-1">✓ 자전거 타기 상쾌</p>
          </div>

          {/* Visibility / Air Quality */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">미세먼지 & 시정</span>
              <Eye className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">좋음 (18㎍)</div>
            <p className="text-[11px] text-teal-400 font-semibold mt-1">✓ 남산/롯데타워 선명</p>
          </div>

          {/* Water Temperature (Water sports) */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">한강 수온</span>
              <Droplets className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">19.8°C</div>
            <p className="text-[11px] text-blue-400 font-semibold mt-1">✓ 뚝섬 패들보드 적합</p>
          </div>
        </div>
      </div>

      {/* Top 4 Sunset Photo Spots */}
      <div>
        <h3 className="text-base font-bold text-white mb-3 flex items-center">
          <Camera className="w-4 h-4 text-rose-400 mr-2" />
          노을 인생샷 명당 TOP 4
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sunsetSpots.map((spot) => (
            <div
              key={spot.name}
              onClick={() => onSelectPark(spot.parkId)}
              className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-amber-400/50 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-amber-500/10 transition-all cursor-pointer group flex items-start justify-between"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  {spot.tag}
                </span>
                <h4 className="text-sm font-bold text-white mt-1.5 group-hover:text-amber-300 transition-colors">
                  {spot.name}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{spot.desc}</p>
              </div>
              <Compass className="w-5 h-5 text-slate-400 group-hover:text-amber-400 shrink-0 mt-1 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Emergency & Official Hangang Public Helplines */}
      <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-300 font-bold text-sm mb-1">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>한강 안전 & 응급 긴급 연락처</span>
          </div>
          <p className="text-xs text-slate-300">
            수상 안전사고, 분실물, 공원 민원 발생 시 언제든 공식 센터로 연락하세요.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="px-3 py-2 bg-white/5 rounded-xl border border-white/10 font-bold backdrop-blur-md">
            🚨 119 수난구조대: <strong className="text-rose-400">119</strong>
          </div>
          <div className="px-3 py-2 bg-white/5 rounded-xl border border-white/10 font-bold backdrop-blur-md">
            📞 서울시 다산콜센터: <strong className="text-sky-400">120</strong>
          </div>
          <div className="px-3 py-2 bg-white/5 rounded-xl border border-white/10 font-bold backdrop-blur-md">
            🏢 한강사업본부 종합상황실: <strong className="text-teal-300">02-3780-0777</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
