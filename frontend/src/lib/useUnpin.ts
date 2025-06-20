// /lib/useUnpin.ts
import { useMutation } from "@tanstack/react-query";
import { unpinMatchAPI } from "@/services/StateService";

export const useUnpin = (token: string) => {
  return useMutation({
    mutationFn: () => unpinMatchAPI(token),
  });
};
