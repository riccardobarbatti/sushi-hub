import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import axios, {AxiosResponse} from "axios";
import {DataFetcher} from "../lib/dataFetcher";
import styles from '../styles/Home.module.css';
import Banner from "../components/Banner";
import Card from "../components/Card";
import {Result, Location, Category, Store, RelatedPlaces} from "../model/restaurants";
import Link from "next/link";


//SSG - server side generation
export async function getStaticProps(){
    axios.defaults.headers.common['Authorization'] = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY as string;
    let latLong:string = '43.65267326999575,-79.39545615725015';
    let limit:number = 12;

    const { data }: AxiosResponse<Store>  = await axios.get(DataFetcher.UrlFoursquare(latLong, 'sushi', 9));

    return {
        props: {
            data: data.results,
        }
    }
}
interface SushiProps {
    data: Result[]
}


//pass item to home param - get static Props
const Home: NextPage<SushiProps> = props => {
 // console.log(props);

    const DiscoverShops = () => {
        console.log('Discover Shops');

        // const configValue: string = (process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY as string);
        // console.log("Value end: "+configValue);
       // async sushiStores = () = await sushiStore.fetchDataSushi();
    }
  return (

    <div className={styles.container}>
      <Head>
        <title>Sushi Hub</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

       <Banner
           title={"Discovery Sushi restaurants"}
           buttonText={"View store nearby"}
           handleClick={DiscoverShops}
       />
          <div className={styles.homeImageBanner}>
          <Image src="/static/background-transparent-sushi.png" width={1000} height={656} />
          </div>

          {props.data.length > 0 && (
              <>
              <h2 className={styles.heading2}>All Stores</h2>
              <div className={styles.cardLayout}>
                  {props.data.map(sushiStore => {
                      return(
                      <Card
                          key={sushiStore.fsq_id}
                          name={sushiStore.name}
                          imgUrl=''
                          hrefUrl={`/restaurants/${sushiStore.fsq_id}`}
                          className={styles.card}
                      />
                    );
                  })}
              </div>
              </>
              )}
      </main>
    </div>
  )
}

export default Home
