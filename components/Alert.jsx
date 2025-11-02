export default function Alert({ type = "info", message }) {
  if (!message) return null;
  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    error: "border-rose-200 bg-rose-50 text-rose-700",
  };
  return (
    <div className={`rounded-md border px-4 py-3 text-sm ${styles[type] || styles.info}`}>
      {message}
    </div>
  );
}
