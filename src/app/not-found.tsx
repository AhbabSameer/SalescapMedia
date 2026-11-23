import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-40 pb-32">
      <div className="container-x text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-5xl font-bold mt-4">Page not found.</h1>
        <Link href="/" className="btn btn-primary mt-8">Back home</Link>
      </div>
    </section>
  );
}
