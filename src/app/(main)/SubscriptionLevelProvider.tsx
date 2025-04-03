"use client";

import { SubscriptionLevel } from "@/lib/subscriptions";
import React, { useContext } from "react";
import { createContext } from "react";

const SubscriptionLevelContext = createContext<SubscriptionLevel | undefined>(
  undefined,
);

interface SubscriptionLevelProviderProps {
  children: React.ReactNode;
  userSubscriptionLevel: SubscriptionLevel;
}
const SubscriptionLevelProvider = ({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProviderProps) => {
  return (
    <SubscriptionLevelContext.Provider value={userSubscriptionLevel}>
      {children}
    </SubscriptionLevelContext.Provider>
  );
};

export default SubscriptionLevelProvider;

export function useSubscriptionLevel() {
  const context = useContext(SubscriptionLevelContext);
  if (!context) {
    throw new Error(
      "useSubscriptionLevel must be used within a SubscriptionLevelProvider",
    );
  }
  return context;
}
