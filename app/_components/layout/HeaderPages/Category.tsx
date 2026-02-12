export default function Category({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="items-center sm:text-xl lg:text-2xl text-primary-600 font-semibold">
      {children}
    </h2>
  );
}
