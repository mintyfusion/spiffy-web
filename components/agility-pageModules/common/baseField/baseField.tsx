import React from "react";

import IBaseField from "components/agility-pageModules/common/baseField/interfaces/IBaseField";

import styles from "components/agility-pageModules/common/baseField/baseField.module.scss";

const BaseField = (props: React.PropsWithChildren<IBaseField>): JSX.Element => (
    <fieldset>
        <div className={`d-flex flex-column py-2 w-100 ${styles.baseFieldContainer}`}>
            <h6>{props.label}</h6>
            {props.children}
            <div className={`
               ${styles.error}
               fade 
               ${props.shouldShowError
                    ? `${styles.show} show`
                    : styles.hide} 
            `}>
                {props.error}
            </div>
        </div>
    </fieldset >
);

export default BaseField;
