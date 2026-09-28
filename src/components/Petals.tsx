export default function Petals({ burst = false }: { burst?: boolean }) {
  return <div className={`petals ${burst ? "petals-burst" : ""}`} aria-hidden="true">{Array.from({ length: burst ? 18 : 12 }, (_, index) => <i key={index} className="petal" style={{ "--i": index } as React.CSSProperties} />)}</div>;
}