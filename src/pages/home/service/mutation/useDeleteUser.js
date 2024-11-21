import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteUser = () => {
  const client = useQueryClient();
  return useMutation({
      mutationFn: (id) => request.delete(`/info/${id}`).then((res) => res.data),
      onSuccess: () => {
          client.invalidateQueries(['users']);
      },
  });
}