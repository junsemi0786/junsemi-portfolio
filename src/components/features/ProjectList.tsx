"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/types/case-study";
export default function ProjectList({
  cases,
  filter = false,
}: {
  cases: Pick<
    CaseStudy,
    "id" | "projectName" | "period" | "summary" | "tags" | "thumbnailUrl"
  >[];
  filter?: boolean;
}) {
  const [category, setCategory] = useState("전체");
  const shown = cases.filter(
    (c) =>
      category === "전체" ||
      (category === "SCADA·자동제어"
        ? /SCADA|정수장|CCSS/i.test(c.projectName + " " + c.tags.join(" "))
        : !/SCADA|정수장|CCSS/i.test(c.projectName + " " + c.tags.join(" "))),
  );
  return (
    <>
      {filter && (
        <div className="filters" aria-label="프로젝트 분야">
          {["전체", "반도체 장비", "SCADA·자동제어"].map((t) => (
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
              <Link
                href={`/cases/${c.id}`}
                className="case-image"
                style={{ display: "block" }}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={c.thumbnailUrl}
                  alt=""
                  fill
                  sizes="(max-width:740px) 100vw, (max-width:900px) 50vw, 33vw"
                />
              </Link>
            )}
            <div className="card-body">
              <span className="eyebrow">{c.period}</span>
              <h3>
                <Link href={`/cases/${c.id}`}>{c.projectName}</Link>
              </h3>
              <p>{c.summary}</p>
              <div className="tags">
                {c.tags.slice(0, 3).map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <Link className="card-link" href={`/cases/${c.id}`}>
                작업 내용 보기 →
              </Link>
            </div>
          </article>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="empty-state">
          공개된 프로젝트를 준비하고 있습니다. 필요한 작업은 이메일로 문의해
          주세요.
        </p>
      )}
    </>
  );
}
