export const t = {
    // Header Navigation
    nav: {
        expertise: { ko: '기술 역량', en: 'Expertise' },
        cases: { ko: '주요 실적', en: 'Cases' },
        contact: { ko: '문의하기', en: 'Contact' },
    },

    // Home Page
    home: {
        trustedBy: { ko: '산업계 리더들의 선택', en: 'Trusted By Industry Leaders' },
        ctaButton: { ko: '프로젝트 문의하기', en: 'Request a Quote' },
    },

    // Expertise Page
    expertise: {
        pageTitle: { ko: '기술 역량 (Expertise)', en: 'Technical Expertise' },
        pageSubtitle: {
            ko: '반도체 장비부터 제어 시스템까지,\nJunSemi만의 차별화된 기술력을 소개합니다.',
            en: 'From semiconductor equipment to control systems,\nexplore JunSemi\'s specialized engineering capabilities.',
        },
    },

    // Cases Page
    cases: {
        pageTitle: { ko: '주요 실적', en: 'Case Studies' },
        pageSubtitle: {
            ko: '복잡한 문제를 우아한 엔지니어링 솔루션으로 해결합니다.\n변화를 만들어낸 주요 프로젝트들을 소개합니다.',
            en: 'Solving complex challenges with elegant engineering solutions.\nExplore our key projects that made a real difference.',
        },
        empty: { ko: '아직 등록된 실적이 없습니다.', en: 'No case studies registered yet.' },
    },

    // Contact Page
    contact: {
        pageTitle: { ko: '문의 및 지원', en: 'Contact & Support' },
        pageSubtitle: {
            ko: '기술적인 고민이 있으신가요?\n지금 바로 전문가와 상의하세요.',
            en: 'Have a technical challenge?\nConsult with our experts today.',
        },
        contactInfo: { ko: '연락처', en: 'Contact Info' },
        phone: { ko: '대표 전화', en: 'Phone' },
        email: { ko: '이메일', en: 'Email' },
        fax: { ko: '팩스', en: 'Fax' },
        directions: { ko: '찾아오시는 길', en: 'How to Find Us' },
        mapMessage: { ko: '📍 위치 안내 (지도)', en: '📍 Location Map' },
        mapNote: {
            ko: '(실제 서비스 시 네이버 지도 API가 연동됩니다)',
            en: '(Naver Maps API will be integrated in production)',
        },
    },
} as const;

export type TranslationKey = keyof typeof t;

/** 현재 언어에 맞는 문자열을 반환하는 헬퍼 */
export function tx(entry: { ko: string; en: string }, language: 'ko' | 'en'): string {
    return entry[language];
}
