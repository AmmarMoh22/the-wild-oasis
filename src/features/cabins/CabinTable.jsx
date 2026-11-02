import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

import useCabins from "./useCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isPending } = useCabins();
  const [searchParams] = useSearchParams();
  if (isPending) return <Spinner />;
  if (!cabins?.length) return <Empty resource="cabins" />;

  const urlParams = searchParams.get("discount") || "all";
  let filteredCabins = cabins;
  if (urlParams === "all") filteredCabins = cabins;
  if (urlParams === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (urlParams === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount == 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const comparison =
      typeof a[field] === "string"
        ? a[field].localeCompare(b[field])
        : a[field] - b[field];
    return comparison * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
