import { useHttp } from "../hooks/useHttp";

const useApiRequestService = () => {
    const _apiUrl = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=76b879cfd37956e8d26b336ee9c302df';

    const {loading, error, request, clearError} = useHttp();

    const getAllCharacters = async (offset) => {
        const res = await request(`${_apiUrl}characters?limit=9&offset=${offset}&${_apiKey}`);

        return res.data.results.map(item => _modifyRandomCharObject(item));
    }

    const getRandomCharacter = async (id) => {
        const res = await request(`${_apiUrl}characters/${id}?${_apiKey}`);

        return _modifyRandomCharObject(res.data.results[0]);
    }
    
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiUrl}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_modifyRandomCharObject);
    }

    const getAllComics = async (offset) => {
        const res = await request(`${_apiUrl}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(item => _modifyComicsData(item));
    }

    const getComics = async (id) => {
        const res = await request(`${_apiUrl}comics/${id}?${_apiKey}`);
        return _modifyComicsData(res.data.results[0]);
    }
    
    const _modifyRandomCharObject = (char) => {
        return {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _modifyComicsData = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }
    return {loading, error, getAllCharacters, getRandomCharacter, clearError, getAllComics, getComics, getCharacterByName};
}

export default useApiRequestService;