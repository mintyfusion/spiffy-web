import { ContentZone } from "@agility/nextjs";
import { ContentZoneProps } from "@agility/nextjs/types";
import React from "react";

import { getModule } from "components/agility-pageModules";

const MainTemplate = (props?: ContentZoneProps): JSX.Element =>
  <ContentZone name="MainZone" {...props} getModule={getModule} />;

export default MainTemplate;
