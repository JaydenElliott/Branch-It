import React, { Component } from "react";
import "../../componentStyles/testing/testingGrounds.css";
import { getLists, postList, ListDetails } from "../../logic/lists";

// Redux
import { connect } from "react-redux";
import { displayToast } from "../../redux/actions/toastActions";

class TestingGrounds extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { grid1Width: 50, grid2Width: 50 };
  }

  stateToString = () => {
    let newString = "";
    newString += this.state.grid1Width + "% " + this.state.grid2Width + "%";
    return newString;
  };

  test = (email: string) => {
    getLists(email)
      .then((res) => {
        console.log("YAY");
        console.log(res);
      })
      .catch((err) => {
        console.log("AWW");
        console.log(err);
      });
  };

  test2 = (details: ListDetails) => {
    postList(details)
      .then((res) => {
        console.log("YAY");
        console.log(res);
      })
      .catch((err) => {
        console.log("AWW");
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.props.displayToast("Hello there ;)", 2500)}>
          Click here from testing
        </button>
        {/* <button onClick={() => this.test("John1@gmail.com")}>Get!</button>
        <button onClick={() => this.test2({email: "John1@gmail.com", list: {something: "what?"}})}>POST!</button> */}
      </div>
    );
  }
}

// Redux mapping to props
const mapDispatchToProps = (dispatch: any) => {
  return {
    displayToast: (message: string = "", time: number = 3000) => {
      dispatch(displayToast(message, time));
    },
  };
};

export default connect(null, mapDispatchToProps)(TestingGrounds);
