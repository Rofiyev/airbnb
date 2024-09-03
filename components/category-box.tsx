"use client";

import { FC, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface Props {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: FC<Props> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery: {
      category?: string;
    } = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updateQuery: {
      category?: string;
    } = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) delete updateQuery.category;

    const url = qs.stringifyUrl(
      { url: "/", query: updateQuery },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-2 border-b-2 hover:text-neutral-800 transition cursor-pointer 
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}
    >
      <Icon size={26} />
      <div className="font-semibold text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
