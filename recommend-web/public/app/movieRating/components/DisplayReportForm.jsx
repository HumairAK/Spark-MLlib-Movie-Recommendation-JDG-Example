import React, {Component} from "react";
import DropDownGroup from "../../util/DropDownGroup.jsx";
import { Range } from "../../util/util.jsx"

class DisplayReportForm extends Component {

  render() {
    let userOptions = Range(1, 6);

    return (
      <form className="form-horizontal" role="form">
        <p className="fields-status-pf">All fields are required.</p>
        <DropDownGroup options={userOptions} label="Select User"/>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}


export default DisplayReportForm
