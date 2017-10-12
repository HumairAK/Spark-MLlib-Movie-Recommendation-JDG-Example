import React, {Component} from "react";
import Table from "../../table/TableView.jsx";
import { dataSet } from '../dataSet.js';
import DisplayReportForm from "../components/DisplayReportForm.jsx";

class MovieRating extends Component {

  _tableConfig(){
    return (
      {
        columns: [
          { data: "id", title:"ID"},
          { data: "movie", title:"movie" },
          { data: "year", title:"year" },
        ],
        data: dataSet,
        dom: "t",
        order: [[ 0, 'asc' ]],
        pfConfig: {
          filterCaseInsensitive: true,
          paginationSelector: "#pagination1",
          colvisMenuSelector: '.table-view-pf-colvis-menu'
        },
      }
    )
  }

  render() {
    let title = <h2 className="card-pf-title">Display Report</h2>;
    return (
      <div className="col col-cards-pf container-cards-pf fader">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented">
            {title}
            <div className="card-pf-footer">
              <DisplayReportForm/>
            </div>
          </div>
          <div className="card-pf card-pf-accented">
            <h2 className="card-pf-title"> Recommended Products for User </h2>
            <div className="card-pf-footer">
              <Table config={this._tableConfig()}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default MovieRating
