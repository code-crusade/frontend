import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { AppLayout } from './modules/ui/components/Layout';
import { AppNavbar } from './modules/ui/components/NavBar';
import { Routes } from './routes';
import { history } from './services';

interface AppProps {
  history: any;
  store: any;
}

const FullHeight = styled.div`
  height: 100vh;
`;

export class App extends React.PureComponent<AppProps> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <FullHeight>
            <AppLayout>
              <AppNavbar history={history} />
              <Routes />
            </AppLayout>
          </FullHeight>
        </ConnectedRouter>
      </Provider>
    );
  }
}
