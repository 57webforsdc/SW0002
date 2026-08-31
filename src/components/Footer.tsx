import React from 'react';
import { Waves, Heart, Phone, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-2xl text-slate-400 text-xs border-t border-white/10 pt-12 pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 border border-sky-300/30">
                <Waves className="w-4 h-4" />
              </div>
              <span>서울 한강공원 가이드</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              서울을 가로지르는 41.5km 한강과 11개 공원의 다채로운 매력, 피크닉 수칙, 배달존 및 일몰 정보를 제공하는 종합 시민 안내 플랫폼입니다.
            </p>
          </div>

          {/* Col 2: 11 Parks Quick List */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">11개 한강공원</h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">여의도 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">반포 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">뚝섬 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">망원 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">난지 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">잠실 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">이촌 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">잠원 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">광나루 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">양화 한강공원</span>
              <span className="text-slate-400 hover:text-sky-300 transition-colors cursor-default">강서 한강공원</span>
            </div>
          </div>

          {/* Col 3: Official Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">공식 바로가기</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://hangang.seoul.go.kr"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <span>서울특별시 미래한강본부</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://yeyak.seoul.go.kr"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <span>서울시 공공서비스예약 (캠핑/체험)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bikeseoul.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <span>서울자전거 따릉이 공식 사이트</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Contacts */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">안전 & 긴급 연락처</h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p>🚨 119 수난구조대: <strong className="text-rose-400">119</strong></p>
              <p>📞 서울시 다산콜센터: <strong className="text-sky-400">120</strong></p>
              <p>🏢 한강사업본부 종합상황실: <strong className="text-teal-400">02-3780-0777</strong></p>
              <p className="text-[11px] text-slate-400 pt-1">
                * 한강 공원 내 안전 및 시설 관련 문의는 24시간 상황실로 접수 가능합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom divider & company information */}
        <div className="pt-8 border-t border-white/10 space-y-4 text-[12px] text-slate-400">
          {/* Policy Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium">
            <button className="text-slate-300 hover:text-white transition-colors cursor-pointer">개인정보 처리방침</button>
            <span className="text-slate-700">|</span>
            <button className="text-slate-300 hover:text-white transition-colors cursor-pointer">영상정보처리기기운영·관리방침</button>
            <span className="text-slate-700">|</span>
            <button className="text-slate-300 hover:text-white transition-colors cursor-pointer">이메일추출방지</button>
            <span className="text-slate-700">|</span>
            <button className="text-slate-300 hover:text-white transition-colors cursor-pointer">찾아오시는 길</button>
          </div>

          {/* Business Details */}
          <div className="space-y-1 text-slate-400 text-xs leading-relaxed">
            <p>사업자등록번호 : 100-10-001010</p>
            <p>우) 13495 서울특별시 중구 동호로 10길 30(신당동) <span className="text-slate-600 px-1">|</span> 전화 : 010-2026-0831</p>
          </div>

          {/* Copyright */}
          <div className="pt-2 text-[11px] text-slate-400">
            Copyright© 2026 한강정보주식회사 All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
