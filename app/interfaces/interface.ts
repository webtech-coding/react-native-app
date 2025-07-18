export interface movieSchema{
    id:number
    title:string | number
    overview:string,
    popularity:number,
    vote_average:number,
    poster_path:string,
    release_date:string,
    original_language:string
}

export interface MovieDetailSchema extends movieSchema{
    genres?:{
        name:string
    }[],
    status?:string,
    budget?:number,
    production_countries?:{
        name:string
    }[],
    runtime:number,
    spoken_languages:{
        name:string
    },
    backdrop_path:string
}