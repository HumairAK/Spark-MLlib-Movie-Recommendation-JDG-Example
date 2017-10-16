import React, {Component} from "react";
import Table from "../../table/TableView.jsx";
import { connect } from "react-redux";
import DisplayReportForm from "../components/DisplayReportForm.jsx";
import PropTypes from "prop-types";
import { handleGetRec } from '../movieActions.js';

class MovieRating extends Component {
  static get propTypes() {
    return {
      columns: PropTypes.array,
      dataSet: PropTypes.array,
      submittedReportRequest: PropTypes.bool,
      handleGetRec: PropTypes.func,
    }
  }

  _tableConfig(){
    return (
      {
        columns: this.props.columns,
        data: this.props.dataSet,
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

  _form(){
    let preventDefaultClick = (e) => {
      e.preventDefault();
      return false;
    };
    return(
      <form className="content-view-pf-pagination table-view-pf-pagination clearfix" id="pagination1">
        <div className="form-group">
          <select className="selectpicker pagination-pf-pagesize" defaultValue={"15"}>
            <option value="6">6</option>
            <option value="10" >10</option>
            <option value="15" >15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>per page</span>
        </div>

        <div className="form-group">
          <span><span className="pagination-pf-items-current"/> of <span className="pagination-pf-items-total"/></span>
          <ul className="pagination pagination-pf-back">
            <li><a href="#" onClick={preventDefaultClick} title="First Page"><span className="i fa fa-angle-double-left"/></a></li>
            <li><a href="#" onClick={preventDefaultClick} title="Previous Page"><span className="i fa fa-angle-left"/></a></li>
          </ul>
          <label htmlFor="pagination1-page" className="sr-only">Current Page</label>
          <input className="pagination-pf-page" type="text" id="pagination1-page" defaultValue="1"/>
          <span>of <span className="pagination-pf-pages"/></span>
          <ul className="pagination pagination-pf-forward">
            <li><a href="#" onClick={preventDefaultClick} title="Next Page"><span className="i fa fa-angle-right"/></a></li>
            <li><a href="#" onClick={preventDefaultClick}  title="Last Page"><span className="i fa fa-angle-double-right"/></a></li>
          </ul>
        </div>
      </form>
    )
  }

  render() {
    let title = <h2 className="card-pf-title">Display Report</h2>;
    let recTable = null;
    let formFooter = this._form();
    if(this.props.submittedReportRequest === true) {
      recTable =
        <div className="card-pf card-pf-accented">
          <h2 className="card-pf-title"> Recommended products for user </h2>
          <div className="card-pf-footer">
            <Table config={this._tableConfig() }/>
            {formFooter}
          </div>
        </div>
    }

    return (
      <div className="col col-cards-pf container-cards-pf fader">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented">
            {title}
            <div className="card-pf-footer">
              <DisplayReportForm handleSubmit={this.props.handleGetRec}/>
            </div>
          </div>
          {recTable}
          {formFooter}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    submittedReportRequest: state.movieReducer.submittedReportRequest,
    columns: state.movieReducer.columns,
    dataSet: state.movieReducer.dataSet,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetRec: (e) => {
      dispatch(handleGetRec(e))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieRating);
