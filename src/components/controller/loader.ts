import IData from '../interfaces/IData';
import IGetNewsCallback from '../interfaces/IGetNewsCallback.js';
import IOptions from '../interfaces/IOptions';

enum statusCode {
    Unauthorized = 401,
    NotFound = 404,
}

interface IThisOptions {
    apiKey: string;
}

type EndpointType = 'sources' | 'everything';

interface IResp {
    endpoint: EndpointType;
    options?: Partial<IOptions>;
}

class Loader {
    private baseLink: string;
    private options: IThisOptions;
    constructor(baseLink: string, options: IThisOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: IResp,
        callback: IGetNewsCallback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    protected errorHandler = (res: Response) => {
        if (!res.ok) {
            if (res.status === statusCode.Unauthorized || res.status === statusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    };

    protected makeUrl(options: Partial<IOptions>, endpoint: string) {
        const urlOptions: { apiKey: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });
        return url.slice(0, -1);
    }

    protected load(method: string, endpoint: string, callback: IGetNewsCallback, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: IData) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
