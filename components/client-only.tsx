"use client";

import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const ClientOnly: FC<Props> = ({ children }) => {
  const [mouted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mouted ? children : null;
};

export default ClientOnly;
