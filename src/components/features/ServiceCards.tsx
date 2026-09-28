import Link from "next/link";
import services from "@/lib/service-content.json";
import { englishServices } from "@/lib/english-content";
export default function ServiceCards({ locale = "ko" }: { locale?: "ko" | "en" }) {
  const en = locale === "en";
  const items = en ? englishServices : services;
  return (
    <div className="cards">
      {items.map((s, i) => (
        <article className="card" key={s.slug}>
          <div className="card-body">
            <span className="eyebrow">
              0{i + 1} / {"eyebrow" in s ? s.eyebrow : s.en}
            </span>
            <h3>
              <Link href={`${en ? "/en" : ""}/services/${s.slug}`}>{s.title}</Link>
            </h3>
            <p>{s.desc}</p>
            <ul>
              {s.problems.slice(0, 2).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link href={`${en ? "/en" : ""}/services/${s.slug}`} className="card-link">
              {en ? "View service scope →" : "지원 범위 확인 →"}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
