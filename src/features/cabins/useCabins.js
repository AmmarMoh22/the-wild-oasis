import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const { data: cabins, isPending } = useQuery({
    queryFn: getCabins,
    queryKey: ["cabins"],
  });

  return { cabins, isPending };
}

export default useCabins;
