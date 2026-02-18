import NavigationList from "./NavigationList";
export default function Navigation() {
  const navItems = [
    { label: "Ofertas", href: "/sneakers/nav/sales" },
    { label: "Lançamentos", href: "/sneakers/nav/releases" },
    { label: "Homens", href: "/sneakers/nav/masculino" },
    { label: "Mulheres", href: "/sneakers/nav/feminino" },
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
