import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './store';

interface RootProps {
  store: any;
}

class Root extends React.PureComponent<RootProps> {
  render() {
    return(
      <Provider store={this.props.store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
