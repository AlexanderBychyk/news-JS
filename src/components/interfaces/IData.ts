import IItem from './IItems';
import INewsItem from './INewsItem';

interface IData {
    status: 'ok';
    sources?: IItem[];
    articles?: INewsItem<string>[];
    totalResult: number;
}

export default IData;
