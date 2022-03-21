
    export interface RelatedPlaces {
    }

    export interface Icon {
        prefix: string;
        suffix: string;
    }

    export interface Category {
        id: number;
        name: string;
        icon: Icon;
    }
    export interface Location {
        address: string;
        country: string;
        cross_street: string;
        dma: string;
        formatted_address: string;
        locality: string;
        neighborhood: string[];
        postcode: string;
        region: string;
    }
    export interface Result {
        fsq_id: string;
        categories: Category[];
        chains: any[];
        distance: number;
        geocodes: string[];
        location: {
            [key: string]: Location
        };
        address: string;
        country: string;
        cross_street: string;
        dma: string;
        formatted_address: string;
        locality: string;
        neighborhood: string[];
        postcode: string;
        region: string;
        name: string;
        related_places: RelatedPlaces;
        timezone: string;
    }




    export interface Store {
        results: Result[];
    }

