import SideNavigation from "../_components/sideNavigation/SideNavigation";

export default function layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] text-primary-600  gap-12 h-full">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
