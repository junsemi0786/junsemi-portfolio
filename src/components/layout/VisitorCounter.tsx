"use client";

import { useState } from "react";

export default function VisitorCounter({ preview }: { preview: boolean }) {
  const [failed, setFailed] = useState(false);
  // Retain the original production counter key; preview traffic is separate.
  const path = preview
    ? "https://junsemi.co.kr/renewal-preview"
    : "https://junsemi.co.kr";
  const query = new URLSearchParams({
    path,
    label: "TOTAL",
    labelColor: "303438",
    countColor: "a84b1c",
    style: "flat-square",
  });

  return (
    <div className="visitor-counter" aria-label="방문자 카운터">
      <span>누적 방문{preview ? " · 미리보기 집계" : ""}</span>
      {failed ? (
        <span className="muted" role="status">방문 통계를 불러올 수 없습니다.</span>
      ) : (
        // A direct request preserves the existing counter service's counting behavior.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://api.visitorbadge.io/api/visitors?${query}`}
          alt="누적 방문자 수"
          height={22}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
