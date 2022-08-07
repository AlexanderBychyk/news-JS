import IData from '../interfaces/IData';
import IGetNewsCallback from '../interfaces/IGetNewsCallback.js';
import IOptions from '../interfaces/IOptions';

interface IThisOptions {
    apiKey: string;
}

interface IResp {
    endpoint: 'sources' | 'everything';
    options?: IOptions;
}

class Loader {
    baseLink: string;
    options: IThisOptions;
    constructor(baseLink: string, options: IThisOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IResp,
        callback: IGetNewsCallback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler = (res: Response) => {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    };

    makeUrl(options: IOptions, endpoint: string) {
        const urlOptions: { apiKey: string } = { ...this.options, ...options };
        console.log(urlOptions);
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });
        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: IGetNewsCallback, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: IData) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
