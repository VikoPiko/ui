import PageContent from "@/components/custom/PageContent";
import { getAllListings } from "@/lib/actions/property-listing/listings.actions";
import { getQueryClient } from "@/lib/providers/react-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import React from "react";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["listings"],
    queryFn: getAllListings,
    staleTime: 1000 * 60 * 5,
  });

  // if (!rawListings) {
  //   return <div>No listings found</div>;
  // }
  // const listings = rawListings.map((l: any) => ({
  //   listing: {
  //     ...l,
  //     property: l.property || {
  //       location: "",
  //       hostId: "",
  //       address: "",
  //       host: { firstName: "", lastName: "", avatarUrl: "" },
  //     },
  //   },
  // }));

  return (
    // <div className="grid gap-4 p-4 grid-cols-[200px_1fr]">
    //   <Sidebar />

    //   {/* <Dashboard onViewChange={setActiveView} /> */}
    //   <Dashboard listings={listings} />
    // </div>
    // <PageContent listings={listings} />
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContent />
    </HydrationBoundary>
  );
};

export default page;
