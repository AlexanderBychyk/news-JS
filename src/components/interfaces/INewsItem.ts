interface INewsItem<T> {
    author: T;
    content: T;
    description: T;
    publishedAt: T;
    source: {
        id: T;
        name: T;
    };
    title: T;
    url: T;
    urlToImage: T;
}

export default INewsItem;
