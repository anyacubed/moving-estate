import React from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";

class Dropdown extends React.Component {
  state = {
    selectedOption: this.props.value || null,
  };

  handleChange = (selectedOption) => {
    const { onChange } = this.props;
    let value = null;

    if (selectedOption) value = selectedOption.value;

    this.setState({ selectedOption: value });

    onChange(value);
  };

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (prevProps.value === value) return;

    this.setState({ selectedOption: value });
  }

  className() {
    const { width } = this.props;
    const classes = [styles.select];

    width === "half" && classes.push(styles.select_half);

    return classes.join(" ");
  }

  render() {
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: "2px solid #df434a",
        color: state.isSelected ? "#484848" : "black",
        backgroundColor: state.isSelected ? "#df434a" : "#F0F0F0",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#D8D8D8",
        },
      }),
      control: (provided) => ({
        ...provided,
        backgroundColor: "#F5F5F5",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#D8D8D8",
        },
      }),
    };

    const { options, placeholder } = this.props;
    const { selectedOption } = this.state;

    return (
      <Select
        onChange={this.handleChange}
        options={options}
        styles={customStyles}
        className={this.className()}
        placeholder={placeholder}
        isClearable
        value={
          selectedOption
            ? {
                value: selectedOption,
                label: selectedOption,
              }
            : null
        }
      />
    );
  }
}

export { Dropdown };
