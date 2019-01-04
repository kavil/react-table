import dva from 'dva';
import registerServiceWorker from './registerServiceWorker';
import list from './models/list';
import Router from './router';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(list);

// 4. Router
app.router(Router);

app.start('#root');

registerServiceWorker();

