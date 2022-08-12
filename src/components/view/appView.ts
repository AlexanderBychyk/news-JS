import IData from '../interfaces/IData';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IData) {
        const values = (data?.articles ? data?.articles : []) as [];
        this.news.draw(values);
    }

    public drawSources(data: IData) {
        const values = (data?.sources ? data?.sources : []) as [];
        this.sources.draw(values);
    }
}

export default AppView;
