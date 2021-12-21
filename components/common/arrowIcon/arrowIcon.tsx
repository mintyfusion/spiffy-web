import Image from "next/image";
import React from "react";

import IArrowIconProps from "components/common/arrowIcon/interfaces/IArrowIconProps";

const ArrowIcon = (props: IArrowIconProps): JSX.Element => {
    const arrowsGeneration = React.useMemo(() =>
        Array.from(Array(props.quantity), (_: number, index: number) =>
            <Image
                src="/images/homepage/features-section/arrow-left.svg"
                alt="Arrow Left"
                width={props.width}
                height={props.height}
                layout={props.layout}
                priority={true}
                key={index}
            />
        ), [props.quantity, props.width, props.height, props.layout]);

    return <>{arrowsGeneration}</>;
};

export default ArrowIcon;