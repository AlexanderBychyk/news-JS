import IData from '../interfaces/IData';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IData) {
        const values = (data?.articles ? data?.articles : []) as [];
        this.news.draw(values);
    }

    drawSources(data: IData) {
        const values = (data?.sources ? data?.sources : []) as [];
        this.sources.draw(values);
    }
}

export default AppView;
