import NavigationList from "./NavigationList";
export default function Navigation() {
  const navItems = [
    { label: "Sale", href: "/sneakers/nav/sales" },
    { label: "Releases", href: "/" },
    { label: "Men", href: "/sneakers/nav/men" },
    { label: "Women", href: "/sneakers/nav/women" },
  ];

  return (
    <nav className="flex justify-center">
      <NavigationList
        navItems={navItems}
        className="flex-row hidden items-center text-lg font-normal md:flex"
      />
    </nav>
  );
}
