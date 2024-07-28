import { debounce } from '../src/utils/debounce';
//import { debounce } from 'lodash';

// Mock callback function
const mockCallback = jest.fn((event) => {
    console.log("Event triggered:", event);
});

describe('debounce test', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        mockCallback.mockClear();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should delay the execution of the callback', () => {
        const debouncedFunction = debounce(mockCallback, 1000);

        // Call the debounced function
        debouncedFunction(new Event("click"));
        expect(mockCallback).not.toBeCalled();

        // Fast-forward time
        jest.advanceTimersByTime(1000);
        expect(mockCallback).toBeCalledTimes(1);
    });

    it('should reset the delay if called again within the delay period', () => {
        const debouncedFunction = debounce(mockCallback, 1000);

        // Call the debounced function multiple times
        debouncedFunction(new Event("click"));
        debouncedFunction(new Event("click"));
        debouncedFunction(new Event("click"));
        expect(mockCallback).not.toBeCalled();

        // Fast-forward time
        jest.advanceTimersByTime(1000);
        expect(mockCallback).toBeCalledTimes(1);
    });

    it('should call the callback with the latest event', () => {
        const debouncedFunction = debounce(mockCallback, 1000);
        const event1 = new Event("click");
        const event2 = new Event("keydown");

        // Call the debounced function with different events
        debouncedFunction(event1);
        debouncedFunction(event2);
        expect(mockCallback).not.toBeCalled();

        // Fast-forward time
        jest.advanceTimersByTime(1000);
        expect(mockCallback).toBeCalledTimes(1);
        expect(mockCallback).toBeCalledWith(event2);
    });
});
