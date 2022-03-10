import Image from "next/image";
import React from "react";

import IMessageProps from "components/agility-pageModules/common/message/interfaces/IMessageProps";

const Message = (props: IMessageProps): JSX.Element =>
    <>
        {props?.error &&
            <Image
                alt="No Results Found"
                layout="intrinsic"
                width="151"
                height="151"
                src="/images/common/error.svg"
            />
        }
        <h1 className="text-center m-2 mt-4">{props.message}</h1>
    </>;

Message.defaultProps = {
    error: false
};

export default Message;