import { useMutation, useQueryClient } from '@tanstack/react-query'
import { request } from '../../../../config/request';

export const useEditUser = () => {
    const client = useQueryClient();
return useMutation({
    mutationFn: ({id, data}) => request.put(`/info/${id}`,data).then((res) => res.data),
    onSuccess: () => {
        client.invalidateQueries(['users']);
    },
});
};
