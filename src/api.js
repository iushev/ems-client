import EmsAPI from './utils/ems-api';
import { store } from './store';

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const api = new EmsAPI(config.apiEndpoint, () => {
    const state = store.getState();
    return state.auth.token;
});

export default api;