import { Route, Router, Switch } from 'dva/router';
import * as React from 'react';
import IndexPage from './pages/App';
import Table from './pages/Table';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';

function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact={true} component={IndexPage} />
          <Route path="/table" exact={true} component={Table} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
