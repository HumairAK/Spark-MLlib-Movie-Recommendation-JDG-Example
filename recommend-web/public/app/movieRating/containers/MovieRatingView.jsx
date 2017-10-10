import React, {Component} from "react";
import DropDownGroup from "../components/dropDownGroup.jsx";
import Table from "../../table/tableView.jsx";
// import { dataSet } from '../dataSet.js';
class MovieRating extends Component {

  _range(start, end) {
    return Array.from({length: (end - start)}, (v, k) => k + start);
  }

  _createForm(){
    let options = this._range(1, 6);
    let ratings = ['Must See', 'Will enjoy', 'It\'s okay', 'Fairly bad', 'Awful'];
    return (
      <form className="form-horizontal" role="form">
        <p className="fields-status-pf">All fields are required.</p>
        <DropDownGroup options={options} label="Select User" />
        <DropDownGroup options={options} label="Select Product" />
        <DropDownGroup options={ratings} label="Select Rating" />

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" disabled>Submit</button>
          </div>
        </div>

      </form>
    )
  }

  render() {
    let title = <h2 className="card-pf-title">View Recommended Movies Results</h2>;
    let content = this._createForm();

    let dataset = [
      {name: "johnathan", nickname: "john"}
    ];
    return (
      <div className="col col-cards-pf container-cards-pf fader">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented">
            {title}
            <div className="card-pf-footer">
              {content}
            </div>
          </div>
          <div className="card-pf card-pf-accented">
            <h2 className="card-pf-title"> Results </h2>
            <div className="card-pf-footer">
              <Table names={dataset}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default MovieRating
