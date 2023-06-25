"use client";
import ReactSelect from "react-select";

interface SelectProps {
  disabled?: boolean;
  label?: string;
  options: Record<string, any>[];
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
}

const Select: React.FC<SelectProps> = ({
  disabled,
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="z-[100]">
      <label
        className="
          block 
          text-sm 
          leading-6
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          closeMenuOnSelect={false}
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "#A3CCE1" : "#c1ddeb",
              boxShadow: "none",
              backgroundColor: "transparent",
              borderRadius: "10px",
              ":hover": {
                borderColor: "#A3CCE1",
              },
            }),
            menu: (styles) => {
              return {
                ...styles,
                backgroundColor: "#E0EEF5",
              };
            },
            option: (styles, state) => {
              return {
                ...styles,
                backgroundColor: state.isFocused ? "#c1ddeb" : "transparent",
              };
            },
            multiValue: (styles, state) => {
              return {
                ...styles,
                backgroundColor: "#c1ddeb",
                color: state.isFocused ? "#343739" : "#97a4a8",
              };
            },
            multiValueRemove: (styles, state) => {
              return {
                ...styles,
                ":hover": {
                  backgroundColor: "#A3CCE1",
                  color: "#E0EEF5",
                },
              };
            },
          }}
          classNames={{
            control: () => "text-sm ",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
