import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';
import styles from "./Card.module.css";


interface Props{
    name: string;
    hrefUrl: string;
    imgUrl: string;
    className?: string;

}


const Card = (props: Props) => {
    return (

        <Link href={props.hrefUrl}>
            <a className={styles.cardLink}>
                <div className={cls("glass", styles.container)}>
                <div className={styles.cardHeaderWrapper}>
                    <h2>{props.name}</h2>
                </div>
                <div className={styles.cardHeaderWrapper}>
                    <Image
                        className={styles.cardImage}
                        src={props.imgUrl || '/static/Sushi-img.png'}
                        width={260}
                        height={160}
                    />
                  </div>
                </div>
            </a>
        </Link>
    );
};

export default Card;