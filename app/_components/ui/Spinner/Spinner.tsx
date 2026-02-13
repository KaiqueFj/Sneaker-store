export default function Spinner({
  size = "md",
  label = "Loading...",
}: {
  size: String;
  label: String;
}) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <span className={`spinner spinner-${size}`} />
      {label && (
        <span className="text-lg text-primary-600 font-medium">{label}</span>
      )}
    </div>
  );
}
