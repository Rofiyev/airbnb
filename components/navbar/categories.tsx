"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/constants";
import { TCategory } from "@/types";
import Container from "../container";
import CategoryBox from "../category-box";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto custom-scrollbar">
        {categories.map((item: TCategory) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
