export const getLocalItem = (key: string) => {
    return window.localStorage.getItem(key);
};

export const getLocalItemSync = (key: string) => {
    return new Promise(r => {
        r(window.localStorage.getItem(key));
    });
};

export const setLocalItem = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
};

export const removeLocalItem = (key: string) => {
    window.localStorage.removeItem(key);
};

export const setToken = (token: any, expireTs: any) => {
    setLocalItem('token', token);
    setLocalItem('expireTs', expireTs);
};
export const getToken = () => {
    // console.log("过期时间",expireTs)
    // console.log("现在时间",newDate)
    // console.log("是否过期",newDate>expireTs)
    // if (expireTs < newDate) {
    //   setToken("", newDate);
    //   return "";
    // }
    return getLocalItem('token');
};
