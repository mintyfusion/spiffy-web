type Alignment = "start" | "center" | "between" | "end";

interface IFlexboxParams {
    vertical?: boolean;
    vAlign?: Alignment;
    hAlign?: Alignment;
    reversed?: boolean;
    wrap?: boolean;
}

/**
 * Flexbox utility function to manage bootstrap's flexbox classes.
 * @param params alignments and flexbox properties object 
 */
const flexbox = (params?: IFlexboxParams): string => {
    let classNames = "d-flex";
    classNames = params?.vertical
        ? classNames.concat(params?.reversed ? " flex-column-reverse" : " flex-column")
        : classNames.concat(params?.reversed ? " flex-row-reverse" : " flex-row");

    if (params?.vAlign) {
        classNames = classNames.concat(` align-items-${params.vAlign}`);
    }

    if (params?.hAlign) {
        classNames = classNames.concat(` justify-content-${params.hAlign}`);
    }

    if (params?.wrap) {
        classNames = classNames.concat(params.wrap ? "flex-wrap" : "flex-nowrap");
    }

    return classNames;
};

export default flexbox;
