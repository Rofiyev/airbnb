"use client";

import { FC } from "react";
import Select from "react-select";
import useCountries from "@/hooks/useCountries";

export type TCountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface Props {
  value?: TCountrySelectValue;
  onChange: (value: TCountrySelectValue) => void;
}

const CountrySelect: FC<Props> = ({ onChange, value }) => {
  const { getAll, getByValue } = useCountries();
  
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as TCountrySelectValue)}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3">
          <div>{option.flag}</div>
          <div>
            {option.label},{" "}
            <span className="text-neutral-500 ml-1">{option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => "p-3",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: { ...theme.colors, primary: "black", primary25: "#ffe4e6" },
      })}
    />
  );
};

export default CountrySelect;
