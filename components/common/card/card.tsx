import { Card as BaseCard } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import ICardProps from "types/ICardData";
import Link from "components/agility-pageModules/common/link/link";

import styles from "components/common/card/card.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const columnAlign = flexbox({ vertical: true });

const Card = (props: ICardProps): JSX.Element =>
    <BaseCard className={`${styles.card} ${columnAlign} p-3 flex-grow-1 w-100`}>
        <div className="cardImageContainer">
            <Image src={props.imageUrl.src} width="10px" height="5px" layout="responsive" />
        </div>
        <BaseCard.Body className={columnAlignCenter}>
            <BaseCard.Title className={`${styles.cardTag} mb-3`}>
                {props.tag}
            </BaseCard.Title>
            <BaseCard.Text className={`${styles.cardTitle} py-1 my-1 w-100 flex-grow-1`} >
                {props.title}
            </BaseCard.Text>
            {!!props.description &&
                <div className={`${styles.cardDescription} py-1 my-1 w-100 flex-grow-1`} >
                    {props.description}
                </div>
            }
            <Link href={props.href} className={`${styles.link} text-decoration-underline`}>
                Read More
            </Link>
        </BaseCard.Body>
    </BaseCard>;

export default Card;