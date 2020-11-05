// Core
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger as createLoggerMiddleware } from 'redux-logger';
import { default as createSagaMiddleware } from 'redux-saga';
import { throttle } from 'lodash';

// Utils
import { loadState, saveState } from '@utils/localStorage';

// Roots
import { rootReducer, rootSaga } from '@bus/index';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = createLoggerMiddleware({
  duration: true,
  collapsed: true,
  colors: {
    title: () => '#139BFE',
    prevState: () => '#1C5FAF',
    action: () => '#149945',
    nextState: () => '#A47104',
    error: () => '#ff0005',
  },
});

const middleware = [routerMiddleware(history), sagaMiddleware, loggerMiddleware];

const persistedState: any = loadState();

export const store = createStore(
  rootReducer(history),
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

store.subscribe(throttle(() => {
  saveState({ todo: store.getState().todo });
}, 1000));

sagaMiddleware.run(rootSaga);
