import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "User created successfully, Please verify the new account from the user's email address",
      );
    },
    onError: (error) =>
      toast.error(error.message || "There was an error signing you up"),
  });
  return { signup, isPending };
}

export default useSignup;
