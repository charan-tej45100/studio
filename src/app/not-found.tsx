
export default function NotFound() {
  const texts = Array.from({ length: 24 });

  return (
    <div className="flex min-h-screen flex-wrap gap-16 bg-background p-8">
      {texts.map((_, i) => (
        <h1
          key={i}
          className="animate-bounce-slow text-6xl font-extrabold tracking-tight"
          style={{ color: '#FF143C' }}
        >
          404
        </h1>
      ))}
    </div>
  );
}
