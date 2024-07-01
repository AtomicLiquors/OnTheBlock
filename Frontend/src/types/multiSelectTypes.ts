export enum MSEnum {
  Instrument,
  Genre,
}

export type MultiSelectItemType = {
  type: MSEnum;
  id: number;
  instrumentName: string;
  genreName: string;
};

export const convertMultiSelectableData = (
  type: MSEnum,
  data: MultiSelectItemType[]
): MultiSelectItemType[] => {
  const convertedData = data.map((item) => ({
    ...item,
    type: type,
  }));
  return convertedData;
};
