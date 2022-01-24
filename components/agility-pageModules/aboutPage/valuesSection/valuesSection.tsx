import { Col, Row } from "react-bootstrap";
import { ModuleProps } from "@agility/nextjs";
import Image from "next/image";
import React from "react";

import IValuesSectionProps from "components/agility-pageModules/aboutPage/valuesSection/interfaces/IValuesSectionProps";

const ValuesSection = (props: ModuleProps<IValuesSectionProps>): JSX.Element => {
    const { fields } = props.module;

    return (
        <Row className="w-100 m-0 d-flex flex-column flex-lg-row">
            {fields.contents.map((data, index) =>
                <Col key={index} className="p-0 w-100">
                    <Image src={data.fields.image.url} layout="responsive" width="400px" height="350px" objectFit="cover"/>
                </Col>
            )}
        </Row>
    );
};

export default ValuesSection;