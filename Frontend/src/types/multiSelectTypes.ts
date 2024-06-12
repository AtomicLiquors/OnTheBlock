
export enum MSEnum{
    Instrument,
    Genre
}

export type MultiSelectItemType = {
    type: MSEnum;
    id: number;
    instrumentName: string;
    genreName: string;
};