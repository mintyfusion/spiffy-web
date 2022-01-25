import React from "react";

import ILogoProps from "components/common/logo/interfaces/ILogoProps";
import ILogoVariantData from "components/common/logo/interfaces/ILogoVariantData";
import LogoVariants from "components/common/logo/enums/logoVariants";

import styles from "/components/common/logo/logo.module.scss";

const getVariant = (variant: LogoVariants): ILogoVariantData => {
    switch (variant) {
        case LogoVariants.footer:
            return {
                className: styles.footerLogoDimensions,
                fillColor: styles.red
            };

        case LogoVariants.header:
        default:
            return {
                className: styles.headerLogoDimensions,
                fillColor: styles.red
            };
    }
};

const Logo = (props: ILogoProps): JSX.Element => {
    const variantData: ILogoVariantData = React.useMemo(() => getVariant(props.variant), [props.variant]);

    const LogoVariant = React.useMemo((): JSX.Element =>
        <svg
            viewBox="0 0 149 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={variantData.className}
        >
            <g clipPath="url(#clip0_6053:552)">
                <path
                    d="M37.2441 32.6564V24.7282C38.3075 25.2442 39.3161 25.5022 40.27 25.5022C41.2864 25.5022 42.123 25.2676 42.7798 24.7985C43.4366 24.3451 43.765 23.7586 43.765 23.0393C43.765 22.2731 43.3193 21.2488 42.428 19.9665C41.865 19.1534 41.2708 18.2542 40.6453 17.2691C40.2856 16.7061 39.9338 16.0806 39.5898 15.3926C38.7297 13.6568 38.2997 11.9445 38.2997 10.2556C38.2997 8.34784 38.761 6.6277 39.6836 5.09523C40.5906 3.57841 41.8729 2.38213 43.5304 1.50642C45.188 0.630721 47.0098 0.192871 48.9957 0.192871C49.6682 0.192871 50.2624 0.224146 50.7784 0.286695C51.3257 0.349248 51.92 0.466528 52.5611 0.638539V8.68405C51.7636 8.41822 51.0677 8.28531 50.4735 8.28531C49.504 8.28531 48.7064 8.53549 48.081 9.03591C47.4555 9.55195 47.1427 10.2165 47.1427 11.0297C47.1427 11.9679 47.7135 13.3128 48.855 15.0642C50.2311 17.1752 51.1381 18.6843 51.5759 19.5912C52.2014 20.983 52.5142 22.4763 52.5142 24.0714C52.5142 25.9166 52.0842 27.5507 51.2241 28.9738C50.3484 30.4282 49.1287 31.5384 47.5649 32.3046C45.9543 33.0865 44.1403 33.4773 42.123 33.4773C40.6062 33.4773 38.9799 33.2036 37.2441 32.6564ZM64.4065 41.6402H56.5721V23.6257V22.0776C56.5721 20.8579 56.666 19.7554 56.8536 18.7703C57.01 17.832 57.2836 16.9328 57.6746 16.0728C58.0186 15.2909 58.5112 14.509 59.1523 13.7272C59.7465 12.9609 60.3877 12.3119 61.0758 11.7803C61.8264 11.233 62.5848 10.7638 63.351 10.3729C64.086 10.0132 64.9226 9.72394 65.8608 9.50503C66.7366 9.31738 67.6513 9.22355 68.6052 9.22355C70.7788 9.22355 72.7961 9.75521 74.6569 10.8186C76.5021 11.8819 77.9486 13.3362 78.9963 15.1814C80.044 17.0267 80.5679 19.0517 80.5679 21.2566C80.5679 22.9455 80.2708 24.5249 79.6767 25.9948C79.051 27.4804 78.1754 28.7626 77.0496 29.8416C75.8923 30.9833 74.5788 31.8432 73.1087 32.4218C71.6075 33.0318 69.9891 33.3367 68.2535 33.3367C67.4714 33.3367 66.6661 33.2349 65.8373 33.0318V24.9862C66.7757 25.3458 67.62 25.5257 68.3707 25.5257C69.6842 25.5257 70.7553 25.1347 71.5841 24.3529C72.3815 23.571 72.7804 22.5624 72.7804 21.327C72.7804 20.4669 72.6083 19.7163 72.2644 19.0752C71.9048 18.434 71.42 17.9258 70.81 17.5505C70.169 17.1909 69.4496 17.011 68.6521 17.011C67.8702 17.011 67.1509 17.1987 66.4942 17.574C65.8373 17.9649 65.3447 18.4575 65.0164 19.0517C64.7662 19.5209 64.6098 19.9822 64.5473 20.4357C64.4534 20.9204 64.4065 21.5459 64.4065 22.3122V23.3677V41.6402ZM83.8284 4.7434C83.8284 3.94589 84.0159 3.21091 84.3913 2.5385C84.7509 1.89736 85.2591 1.36569 85.916 0.943472C86.557 0.568171 87.253 0.380522 88.0036 0.380522C88.8011 0.380522 89.5205 0.57599 90.1615 0.966928C90.8184 1.35787 91.3344 1.87391 91.7096 2.51504C92.0694 3.18745 92.2491 3.89897 92.2491 4.64957C92.2491 5.38452 92.0616 6.08039 91.6862 6.73719C91.2798 7.4096 90.7637 7.9178 90.1381 8.26185C89.4814 8.63713 88.7855 8.82478 88.0505 8.82478C87.3155 8.82478 86.6198 8.63713 85.9629 8.26185C85.306 7.88653 84.7899 7.38614 84.4148 6.76065C84.024 6.13512 83.8284 5.46271 83.8284 4.7434ZM91.9676 32.8441H84.1099V9.59884H91.9676V32.8441ZM104.634 32.8441H96.7763V13.7037C96.7763 11.577 96.9403 9.82559 97.2689 8.44949C97.5972 7.07339 98.1289 5.83802 98.8639 4.7434C99.4268 3.88332 100.193 3.10145 101.163 2.39776C102.085 1.72535 103.133 1.21713 104.306 0.873103C105.478 0.51344 106.675 0.33361 107.895 0.33361C108.379 0.33361 108.942 0.388341 109.583 0.497803V6.90137C108.067 6.90137 106.917 7.11247 106.135 7.53471C105.338 7.97256 104.837 8.66059 104.634 9.59884H109.583V16.9641H104.634V32.8441ZM120.162 32.8441H112.304V13.7037C112.304 11.577 112.469 9.82559 112.797 8.44949C113.125 7.07339 113.657 5.83802 114.392 4.7434C114.955 3.88332 115.721 3.10145 116.691 2.39776C117.613 1.72535 118.661 1.21713 119.834 0.873103C121.007 0.51344 122.203 0.33361 123.423 0.33361C123.907 0.33361 124.47 0.388341 125.111 0.497803V6.90137C123.595 6.90137 122.445 7.11247 121.663 7.53471C120.866 7.97256 120.365 8.66059 120.162 9.59884H125.111V16.9641H120.162V32.8441ZM127.692 22.4295V9.59884H135.526V20.0134V20.8344C135.526 22.0229 135.753 22.8908 136.206 23.4381C136.66 24.001 137.34 24.2825 138.247 24.2825C139.217 24.2825 139.912 24.001 140.334 23.4381C140.757 22.8751 140.968 21.9447 140.968 20.6468V19.8962V9.59884H148.802V27.6602V29.3021C148.802 31.2725 148.583 32.9144 148.146 34.2279C147.708 35.5727 146.957 36.8393 145.894 38.0279C145.081 38.9819 144.181 39.7559 143.196 40.3501C142.196 40.9599 141.07 41.4056 139.818 41.6871C138.615 41.9841 137.238 42.1328 135.69 42.1328C133.97 42.1328 132.258 41.9373 130.553 41.5465V34.5799C132.054 35.1428 133.47 35.4243 134.799 35.4243C136.519 35.4243 137.864 35.0332 138.834 34.2513C139.818 33.4538 140.53 32.234 140.968 30.5922C139.795 31.1395 138.802 31.5306 137.989 31.7651C137.238 31.9682 136.425 32.07 135.55 32.07C133.047 32.07 131.116 31.2882 129.756 29.7244C128.38 28.1919 127.692 25.9792 127.692 23.0862V22.4295Z"
                    fill="#F8F8F8"
                />
            </g>
            <g clipPath="url(#clip1_6053:552)">
                <path
                    d="M25.1069 16.8277C26.3317 17.5129 26.3341 19.2752 25.111 19.9676L6.35385 30.586C5.1539 31.2654 3.66868 30.4019 3.66686 29.0239L3.63912 7.89689C3.6373 6.51894 5.12021 5.64683 6.32197 6.31911L25.1069 16.8277Z"
                    stroke={variantData.fillColor}
                    strokeWidth="6.83276"
                />
            </g>
            <defs>
                <clipPath id="clip0_6053:552">
                    <rect width="111.855" height="42.3989" fill="white" transform="translate(37.0996)" />
                </clipPath>
                <clipPath id="clip1_6053:552">
                    <rect width="29.5677" height="32.0781" fill="white" transform="translate(0 2.23169)" />
                </clipPath>
            </defs>
        </svg>, [variantData]);

    return LogoVariant;
};

Logo.defaultProps = {
    variants: LogoVariants.header
};

export default Logo;