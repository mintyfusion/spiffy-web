import React, { HTMLAttributes } from "react";

const Spinner = (props: HTMLAttributes<HTMLDivElement>): JSX.Element =>
    <div {...props}>
        <div className="spinner-border text-warning align-self-center" role="status" >
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;

export default Spinner;