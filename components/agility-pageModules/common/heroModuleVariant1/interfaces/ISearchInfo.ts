import React from "react";

export default interface ISearchInfo {
    searchValue: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}