import { useState } from "react";

const useTabBar = options => {
  const [activeTab, setActiveTab] = useState(options[0]?.key);

  return [activeTab, option => setActiveTab(option.key)];
};

export default useTabBar;
