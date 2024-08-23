import { Input, Label } from "./styles";
import SeatchIcon from "../../../../../public/assets/icons/search.svg";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export interface ISearchInput {
  onChange: (e?: string) => void;
  placeholder?: string;
  debounce?: number;
  defaultValue?: string;
  secondaryColor?: boolean;
}

function SearchInput({
  onChange,
  debounce = 0,
  defaultValue,
  placeholder,
  secondaryColor = false,
}: ISearchInput) {
  const [value, setValue] = useState(defaultValue);

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    const debouncId = setTimeout(() => onChange(value), debounce * 1000);
    return () => clearTimeout(debouncId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce, value]);

  return (
    <Label secondaryColor={secondaryColor}>
      <SeatchIcon />
      <Input
        type="search"
        placeholder={placeholder}
        onChange={handleChangeInput}
      />
    </Label>
  );
}

export { SearchInput };
