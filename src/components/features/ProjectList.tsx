"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/types/case-study";
export default function ProjectList({
  cases,
  filter = false,
  locale = "ko",
}: {
  cases: Pick<
    CaseStudy,
    "id" | "projectName" | "period" | "summary" | "tags" | "thumbnailUrl"
  >[];
  filter?: boolean;
  locale?: "ko" | "en";
}) {
  const en = locale === "en";
  const all = en ? "All" : "전체";
  const automation = en ? "SCADA & Automation" : "SCADA·자동제어";
  const [category, setCategory] = useState(all);
  const shown = cases.filter(
    (c) =>
      category === all ||
      (category === automation
        ? /SCADA|정수장|CCSS/i.test(c.projectName + " " + c.tags.join(" "))
        : !/SCADA|정수장|CCSS/i.test(c.projectName + " " + c.tags.join(" "))),
  );
  return (
    <>
      {filter && (
        <div className="filters" aria-label={en ? "Project category" : "프로젝트 분야"}>
          {[all, en ? "Semiconductor Equipment" : "반도체 장비", automation].map((t) => (
            <button
              key={t}
              aria-pressed={category === t}
              onClick={() => setCategory(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="cards case-grid">
        {shown.map((c) => (
          <article className="card" key={c.id}>
            {c.thumbnailUrl && (
              <div
                className="case-image"
                style={{ display: "block" }}
              >
                <Image
                  src={c.thumbnailUrl}
                  alt={en ? `${c.projectName} project photo` : `${c.projectName} 프로젝트 사진`}
                  fill
                  sizes="(max-width:740px) 100vw, (max-width:900px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="card-body">
              <span className="eyebrow">{c.period}</span>
              <h3>
                <Link href={`${en ? "/en" : ""}/cases/${c.id}`}>{c.projectName}</Link>
              </h3>
              <p>{c.summary}</p>
              <div className="tags">
                {c.tags.slice(0, 3).map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <Link className="card-link" href={`${en ? "/en" : ""}/cases/${c.id}`}>
                {en ? "View case study →" : "작업 내용 보기 →"}
              </Link>
            </div>
          </article>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="empty-state">
          {en
            ? "English case studies are being prepared. Please email us about your equipment or control-system requirements."
            : "공개된 프로젝트를 준비하고 있습니다. 필요한 작업은 이메일로 문의해 주세요."}
        </p>
      )}
    </>
  );
}
