type SourcesType = [] | string;

interface IData {
    status: 'ok';
    sources?: SourcesType;
    articles?: [];
    totalResult: number;
}

export default IData;
