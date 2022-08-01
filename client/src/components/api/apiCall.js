import axios from 'axios';

export const RetrieveData = (data, callBackFunction) => {
    axios.get(`/api/retrieveData/${data}`).then(res => {
        callBackFunction(res)
    });
}

export const StoreData = (data, callBackFunction) => {
    axios.post(`/api/storeData/${data}`).then(res => {
        callBackFunction(res)
    });
}