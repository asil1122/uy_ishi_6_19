import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useCreateUser = () => {
   const client = useQueryClient()
   return useMutation({
      mutationFn: (data) => request.post('/info',data).then((res) => res.data),
      onSuccess: (data) => {
         client.invalidateQueries(['info'])
      }
   })  
}