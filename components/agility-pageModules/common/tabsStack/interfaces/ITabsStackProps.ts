import React from "react";


export default interface ITabsStackProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    tabs: string[];
}