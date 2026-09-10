import Link from "next/link";
import services from "@/lib/service-content.json";
export default function ServiceCards() {
  return (
    <div className="cards">
      {services.map((s, i) => (
        <article className="card" key={s.slug}>
          <div className="card-body">
            <span className="eyebrow">
              0{i + 1} / {s.en}
            </span>
            <h3>
              <Link href={`/services/${s.slug}`}>{s.title}</Link>
            </h3>
            <p>{s.desc}</p>
            <ul>
              {s.problems.slice(0, 2).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link href={`/services/${s.slug}`} className="card-link">
              지원 범위 확인 →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
