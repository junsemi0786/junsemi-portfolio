import { NextRequest, NextResponse } from 'next/server';
import { getVisitorStats, incrementVisitorStats } from '@/lib/visitor-stats';

export async function GET(request: NextRequest) {
    // 쿠키 확인 (중복 방문 방지)
    const cookieName = 'has_visited_today';
    const hasVisited = request.cookies.get(cookieName);

    let stats;

    if (!hasVisited) {
        // 처음 방문인 경우 카운트 증가
        stats = await incrementVisitorStats();
    } else {
        // 이미 방문한 경우 현재 수치만 조회
        stats = await getVisitorStats();
    }

    const response = NextResponse.json(stats);

    // 방문 여부 쿠키 설정 (24시간 유효)
    if (!hasVisited) {
        response.cookies.set(cookieName, 'true', {
            maxAge: 60 * 60 * 24, // 24시간
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
        });
    }

    return response;
}
