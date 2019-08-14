export const getQueryParams = (str) => {
    return str.replace(/(^\?)/, '').split('&').reduce((params, param) => {
        let n = param.split('=');
        params[n[0]] = n[1];
        return params;
    }, {});
};
