import React from 'react';
import {useRouter} from "next/router";
import Link from 'next/link';
import Head from 'next/head'
import {GetStaticProps} from "next";
import coffeeStoresData from "../../data/coffee-stores.json";
import styles from "../../styles/coffee-store.module.css";
import Image from 'next/image';
import cls from 'classnames';
import {sushiStore} from "../../lib/sushi-store";
import {ParsedUrlQuery} from "querystring";

type Data = {
    fsq_id: string;
    name: string;
}

interface Params extends ParsedUrlQuery {
    id: string;
}
//fast Render
export async function getStaticProps (staticProps:any){
    const params = staticProps.params;
    const sushiStores: any[] = await sushiStore.fetchDataSushi();
   // const swapis: Data[] =  sushiStores;

    const findCoffeeStoreById = sushiStores.find((sushiStore:any) => {
        return sushiStore.fsq_id.toString() === params.id; //dynamic id
    });
    //const data = Array.from(swapis);
    // const { slug } = context.params as IParams // no longer causes error
    // const props = fetch(``)
    return {
        props: {
            sushiStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        }, //will be passed to the page component as props
    };
}
//dinamic static id
export async function getStaticPaths(){
    const sushiStores = await sushiStore.fetchDataSushi();
    const swapis: Data[] =  sushiStores;
    const data = Array.from(swapis);
    //const arr: string[] = ['4afc3b84f964a520b92022e3'];
    const paths = data.map((sushiStore: any) => {
        return {
            params: {
                id:"4afc3b84f964a520b92022e3"
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
}

const CoffeStore = (props:any) => {
    //dinamic route - set dinamic page id
    const router = useRouter();

    //loading - fallback
    if(router.isFallback){
        return <div>Loading...</div>;
    }
    //destructuring params after loading
    const {address, name, neighbourhood, imgUrl} = props.coffeeStore;

    const handleVote = () => {
          console.log("handleVote");
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                    <Link href="/">
                      <a>Back to home</a>
                    </Link>
                    </div>
                        <div className={styles.nameWrapper}>
                            <h1 className={styles.name}>{name}</h1>
                        </div>
                                <Image
                                    src={imgUrl}
                                    width={600}
                                    height={360}
                                    className={styles.storeImg}
                                    alt={name}
                                ></Image>

                    </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/icons/place.svg"
                            width="24"
                            height="24"
                            alt="places icon"
                        />
                        <p className={styles.text}>{address}</p>
                    </div>
                    {neighbourhood && (
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/icons/nearMe.svg"
                                width="24"
                                height="24"
                                alt="near me icon"
                            />
                            <p className={styles.text}>{neighbourhood}</p>
                        </div>
                    )}
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/icons/star.svg"
                            width="24"
                            height="24"
                            alt="star icon"
                        />
                        <p className={styles.text}>1</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleVote}>Up vote!</button>
                </div>
            </div>
        </div>
    );
};

export default CoffeStore;