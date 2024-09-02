"use client";

import { FC, useEffect } from "react";
import EmptyState from "./_components/empty-state";

interface ErrorStateProps {
  error?: Error;
}

const Error: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default Error;
