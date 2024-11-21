import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['info'],
        queryFn: () => request.get('/info').then((res) => res.data)
    })
}
