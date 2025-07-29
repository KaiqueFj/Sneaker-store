import Logo from "./logo/Logo";
import Navigation from "./nav/Navigation";
import OtherOptions from "./otherOptions/otherOptions";

export default function Header() {
  return (
    <header className="w-full border-b-4 border-primary-200/60 px-5 py-6">
      <div className="grid grid-cols-[auto_1fr_auto] items-center  max-w-7xl mx-auto">
        <Logo />
        <Navigation />
        <OtherOptions />
      </div>
    </header>
  );
}
