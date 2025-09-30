import { ArrowRightCircleIcon } from "@heroicons/react/24/solid"; // Alternative icon
import { signOutAction } from "@/app/_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex items-center w-full gap-2 font-medium transition-colors hover:bg-primary-900 hover:text-primary-600/20 text-primary-600">
        <ArrowRightCircleIcon className="w-5 h-5 text-primary-600/70" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
