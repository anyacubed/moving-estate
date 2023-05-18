import React from "react";
import { ReactComponent as ApartmentIcon } from "./assets/apartment.svg";
import { ReactComponent as TownhouseIcon } from "./assets/townhouse.svg";
import { ReactComponent as AreaIcon } from "./assets/area.svg";
import { ReactComponent as BedsIcon } from "./assets/beds.svg";
import { ReactComponent as BathsIcon } from "./assets/baths.svg";
import styles from "./ListItem.module.css";

class ListItem extends React.Component {
  showIcon(icon) {
    switch (icon) {
      case "area":
        return <AreaIcon />;
      case "beds":
        return <BedsIcon />;
      case "baths":
        return <BathsIcon />;
      case "apartment":
        return <ApartmentIcon />;
      case "townhouse":
        return <TownhouseIcon />;
      default:
        return null;
    }
  }

  className() {
    const { info, isCentered } = this.props;
    const classes = [styles.list_item];

    if (info.toString().includes("ID")) classes.push(styles.id_provided);
    if (isCentered && info.toString().includes("ID"))
      classes.push(styles.centered);

    return classes.join(" ");
  }

  render() {
    const { info, icon } = this.props;

    /* The second check is for cases of getting id-prop and area-prop, because we passed there not just a prop value, but a string including this prop value */
    if (typeof info === "undefined" || info.toString().includes("undefined"))
      return null;

    return (
      <li className={this.className()}>
        {this.showIcon(icon)}
        <span>{info}</span>
      </li>
    );
  }
}

export default ListItem;
