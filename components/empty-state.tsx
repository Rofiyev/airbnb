"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import Heading from "./heading";
import Button from "./button";

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<Props> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[100vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all fiters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
