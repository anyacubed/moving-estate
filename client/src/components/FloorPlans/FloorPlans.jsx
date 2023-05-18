import React from "react";
import Subtitle from "../Subtitle/Subtitle.jsx";
import classes from "./FloorPlans.module.css";

class FloorPlans extends React.Component {
  state = {
    currentPlan: this.props.plans[0],
    focused: 0,
  };

  showImage(plan) {
    const { plans } = this.props;

    this.setState({
      currentPlan: plan,
      focused: plans.indexOf(plan),
    });
  }

  className(i) {
    const { focused } = this.state;

    return i === focused ? classes.plan_btn_focus : classes.plan_btn_not_focus;
  }

  showErrorImage = ({ target }) => {
    target.src = "image_not_available.png";
  };

  render() {
    const { plans } = this.props;
    const { currentPlan } = this.state;

    return (
      <section>
        <Subtitle>FLOOR PLANS</Subtitle>
        <div className={classes.floor_plans}>
          {plans.map((plan, i) => {
            return (
              <button
                className={this.className(i)}
                onClick={() => this.showImage(plan)}
                key={plan.name}
              >
                {plan.name}
              </button>
            );
          })}
          <img
            className={classes.floor_img}
            src={currentPlan.url}
            onError={this.showErrorImage}
            alt={currentPlan.name}
          />
        </div>
      </section>
    );
  }
}

export default FloorPlans;
