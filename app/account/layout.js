export default function layout({ children }) {
  return (
    <div className=" flex flex-col justify-center self-center text-primary-600  gap-12 h-full">
      <div className="py-1">{children}</div>
    </div>
  );
}
