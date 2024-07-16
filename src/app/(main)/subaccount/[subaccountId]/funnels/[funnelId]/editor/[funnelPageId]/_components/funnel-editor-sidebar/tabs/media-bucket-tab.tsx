"use client";
import React, { useEffect, useState } from "react";
import { getMedia } from "@/lib/queries";
import { GetMediaFiles } from "@/lib/types";
import MediaComponent from "@/components/media";

type Props = {
  subaccountId: string;
};

const MediaBucketTab = (props: Props) => {
  const [data, setdata] = useState<GetMediaFiles>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia(props.subaccountId);
      setdata(response);
    };
    fetchData();
  }, [props.subaccountId]);

  return (
    <div className="h-[900px] overflow-scroll p-4">
      <MediaComponent data={data} subaccountId={props.subaccountId} />
    </div>
  );
};

export default MediaBucketTab;
