import { useState } from "react";

export const useTabBar = options => {
  const [activeTab, setActiveTab] = useState(options[1]?.key);

  return [activeTab, option => setActiveTab(option.key)];
};
