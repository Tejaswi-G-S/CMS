export const DateTime = (date) => {
    const theDate = new Date(Date.parse(date)); 
    const dateAndTime = theDate.toLocaleString(); 
    return dateAndTime;
}