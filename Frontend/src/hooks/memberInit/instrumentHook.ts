import { getAllInstruments } from "@/api/instrument";
import {
  MSEnum,
  MultiSelectItemType,
  convertMultiSelectableData,
} from "@/types/multiSelectTypes";
import { SelectButtonChangeEvent } from "primereact/selectbutton";
import { useEffect, useState } from "react";

const instrumentHook = () => {
  const [instruments, setInstruments] = useState<MultiSelectItemType[]>([]);

  // 프라임리액트
  const handleInstrumentSelect = (e: SelectButtonChangeEvent) => {
    console.log(e.value);
    setSelectedInstruments(e.value);
  };
  const handleInstrumentRemove = (
    removingItem: MultiSelectItemType,
    data: MultiSelectItemType[]
  ) => {
    setSelectedInstruments([...data.filter((item) => item !== removingItem)]);
  };

  useEffect(() => {
    getAllInstruments().then((response) => {
      const data = convertMultiSelectableData(MSEnum.Instrument, response.data);
      setInstruments(data);
    });
  }, []);

  const [selectedInstruments, setSelectedInstruments] = useState<
    MultiSelectItemType[]
  >([]);
  const [instrumentSearchResult, setInstrumentSearchResult] = useState(null);
  return { instruments, selectedInstruments, handleInstrumentSelect, handleInstrumentRemove, instrumentSearchResult };
};

export default instrumentHook;
