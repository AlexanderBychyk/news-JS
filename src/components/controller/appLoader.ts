import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '738809963513491eae2072bbb1e5feb4',
        });

    }
}
export default AppLoader;
