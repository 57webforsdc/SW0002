import React, { useState } from 'react';
import { HANGANG_PARKS, HANGANG_COURSES } from '../data/hangangData';
import { HangangPark, HangangCourse } from '../types';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  CheckSquare, 
  Square, 
  Plus, 
  Sparkles,
  Waves,
  Compass
} from 'lucide-react';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedParkIds: string[];
  savedCourses: HangangCourse[];
  onToggleBookmarkPark: (parkId: string) => void;
  onRemoveCourse: (courseId: string) => void;
  onSelectPark: (parkId: string) => void;
}

export const BookmarkDrawer: React.FC<BookmarkDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedParkIds,
  savedCourses,
  onToggleBookmarkPark,
  onRemoveCourse,
  onSelectPark,
}) => {
  const [activeTab, setActiveTab] = useState<'parks' | 'courses' | 'checklist'>('parks');
  const [checklist, setChecklist] = useState<Array<{ id: number; text: string; done: boolean }>>([
    { id: 1, text: '방수 피크닉 돗자리 (또는 규격 그늘막 텐트)', done: false },
    { id: 2, text: '스마트폰 보조배터리 & 충전선', done: false },
    { id: 3, text: '물티슈 & 휴대용 화장지 (먹방 필수)', done: false },
    { id: 4, text: '규격 종량제 쓰레기봉투 (클린 피크닉)', done: false },
    { id: 5, text: '선크림, 선글라스 & 모자', done: false },
    { id: 6, text: '가벼운 바람막이 겉옷/담요 (밤바람 대비)', done: false },
    { id: 7, text: '블루투스 스피커 (적정 볼륨 유지)', done: false },
    { id: 8, text: '신분증 (유람선 승선 시 필수)', done: false },
  ]);
  const [newCheckItem, setNewCheckItem] = useState('');

  if (!isOpen) return null;

  const bookmarkedParks = HANGANG_PARKS.filter(p => bookmarkedParkIds.includes(p.id));

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const addCheckItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCheckItem.trim()) {
      setChecklist(prev => [...prev, { id: Date.now(), text: newCheckItem.trim(), done: false }]);
      setNewCheckItem('');
    }
  };

  const removeCheckItem = (id: number) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border-l border-white/15 h-full shadow-2xl flex flex-col justify-between text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">내 나들이 보관함</h3>
              <p className="text-xs text-slate-400">찜한 공원과 코스 & 피크닉 체크리스트</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-white/10 bg-white/[0.02] px-4 pt-2 gap-2 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('parks')}
            className={`py-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'parks'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            찜한 공원 ({bookmarkedParks.length})
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            저장한 코스 ({savedCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'checklist'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            피크닉 체크리스트
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: PARKS */}
          {activeTab === 'parks' && (
            <div className="space-y-3">
              {bookmarkedParks.length > 0 ? (
                bookmarkedParks.map((park) => (
                  <div
                    key={park.id}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 hover:border-sky-400/40 backdrop-blur-md transition-all shadow-md"
                  >
                    <div 
                      onClick={() => {
                        onSelectPark(park.id);
                        onClose();
                      }}
                      className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0"
                    >
                      <img
                        src={park.images[0]}
                        alt={park.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10"
                      />
                      <div className="truncate">
                        <h4 className="text-sm font-bold text-white truncate">{park.name}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{park.region} • {park.subway}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => onToggleBookmarkPark(park.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectPark(park.id);
                          onClose();
                        }}
                        className="p-1.5 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                        title="상세보기"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                  <p className="text-xs text-slate-400">찜한 한강공원이 아직 없습니다.</p>
                  <p className="text-[11px] text-slate-500 mt-1">공원 카드에서 하트/북마크를 눌러 저장해보세요.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-3">
              {savedCourses.length > 0 ? (
                savedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2 shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-400/30">
                          {course.target}
                        </span>
                        <h4 className="font-bold text-sm text-white mt-1">{course.title}</h4>
                      </div>
                      <button
                        onClick={() => onRemoveCourse(course.id)}
                        className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">{course.subtitle}</p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                      <span>소요시간: {course.duration}</span>
                      <button
                        onClick={() => {
                          onSelectPark(course.recommendedParkId);
                          onClose();
                        }}
                        className="text-sky-400 font-bold hover:text-sky-300 flex items-center space-x-0.5 cursor-pointer"
                      >
                        <span>공원 보기</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Compass className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                  <p className="text-xs text-slate-400">저장된 맞춤 코스가 없습니다.</p>
                  <p className="text-[11px] text-slate-500 mt-1">코스 플래너 탭에서 마음에 드는 일정을 담아보세요.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <form onSubmit={addCheckItem} className="flex gap-2">
                <input
                  type="text"
                  value={newCheckItem}
                  onChange={(e) => setNewCheckItem(e.target.value)}
                  placeholder="챙길 준비물 직접 추가..."
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-sky-500 backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl transition-all shadow-md shadow-sky-500/20 border border-sky-400/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              <div className="space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-medium cursor-pointer transition-all backdrop-blur-md ${
                      item.done
                        ? 'bg-white/[0.02] border-white/5 text-slate-500 line-through'
                        : 'bg-white/[0.04] border-white/10 text-slate-200 hover:border-sky-400/40 hover:bg-white/[0.07]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      {item.done ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span>{item.text}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCheckItem(item.id);
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20 text-[11px] text-sky-200 backdrop-blur-md">
                💡 체크리스트는 브라우저에 저장되어 나들이 출발 전 하나씩 확인할 수 있습니다.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 text-center backdrop-blur-md">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-500/20 border border-sky-400/30 cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
