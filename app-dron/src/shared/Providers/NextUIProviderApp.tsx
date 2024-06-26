'use client';

import { NextUIProvider } from "@nextui-org/react";

export default function NextUIProviderApp({children}: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
          {children}
        </NextUIProvider>
      )
}