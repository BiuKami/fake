import { setToken, removeLocalItem } from "./localStorage";

export const useAuthSuccess = () => {
    return (headers) => {
        if (!headers) return;
        const token = headers["session-token"],
            expirers = headers["expirets"];
        removeLocalItem('token');
        removeLocalItem('expireTs');
        setToken(token, expirers);
    };
};
