class ApiRequestService {
    _apiUrl = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=76b879cfd37956e8d26b336ee9c302df'
    apiRequest = async (url) => {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);

        return await res.json();
    }

    getAllCharacters = async (offset) => {
        const res = await this.apiRequest(`${this._apiUrl}characters?limit=9&offset=${offset}&${this._apiKey}`);

        return res.data.results.map(item => this._modifyRandomCharObject(item));
    }

    getRandomCharacter = async (id) => {
        const res = await this.apiRequest(`${this._apiUrl}characters/${id}?${this._apiKey}`);

        return this._modifyRandomCharObject(res.data.results[0]);
    }   
    
    _modifyRandomCharObject = (char) => {
        return {
            name: char.name,
            id: char.id,
            description: char.description === '' ? 'here is no description for this character' : `${char.description.slice(0, 210)}...`,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default ApiRequestService;