import React, { useState } from 'react';
import { RAMEN_RECIPES, TENT_REGULATIONS_SUMMARY, HANGANG_BRIDGES } from '../data/hangangData';
import { 
  Flame, 
  Tent, 
  ShoppingBag, 
  Bike, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  HelpCircle,
  ChefHat,
  ShieldCheck,
  Compass,
  ArrowRight,
  Info
} from 'lucide-react';

export const HangangLifeGuide: React.FC = () => {
  const [guideTab, setGuideTab] = useState<'ramen' | 'tent' | 'delivery' | 'bike' | 'fountain'>('ramen');
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0);

  return (
    <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-5 sm:p-6 lg:p-8 space-y-6 text-white">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <ChefHat className="w-5 h-5" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            한강 200% 즐기기 꿀팁 백과
          </h2>
        </div>
        <p className="text-sm text-slate-300 mt-1">
          즉석라면 레시피부터 텐트 과태료 방지 규정, 배달존 이용법과 자전거 코스까지 총정리했습니다.
        </p>

        {/* Tab Buttons */}
        <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl gap-1 mt-6 overflow-x-auto scrollbar-none backdrop-blur-md">
          <button
            onClick={() => setGuideTab('ramen')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              guideTab === 'ramen'
                ? 'bg-orange-500/30 text-orange-200 shadow-md border border-orange-400/40'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>🍜 즉석라면 마스터</span>
          </button>

          <button
            onClick={() => setGuideTab('tent')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              guideTab === 'tent'
                ? 'bg-emerald-500/30 text-emerald-200 shadow-md border border-emerald-400/40'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Tent className="w-4 h-4 text-emerald-400" />
            <span>⛺ 그늘막 텐트 수칙</span>
          </button>

          <button
            onClick={() => setGuideTab('delivery')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              guideTab === 'delivery'
                ? 'bg-sky-500/30 text-sky-200 shadow-md border border-sky-400/40'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-sky-400" />
            <span>🛵 배달존 픽업 팁</span>
          </button>

          <button
            onClick={() => setGuideTab('bike')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              guideTab === 'bike'
                ? 'bg-blue-500/30 text-blue-200 shadow-md border border-blue-400/40'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Bike className="w-4 h-4 text-blue-400" />
            <span>🚴 따릉이 & 자전거길</span>
          </button>

          <button
            onClick={() => setGuideTab('fountain')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              guideTab === 'fountain'
                ? 'bg-purple-500/30 text-purple-200 shadow-md border border-purple-400/40'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>⛲ 분수쇼 & 잠수교 축제</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RAMEN MASTER */}
      {guideTab === 'ramen' && (
        <div className="space-y-6">
          {/* How to cook automated ramen */}
          <div className="bg-orange-500/10 rounded-2xl p-5 border border-orange-400/30 backdrop-blur-md">
            <h3 className="text-base font-bold text-orange-200 flex items-center mb-3">
              <Flame className="w-5 h-5 text-orange-400 mr-2" />
              한강 편의점 즉석 라면 조리기 4단계 마스터
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center mb-2">1</span>
                <h4 className="font-bold text-xs text-white">용기에 면 & 스프 넣기</h4>
                <p className="text-[11px] text-slate-300 mt-1">스프를 면 위에 고르게 붓고, 토핑(소시지 등)을 미리 바닥에 깔아주세요.</p>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center mb-2">2</span>
                <h4 className="font-bold text-xs text-white">기계 바코드 스캔</h4>
                <p className="text-[11px] text-slate-300 mt-1">용기 바닥의 바코드를 기계 센서에 삑! 찍은 후 인덕션 판 위에 올립니다.</p>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center mb-2">3</span>
                <h4 className="font-bold text-xs text-white">조리 시작 버튼</h4>
                <p className="text-[11px] text-slate-300 mt-1">[조리시작]을 누르면 정량 온수가 자동 급수되고 4분 타이머가 시작됩니다.</p>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center mb-2">4</span>
                <h4 className="font-bold text-xs text-white">★ 계란 넣는 타이밍</h4>
                <p className="text-[11px] text-slate-300 mt-1"><strong>남은 시간 1분 30초</strong>에 계란 투하! (처음부터 넣으면 바닥이 탑니다)</p>
              </div>
            </div>
          </div>

          {/* 4 Signature Recipes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white">
                인기 폭발! 한강 라면 4대 시그니처 꿀조합 레시피
              </h3>
              <span className="text-xs text-slate-400">편의점 재료로 100% 제조 가능</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RAMEN_RECIPES.map((recipe, idx) => (
                <div key={recipe.id} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-orange-400/40 backdrop-blur-xl shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-400/30">
                        {recipe.badge}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5">{recipe.name}</h4>
                      <p className="text-xs text-slate-300 font-medium">베이직 라면: {recipe.noodle}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                      난이도: {recipe.difficulty}
                    </span>
                  </div>

                  {/* Toppings list */}
                  <div className="my-3 py-2 border-y border-white/10">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">필수 추가 토핑:</span>
                    <div className="flex flex-wrap gap-1">
                      {recipe.toppings.map(t => (
                        <span key={t} className="text-xs bg-white/10 text-slate-200 border border-white/10 px-2 py-0.5 rounded-md font-medium">
                          + {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cook Tip */}
                  <p className="text-xs text-slate-200 leading-relaxed bg-orange-500/10 p-2.5 rounded-xl border border-orange-400/20">
                    <strong className="text-orange-300">💡 조리 팁:</strong> {recipe.cookTip}
                  </p>

                  <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
                    <span>추천 페어링: <strong className="text-white font-semibold">{recipe.pairing}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TENT REGULATIONS */}
      {guideTab === 'tent' && (
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="bg-emerald-500/10 rounded-2xl p-5 border border-emerald-400/30 backdrop-blur-md">
            <div className="flex items-center space-x-2 text-emerald-300 font-bold text-base mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3>{TENT_REGULATIONS_SUMMARY.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              모든 시민이 쾌적하고 안전하게 한강을 이용할 수 있도록, 서울시 한강사업본부에서 지정한 그늘막 텐트 허용 기준입니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-[11px] text-emerald-400 font-bold block">허용 기간</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{TENT_REGULATIONS_SUMMARY.period}</span>
              </div>
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-[11px] text-emerald-400 font-bold block">운영 시간</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{TENT_REGULATIONS_SUMMARY.hours}</span>
              </div>
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-[11px] text-emerald-400 font-bold block">허용 규격</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{TENT_REGULATIONS_SUMMARY.allowedSize}</span>
              </div>
            </div>
          </div>

          {/* Key Rule 1: 2 Sides Open */}
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0 font-bold">
                ⚠️
              </div>
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  가장 많이 적발되는 규정: 「텐트 2면 이상 상시 완전 개방」
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  텐트 지퍼를 닫아 내부를 밀폐하는 행위는 엄격히 금지됩니다. 모기장이나 가림막 없이 최소 2면 이상을 완전히 열어두어야 합니다. 단속반이 상시 순찰하며 적발 시 즉시 계도 또는 과태료가 부과됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* Prohibited items list */}
          <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-400/30 backdrop-blur-xl">
            <h4 className="font-bold text-rose-300 text-sm mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 text-rose-400 mr-2" />
              한강공원 내 절대 금지 행위 (과태료 100만 원 부과 대상)
            </h4>
            <div className="space-y-2">
              {TENT_REGULATIONS_SUMMARY.prohibited.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10 backdrop-blur-md">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-rose-300 font-bold mt-3">
              * {TENT_REGULATIONS_SUMMARY.fine}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: DELIVERY ZONES */}
      {guideTab === 'delivery' && (
        <div className="space-y-6">
          <div className="bg-sky-500/10 rounded-2xl p-5 border border-sky-400/30 backdrop-blur-md">
            <h3 className="text-base font-bold text-sky-200 flex items-center mb-2">
              <ShoppingBag className="w-5 h-5 text-sky-400 mr-2" />
              한강 배달앱(배민/요기요/쿠팡이츠) 100% 성공 공식
            </h3>
            <p className="text-xs sm:text-sm text-sky-200/90 leading-relaxed">
              넓은 한강공원에서 라이더와 엇갈리지 않고 5분 안에 음식을 받는 3가지 핵심 팁을 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="text-sky-400 font-bold text-sm mb-1">Step 1. 배달 주소 작성법</div>
              <div className="p-2.5 bg-white/5 rounded-xl text-xs font-mono text-slate-200 border border-white/10 my-2 backdrop-blur-md">
                서울시 영등포구 여의동로 330 <br/>
                <strong className="text-sky-300">(여의도 한강공원 배달존 2 앞)</strong>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                상세 주소 란에 반드시 <strong className="text-white">[공원명 + 배달존 N번]</strong>을 정확히 적어주세요.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="text-sky-400 font-bold text-sm mb-1">Step 2. 라이더 위치 확인</div>
              <div className="p-2.5 bg-white/5 rounded-xl text-xs font-mono text-slate-200 border border-white/10 my-2 backdrop-blur-md">
                배달 앱 지도 상 <br/>
                <strong className="text-sky-300">「도착 5분 전」</strong> 알림 확인 시
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                돗자리에서 미리 일어나 해당 배달존 팻말 앞으로 이동해 대기하세요.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="text-sky-400 font-bold text-sm mb-1">Step 3. 픽업 시 의상/메뉴 확인</div>
              <div className="p-2.5 bg-white/5 rounded-xl text-xs font-mono text-slate-200 border border-white/10 my-2 backdrop-blur-md">
                "BHC 뿌링클 주문한 <br/>
                <strong className="text-sky-300">010-XXXX 고객입니다!"</strong>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                수많은 라이더와 주문자가 몰리므로, 전화번호 뒷자리와 메뉴명을 명확히 말하세요.
              </p>
            </div>
          </div>

          {/* Major parks delivery zones overview */}
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
            <h4 className="font-bold text-white text-sm mb-3">
              주요 한강공원 배달존 공식 번호표 요약
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-xs font-bold text-sky-400 block">여의도 한강공원</span>
                <span className="text-xs text-slate-300 mt-1 block">배달존 1 (물빛무대)</span>
                <span className="text-xs text-white block"><strong>배달존 2 (여의나루역 앞)</strong></span>
                <span className="text-xs text-slate-300 block">배달존 3 (마포대교 밑)</span>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-xs font-bold text-sky-400 block">반포 한강공원</span>
                <span className="text-xs text-white mt-1 block"><strong>배달존 1 (달빛광장 우측)</strong></span>
                <span className="text-xs text-slate-300 block">배달존 2 (세빛섬 입구)</span>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-xs font-bold text-sky-400 block">뚝섬 한강공원</span>
                <span className="text-xs text-white mt-1 block"><strong>배달존 1 (자양역 2번출구)</strong></span>
                <span className="text-xs text-slate-300 block">배달존 2 (음악분수 옆)</span>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-xs font-bold text-sky-400 block">잠실 한강공원</span>
                <span className="text-xs text-white mt-1 block"><strong>배달존 1 (잠실나들목 광장)</strong></span>
                <span className="text-xs text-slate-300 block">배달존 2 (물놀이장 정문)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BIKE & RIDING */}
      {guideTab === 'bike' && (
        <div className="space-y-6">
          <div className="bg-blue-500/10 rounded-2xl p-5 border border-blue-400/30 backdrop-blur-md">
            <h3 className="text-base font-bold text-blue-200 flex items-center mb-2">
              <Bike className="w-5 h-5 text-blue-400 mr-2" />
              서울 한강 자전거도로 (총 연장 78km) & 따릉이 가이드
            </h3>
            <p className="text-xs sm:text-sm text-blue-200/90 leading-relaxed">
              한강 양안을 따라 신호등 없이 시원하게 달리는 한강 자전거도로는 대한민국 최고의 라이딩 코스입니다.
            </p>
          </div>

          {/* 3 Recommended Bike Routes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">초보자 힐링 코스</span>
                <h4 className="font-bold text-white text-sm mt-2">여의도 샛강 순환 코스</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  여의도 둘레 8.4km를 한 바퀴 도는 평탄한 코스로, 63빌딩과 국회의사당, 샛강 생태공원을 감상할 수 있습니다.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-400">
                거리: 약 8.4km • 소요시간: 약 40분
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">선셋 뷰 코스</span>
                <h4 className="font-bold text-white text-sm mt-2">망원 ↔ 양화 (선유도) 코스</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  성산대교와 양화대교의 붉은 노을을 정면으로 바라보며 시원한 강바람을 만끽하는 감성 라이딩 코스입니다.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-400">
                거리: 약 6.0km • 소요시간: 약 30분
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">강남북 횡단 코스</span>
                <h4 className="font-bold text-white text-sm mt-2">뚝섬 ↔ 잠실철교 횡단 코스</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  자양역에서 출발해 잠실철교 전용 데크를 건너며 2호선 지하철과 나란히 달리는 이색적인 횡단 코스입니다.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-400">
                거리: 약 12.0km • 소요시간: 약 1시간
              </div>
            </div>
          </div>

          {/* Safety Rules */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1.5 backdrop-blur-md">
            <div className="font-bold text-white flex items-center mb-1">
              <ShieldCheck className="w-4 h-4 text-sky-400 mr-1.5" />
              한강 자전거 안전 수칙 (꼭 지켜주세요!)
            </div>
            <p>1. 자전거도로 제한 속도는 <strong className="text-white">20km/h 이하</strong>입니다. 과속 및 추월 시 벨을 울려주세요.</p>
            <p>2. 보행자 횡단보도에서는 반드시 일시 정지 후 보행자에게 양보하세요.</p>
            <p>3. 야간 라이딩 시 전조등(아래로 향하게)과 후미등 점등은 필수입니다.</p>
          </div>
        </div>
      )}

      {/* TAB 5: FOUNTAINS & JAMSISU FESTIVAL */}
      {guideTab === 'fountain' && (
        <div className="space-y-6">
          <div className="bg-purple-500/10 rounded-2xl p-5 border border-purple-400/30 backdrop-blur-md">
            <h3 className="text-base font-bold text-purple-200 flex items-center mb-2">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              반포 달빛무지개분수 & 잠수교 뚜벅이 축제
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              기네스북에 등재된 세계 최장 교량 분수쇼와 한강 바로 위를 걷는 잠수교 축제 정보입니다.
            </p>
          </div>

          {/* Banpo Fountain Schedule Table */}
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
            <h4 className="font-bold text-white text-sm mb-3">
              반포 달빛무지개분수 정기 가동 시간표 (4월 ~ 10월)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-xs font-bold text-purple-300 block">비수기 (4~6월, 9~10월)</span>
                <p className="text-xs text-slate-200 mt-1 font-semibold">
                  12:00, 19:30, 20:00, 20:30, 21:00 (회당 20분 가동)
                </p>
              </div>

              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-xs font-bold text-purple-300 block">성수기 (7~8월 한여름)</span>
                <p className="text-xs text-slate-200 mt-1 font-semibold">
                  12:00, 19:30, 20:00, 20:30, 21:00, 21:30 (회당 20분 가동)
                </p>
              </div>
            </div>

            <div className="mt-3 p-3 bg-amber-500/10 rounded-xl text-xs text-amber-200 border border-amber-400/30 backdrop-blur-md">
              * 기상 조건(풍속 7m/s 이상, 우천 시) 또는 한강 수위 상승 시 안전을 위해 자동 중단됩니다.
            </div>
          </div>

          {/* Jamsu Bridge Ddeobeogi Festival */}
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
            <h4 className="font-bold text-white text-sm mb-2">
              차 없는 잠수교 뚜벅이 축제 (차량 통제 & 보행 전용)
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
              매년 봄·가을 일요일마다 잠수교가 차량 통제되고 온전히 시민들의 보행 산책로로 변신합니다. 푸드트럭, 텐트 힐링존, 플리마켓, 야외 요가 및 버스킹 라이브 공연이 펼쳐집니다.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-200">
              <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-lg backdrop-blur-md">📍 반포 잠수교 전구간</span>
              <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-lg backdrop-blur-md">🗓️ 5~6월, 9~10월 매주 일요일</span>
              <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-lg backdrop-blur-md">⏰ 12:00 ~ 21:00</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
