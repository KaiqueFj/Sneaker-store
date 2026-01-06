import { createFavorite, removeFavorite } from "@/lib/data-service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export function useFavoriteSneaker(initialValue, sneakerId) {
  const [isFavoriteState, setIsFavoriteState] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();

  const handleFavorite = (e) => {
    e?.preventDefault();

    if (!session?.user?.userId) {
      toast.error("Log in to favorite this product. Redirecting...");
      setTimeout(() => router.push("/login"), 2500);
      return;
    }

    const nextValue = !isFavoriteState;
    setIsFavoriteState(nextValue);

    startTransition(async () => {
      try {
        nextValue
          ? await createFavorite(sneakerId)
          : await removeFavorite(sneakerId);
      } catch {
        setIsFavoriteState(!nextValue);
      }
    });
  };

  return { isFavoriteState, isPending, handleFavorite };
}
