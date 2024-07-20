import { CallbackWithEvent } from "@/types";

const debounce = (callback: CallbackWithEvent, delay: number) => {
    let timerId: ReturnType<typeof setTimeout>;

    return (event: Event) => {        
        let result: any;
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => callback(event), delay);
        return result;
    }
}