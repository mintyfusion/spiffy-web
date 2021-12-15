import { Card as BaseCard } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import ICardProps from "types/ICardData";
import Link from "components/common/link/link";

import styles from "components/common/card/card.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const columnAlign = flexbox({ vertical: true });

const Card = (props: ICardProps): JSX.Element =>
    <BaseCard className={`${styles.card} ${columnAlign} p-3 flex-grow-1 w-100`}>
        <div className="cardImageContainer">
            <Image src={props.imageUrl.src} width="10px" height="5px" layout="responsive" />
        </div>
        <BaseCard.Body className={columnAlignCenter}>
            <BaseCard.Title className={`${styles.cardTitle} mb-3`}>
                {props.title}
            </BaseCard.Title>
            <BaseCard.Text className={`${styles.cardText} py-2} w-100 flex-grow-1`} >
                {props.description}
            </BaseCard.Text>
            <Link href={props.href} className={`${styles.link} text-decoration-underline`}>
                Read More
            </Link>
        </BaseCard.Body>
    </BaseCard>;

export default Card;