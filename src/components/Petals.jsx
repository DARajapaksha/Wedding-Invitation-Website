export default function Petals() {
  return (
    <div className="petal-layer" aria-hidden="true">
      {Array.from({ length: 14 }, (_, index) => (
        <span
          className="petal"
          key={index}
          style={{
            '--i': index + 1,
            left: `${4 + ((index * 7) % 92)}%`,
            animationDelay: `${(index % 7) * 1.8}s`,
            animationDuration: `${12 + (index % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}
