interface HomeFeatureCardProps {
  title: string;
  description: string;
}

export function HomeFeatureCard({ title, description }: HomeFeatureCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-line/70 bg-card p-6 shadow-soft">
      <h3 className="font-serif text-2xl text-ink">{title}</h3>
      <p className="mt-3 leading-7 text-muted">{description}</p>
    </div>
  );
}
