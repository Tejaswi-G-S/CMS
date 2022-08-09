import axios from 'axios';

export const RetrieveData = (data, callBackFunction) => {
    axios.get(`/api/retrieveData/${data}`).then(res => {
        callBackFunction(res)
    });
}

export const StoreData = (data, callBackFunction) => {
    console.log(data);
    axios.post(`/api/storeData/${data}`).then(res => {
        callBackFunction(res)
    });
}