import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Successfully loged in");
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", {
        replace: true,
      });
    },
    onError: () =>
      toast.error(
        "There was a problem logging You in check your credentials and try again",
      ),
  });
  return { login, isPending };
}
export default useLogin;
