import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Datepicker extends React.Component {
  state = {
    departingDate: new Date(),
  };

  handleChange = (date) => {
    this.setState({
      departingDate: date,
    });

    this.props.onChange(date);
  };

  render() {
    return (
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={this.state.departingDate}
        onChange={this.handleChange}
      />
    );
  }
}

export default Datepicker;
