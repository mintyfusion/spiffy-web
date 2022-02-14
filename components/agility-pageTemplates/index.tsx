import { ComponentWithInit } from "@agility/nextjs";

import MainTemplate from "components/agility-pageTemplates/MainTemplate";

// All of the Agility Page Template Components that are in use in this site need to be imported into this index file.
// Place Page Templates in allTemplates array below, passing in a name and the component.
const allTemplates: Record<string, ComponentWithInit> = { MainTemplate };

export const getPageTemplate = (templateName: string): ComponentWithInit => {
    if (!templateName) return null;

    return allTemplates[templateName];
};
