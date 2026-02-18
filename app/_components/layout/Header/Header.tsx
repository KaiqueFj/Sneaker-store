import Logo from "./logo/Logo";
import Navigation from "./nav/Navigation";
import OtherOptions from "./otherOptions/otherOptions";
import SearchBar from "./otherOptions/SearchBar";

export default function Header() {
  return (
    <header className="w-full border-b border-primary-200/60 px-5 py-4 sticky top-0 bg-white z-50">
      <div className="flex flex-row justify-between gap-2 items-center  max-w-7xl mx-auto">
        <Logo />
        <Navigation />
        <OtherOptions />
      </div>
      <div className="pt-2  w-full flex md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}
