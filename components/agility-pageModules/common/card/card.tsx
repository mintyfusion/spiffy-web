import { Card as BaseCard } from "react-bootstrap";
import { ContentItem } from "@agility/nextjs";
import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import ICardProps from "components/agility-pageModules/common/card/interfaces/ICardProps";
import Link from "components/common/link/link";

import styles from "components/common/card/card.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const columnAlign = flexbox({ vertical: true });

const Card = (props: ContentItem<ICardProps>): JSX.Element => {
    const { fields } = props;

    return (
        <BaseCard className={`${styles.card} ${columnAlign} p-3 flex-grow-1 w-100`}>
            <div className="cardImageContainer">
                <Image src={fields.image.url} width="10px" height="5px" layout="responsive" />
            </div>
            <BaseCard.Body className={columnAlignCenter}>
                <BaseCard.Title className={`${styles.cardTag} mb-3`}>
                    {fields.tag_TextField}
                </BaseCard.Title>
                <BaseCard.Text className={`${styles.cardTitle} py-1 my-1 w-100 flex-grow-1`} >
                    {fields.title}
                </BaseCard.Text>
                {!!fields.description &&
                    <div className={`${styles.cardDescription} py-1 my-1 w-100 flex-grow-1`} >
                        {fields.description}
                    </div>
                }
                <Link href={fields.educationDetailLink} className={`${styles.link} text-decoration-underline`}>
                    Read More
                </Link>
            </BaseCard.Body>
        </BaseCard>
    );
};

export default Card;