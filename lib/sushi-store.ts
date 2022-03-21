
//sushi restaurants parameters
interface infoSushiStore{
    latLong:string;
    query:string;
    limit:number;
}
type TestData = {
    id: string
    number: string
    name: string
    image: string
}

export class sushiStore {
    constructor() {}
    //_______________________
    //methods
    //----------------------------
    //get store from foursquare api
    public static getUrlForSushiStore = (latLong:string, query:string, limit:number):string => {
        return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
        //'https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575%2C-79.39545615725015';
    };

    //foursquare api
    public static async fetchDataSushi(): Promise<any>{
         let latLong:string = '43.65267326999575,-79.39545615725015';
         let limit:number = 12;
         //auth key
         const configValue: string = (process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY as string);


            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: configValue

                }
        };
        let data;
        const response = await fetch(
            sushiStore.getUrlForSushiStore(latLong, 'sushi', limit), options)
            .then(response =>  data = response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));


    }




    //-----
    //fetch shushi store
     public fetchCoffeeStores = async (
      latLong :string  = "43.65267326999575,-79.39545615725015",
      limit :number = 8
     ) => {
        try {
           // const photos = await getListOfCoffeeStorePhotos();
            const response = await fetch(
                sushiStore.getUrlForSushiStore("","",0),
                {
                    headers: {
                        Authorization:"drgfg",
                    },
                }
            );
            const data = await response.json();
        } catch (err) {

            console.log("--errore fetch sushi");
        }


     }


}