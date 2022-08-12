import AppController from '../controller/controller';
import IData from '../interfaces/IData';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = document.querySelector('.sources') as HTMLDivElement;
        sources.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: IData) => {
                console.log('IData', data);
                this.view.drawNews(data);
            })
        );
        this.controller.getSources((data: IData) => {
            this.view.drawSources(data);
        });
    }
}

export default App;
