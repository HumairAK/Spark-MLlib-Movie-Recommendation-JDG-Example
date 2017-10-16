import React, { Component } from "react";
import PropTypes from 'prop-types';

class Table extends Component {
  static get propTypes() {
    return {
      config: PropTypes.object.isRequired,
    }
  }

  componentDidMount() {
    console.log("Did Mount");
    $(this.table).DataTable(this.props.config);
  }

  componentWillUnmount(){
    console.log("Unmounting");
    $(this.table).DataTable().destroy();
  }

  shouldComponentUpdate() {
    return false;
  }

  _table(){
    return <table ref={table => this.table = table } className="table table-striped table-bordered table-hover" id="table1"/>
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
    console.log("Rendering");

    return (
      <div>
        {this._table()}
        {this._form()}
      </div>);
  }
}

export default Table