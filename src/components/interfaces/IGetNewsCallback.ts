import IData from './IData';

interface IGetNewsCallback {
    (data: IData): void;
}

export default IGetNewsCallback;
