import React from "react";
import styles from "./Button.module.css";

class Button extends React.Component {
  render() {
    const { onClick, disabled } = this.props;

    return (
      <button
        className={this.className()}
        onClick={onClick}
        disabled={disabled}
      >
        {this.props.children}
      </button>
    );
  }

  className() {
    const { roundedLeft, roundedRight, isFocused, size, position } = this.props;
    const names = [styles.button];

    roundedLeft && names.push(styles.rounded_left);
    roundedRight && names.push(styles.rounded_right);
    isFocused && names.push(styles.focused);
    size === "m" && names.push(styles.medium_button);
    size === "l" && names.push(styles.large_button);
    position === "right" && names.push(styles.right_button);

    return names.join(" ");
  }
}

export { Button };
