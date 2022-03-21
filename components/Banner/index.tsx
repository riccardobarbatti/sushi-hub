import React from 'react';
import styles from './Banner.module.css'

interface Props{
    title:string;
    buttonText:string;
    handleClick():void;

}

const Banner = (props: Props) => {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.title1}>Sushi</span>
                <span className={styles.title2}>Hub</span>
            </h1>
            <p className={styles.subTitle}>{props.title}</p>
            <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={props.handleClick}>{props.buttonText}</button>
            </div>
        </div>
    );
};

export default Banner;