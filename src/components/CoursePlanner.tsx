import React, { useState } from 'react';
import { HANGANG_COURSES, HANGANG_PARKS } from '../data/hangangData';
import { HangangCourse } from '../types';
import { 
  Compass, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  Sparkles, 
  ArrowRight,
  Heart,
  Users,
  User,
  Bike,
  Smile,
  Copy,
  Check
} from 'lucide-react';

interface CoursePlannerProps {
  onSelectPark: (parkId: string) => void;
  onSaveCourse: (course: HangangCourse) => void;
  savedCourseIds: string[];
}

export const CoursePlanner: React.FC<CoursePlannerProps> = ({
  onSelectPark,
  onSaveCourse,
  savedCourseIds,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('가족 (아이와 함께)');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [copiedCourseId, setCopiedCourseId] = useState<string | null>(null);

  const targets = [
    { label: '가족 (아이와 함께)', icon: Smile, desc: '물놀이장 & 놀이터 & 그늘막 피크닉' },
    { label: '혼자 (힐링/산책)', icon: User, desc: '선유도 물멍 & 북카페 & 생태숲 사색' },
    { label: '연인 (데이트)', icon: Heart, desc: '로맨틱 노을 & 튜브스터 & 유람선' },
    { label: '친구 (피크닉/먹방)', icon: Users, desc: '시장 먹거리 & 치맥 & 라면 먹방' },
    { label: '라이더 (자전거)', icon: Bike, desc: '시원한 강바람 횡단 종주' },
    { label: '전체 코스', icon: Compass, desc: '한강 11개 공원 전체 추천 코스' },
  ];

  const handleCopyTimeline = (course: HangangCourse) => {
    const text = `[서울 한강공원 추천 코스: ${course.title}]\n타겟: ${course.target} | 소요시간: ${course.duration} (${course.distance})\n추천 공원: ${course.recommendedParkId}\n\n` +
      course.timeline.map(t => `• ${t.time} [${t.place}]: ${t.activity} (Tip: ${t.tip})`).join('\n') +
      `\n\n🎒 준비물: ${course.packingList.join(', ')}\n💰 예상예산: ${course.budgetEst}`;
    
    navigator.clipboard.writeText(text);
    setCopiedCourseId(course.id);
    setTimeout(() => setCopiedCourseId(null), 2500);
  };

  const filteredCourses = selectedTarget === '전체 코스'
    ? HANGANG_COURSES
    : HANGANG_COURSES.filter(c => c.target === selectedTarget);

  return (
    <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-5 sm:p-6 lg:p-8 space-y-8 text-white">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-400/30">
            <Compass className="w-5 h-5" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            맞춤형 한강 나들이 코스 플래너
          </h2>
        </div>
        <p className="text-sm text-slate-300 mt-1">
          가족, 혼자, 연인, 친구, 라이더 등 누구와 함께 가는지 선택하면 최적의 시간대별 코스 타임라인과 준비물 체크리스트를 안내해 드립니다.
        </p>
      </div>

      {/* Target Audience Selector Pills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            1. 누구와 함께 방문하시나요? (동행자 선택)
          </label>
          <span className="text-xs text-pink-300 font-semibold">
            총 {HANGANG_COURSES.length}개 큐레이션 코스
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {targets.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTarget === t.label;
            const count = t.label === '전체 코스' 
              ? HANGANG_COURSES.length 
              : HANGANG_COURSES.filter(c => c.target === t.label).length;

            return (
              <button
                key={t.label}
                onClick={() => setSelectedTarget(t.label)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer backdrop-blur-md relative overflow-hidden group ${
                  isSelected
                    ? 'border-pink-400/80 bg-pink-500/20 shadow-lg shadow-pink-500/20 text-white ring-2 ring-pink-400/30'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                    isSelected ? 'bg-pink-500 text-white border-pink-400 shadow-md shadow-pink-500/40' : 'bg-white/10 text-slate-300 border-white/10 group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isSelected ? 'bg-pink-400/30 text-pink-200 border-pink-300/40' : 'bg-white/5 text-slate-400 border-white/10'
                  }`}>
                    {count}개 코스
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-white leading-tight">{t.label}</h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{t.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Course Cards Container */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
            <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
            「{selectedTarget}」 맞춤 추천 코스 ({filteredCourses.length}개)
          </h3>
          <span className="text-xs text-slate-400">실제 코스 타임라인 & 팁 완비</span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => {
              const matchedPark = HANGANG_PARKS.find(p => p.id === course.recommendedParkId);
              const isSaved = savedCourseIds.includes(course.id);
              const isCopied = copiedCourseId === course.id;

              return (
                <div key={course.id} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex flex-col justify-between hover:border-pink-400/40 transition-all shadow-xl hover:shadow-2xl hover:shadow-pink-500/10 text-white">
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30">
                            {course.target}
                          </span>
                          {matchedPark && (
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center">
                              <MapPin className="w-3 h-3 mr-0.5" />
                              {matchedPark.name}
                            </span>
                          )}
                          <span className="text-[11px] font-medium text-slate-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1 text-amber-400" /> {course.duration} ({course.distance})
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                          {course.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => onSaveCourse(course)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 backdrop-blur-md ${
                          isSaved
                            ? 'bg-pink-500 border-pink-400 text-white shadow-md shadow-pink-500/30'
                            : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                        title={isSaved ? '코스 저장 취소' : '코스 저장하기'}
                      >
                        <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 mb-4 leading-relaxed font-medium">
                      {course.subtitle}
                    </p>

                    {/* Timeline Steps */}
                    <div className="space-y-3 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/15 my-4 pl-6">
                      {course.timeline.map((step, idx) => (
                        <div key={idx} className="relative text-xs">
                          {/* Dot */}
                          <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-pink-400 ring-4 ring-slate-900" />
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-pink-300 bg-pink-500/20 border border-pink-400/30 px-1.5 py-0.5 rounded text-[11px]">
                              {step.time}
                            </span>
                            <strong className="font-bold text-white text-xs">{step.place}</strong>
                          </div>
                          <p className="text-slate-200 mt-0.5 font-medium leading-relaxed">{step.activity}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 italic">💡 {step.tip}</p>
                        </div>
                      ))}
                    </div>

                    {/* Packing & Budget */}
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 text-xs space-y-2.5 mt-4 backdrop-blur-md">
                      <div>
                        <span className="font-bold text-slate-300 block mb-1">🎒 추천 준비물:</span>
                        <div className="flex flex-wrap gap-1">
                          {course.packingList.map(item => (
                            <span key={item} className="bg-white/10 text-slate-200 border border-white/10 px-2 py-0.5 rounded-md text-[11px]">
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-slate-300">
                        <span className="font-medium text-slate-400">예상 비용:</span>
                        <strong className="text-pink-300 font-bold">{course.budgetEst}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyTimeline(course)}
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer backdrop-blur-md"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-bold">복사 완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>타임라인 복사</span>
                        </>
                      )}
                    </button>

                    {matchedPark && (
                      <button
                        onClick={() => onSelectPark(matchedPark.id)}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white rounded-xl text-xs font-bold flex items-center space-x-1 transition-all shadow-md shadow-pink-500/20 border border-pink-400/30 cursor-pointer"
                      >
                        <span>{matchedPark.name} 정보 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/[0.02] rounded-2xl border border-white/10">
            <Compass className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">해당 조건의 추천 코스가 없습니다.</p>
            <button
              onClick={() => setSelectedTarget('전체 코스')}
              className="mt-3 px-4 py-2 bg-pink-500/20 text-pink-300 border border-pink-400/30 rounded-xl text-xs font-bold hover:bg-pink-500/30 transition-colors"
            >
              전체 코스 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
