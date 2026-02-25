import { createFavoriteAction, removeFavoriteAction } from '@/actions/favorite-action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

export function useFavoriteSneaker(initialValue: boolean, sneakerId: string) {
  const [isFavoriteState, setIsFavoriteState] = useState<boolean>(initialValue);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();

  const handleFavorite = () => {
    if (!session?.user?.userId) {
      toast.error('Faça login para favoritar este produto. Redirecionando...');
      setTimeout(() => router.push('/login'), 2500);
      return;
    }

    const nextValue = !isFavoriteState;
    setIsFavoriteState(nextValue);

    startTransition(async () => {
      try {
        nextValue ? await createFavoriteAction(sneakerId) : await removeFavoriteAction(sneakerId);
      } catch {
        setIsFavoriteState(!nextValue);
      }
    });
  };

  return { isFavoriteState, isPending, handleFavorite };
}
