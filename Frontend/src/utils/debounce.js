export const debounce = (callback, delay) => {
    let timerId;

    return (event) => {        
        let result;
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => callback(event), delay);
        return result;
    }
}