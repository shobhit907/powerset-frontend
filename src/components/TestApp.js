import { Checkbox, useCheckboxState } from "pretty-checkbox-react";
import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function TestApp() {
  const options = ["one", "two", "three"];
  const defaultOption = options[0];
  return (
    <div>
      <Dropdown 
        options={options}
        // onChange={this._onSelect}
        value={defaultOption}
        placeholder="Select an option"
      />
    </div>
  );
}
