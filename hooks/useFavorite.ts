import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "@prisma/client";

interface IUserFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser?.favoriteIds, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let request;

        if (hasFavorited) {
          request = () =>
            axios
              .delete(`/api/favorites/${listingId}`)
              .then(() => toast.success("Unfavorite successfully!"));
        } else {
          request = () =>
            axios
              .post(`/api/favorites/${listingId}`)
              .then(() => toast.success("Favorite successfully!"));
        }

        await request();
        return router.refresh();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, loginModal, hasFavorited, listingId, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
