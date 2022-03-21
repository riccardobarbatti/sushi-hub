import axios from 'axios';

export class DataFetcher{


    //FourSquare api data stores URL
    public static UrlFoursquare = (latLong:string, query:string, limit:number):string => {
        //orginal:'https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575%2C-79.39545615725015';
        return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
    };

    //Get data Stores from Foursquare
    public static async getDataStores () : Promise<any>{
        console.log('call datafetcher');
        let latLong:string = '43.65267326999575,-79.39545615725015';
        let limit:number = 2;
        //auth key
        const urlApi = this.UrlFoursquare(latLong, 'sushi', limit);
        let data = {};

    axios.get(urlApi)
        .then(function (response) {
            //          // handle success
                    console.log(response.data);
                      //data = response.data;
                       //return data;
                  response.data;
                })
        .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //data = response.data;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);

    });//axios
        //console.log(data);


   };//fetch stores



}