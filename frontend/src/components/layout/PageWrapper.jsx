export default function PageWrapper({ children, className = "" }) {
  return (
    <main className={`container page-content ${className}`}>
      {children}
      <style>{`
        .page-content {
          padding-top: 2rem;
          padding-bottom: 4rem;
          min-height: calc(100vh - 60px);
          animation: fadeIn 0.35s ease;
        }
      `}</style>
    </main>
  );
}
