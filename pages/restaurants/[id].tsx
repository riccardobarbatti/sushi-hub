import React from 'react';
import {useRouter} from "next/router";
import axios, {AxiosResponse} from "axios";
import {Result, Location, Category, Store, RelatedPlaces} from "../../model/restaurants";
import {DataFetcher} from "../../lib/dataFetcher";
import Head from 'next/head'
import {InferGetStaticPropsType} from "next";
import styles from "../../styles/coffee-store.module.css";
import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

const latLong:string = '43.65267326999575,-79.39545615725015';
const limit:number = 12;


// This also gets called at build time
export async function getStaticProps( context:any ) {
    const params = context.params;

    axios.defaults.headers.common['Authorization'] = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY as string;
   // const id = context.params.id;
    const { data }: AxiosResponse<Store>  = await axios.get(DataFetcher.UrlFoursquare(latLong, 'sushi', 9));


    // Pass post data to the page via props
    return {
        props: data.results.find(p =>{
            return p.fsq_id === context.params.id;
        }),
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1,
    }
}

// This function gets called at build time
export async function getStaticPaths() {
    axios.defaults.headers.common['Authorization'] = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY as string;
    const { data }: AxiosResponse<Store>  = await axios.get(DataFetcher.UrlFoursquare(latLong, 'sushi', 2));
    const paths = data.results.map(r =>{
        return {
            params: {
                id: r.fsq_id.toString()
            },
        };
    });
    return {
        // Only `/posts/1` and `/posts/2` are generated at build time
      //  paths: [{ params: {id:"4afc3b84f964a520b92022e3"}} , { params: { id:"4e737eaed22d2fd31452507a" }}],
        paths,
        // Enable statically generating additional pages
        // For example: `/posts/3`
        //if fallback false return error 404 when content don't exist
        fallback: true,
    };
}



const Restaurant  = (props : Result) => {

    //console.log("il nome: "+name);
    //dinamic route - set dinamic page id
    const router = useRouter();
    //console.log('Router '+router);
    //console.log('props '+ props.name);

    //loading - fallback if in params don't have the entity
    if(router.isFallback){
        return <div>Loading...</div>;
    }
    //destructuring params after loading
    // const {address, name} = props;
    // const {neighbourhood, formatted_address} = props.location;

    const handleVote = () => {
        console.log("handleVotefff");
    }
    return (
        <div>
            <Head>
                <title>{props.location.formatted_address}</title>
            </Head>
            <div className={styles.layout}>
                <Head>
                    <title>{props.location.formatted_address}</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.col1}>
                        <div className={styles.backToHomeLink}>
                            <Link href="/">
                                <a>Back to home</a>
                            </Link>
                        </div>
                        <div className={styles.nameWrapper}>
                            <h1 className={styles.name}>{props.name}</h1>
                        </div>
                        <Image
                            src={'/static/background-transparent-sushi.png'}
                            width={600}
                            height={360}
                            className={styles.storeImg}
                            alt="image"
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
                            <p className={styles.text}>{props.location.formatted_address}</p>
                        </div>
                        {props.location.neighborhood && (
                            <div className={styles.iconWrapper}>
                                <Image
                                    src="/static/icons/nearMe.svg"
                                    width="24"
                                    height="24"
                                    alt="near me icon"
                                />
                                <p className={styles.text}>{props.location.neighborhood}</p>
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

            {/*<h2>Name store: {props.name} </h2>*/}
            {/*<h2>Name store: {props.distance} </h2>*/}
            {/*<h2>Name address: {props.location.formatted_address} </h2>*/}
            {/*<h2>Name neighborhood: {props.location.neighborhood} </h2>*/}
            {/*<h2>Img : {props.categories[0].icon.prefix} </h2>*/}

        </div>
    );
};

    export default Restaurant;