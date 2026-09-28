import Link from "next/link";

export default function EnglishNotFound() {
  return (
    <section className="section container">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="lead" style={{ marginTop: 20 }}>
        Check the address or browse the published case studies.
      </p>
      <div className="actions">
        <Link href="/en/cases" className="btn-primary">View Case Studies</Link>
        <Link href="/en" className="btn-secondary">English Home</Link>
      </div>
    </section>
  );
}
