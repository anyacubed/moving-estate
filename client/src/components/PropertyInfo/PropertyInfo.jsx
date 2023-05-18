import React from "react";
import ListItem from "./ListItem/ListItem.jsx";
import styles from "./PropertyInfo.module.css";

class PropertyInfo extends React.Component {
  className() {
    const { isCentered } = this.props;
    const classes = [styles.list];

    if (isCentered) classes.push(styles.list_centered);

    return classes.join(" ");
  }

  render() {
    const { type, area, beds, baths, id, isCentered } = this.props;

    return (
      <ul className={this.className()}>
        <ListItem info={type} icon={type} />
        <ListItem info={`${area}ft²`} icon="area" />
        <ListItem info={beds} icon="beds" />
        <ListItem info={baths} icon="baths" />
        <ListItem info={`ID: ${id}`} isCentered={isCentered} />
      </ul>
    );
  }
}

export default PropertyInfo;
