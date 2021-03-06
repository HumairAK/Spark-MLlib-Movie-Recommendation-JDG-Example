import React, { Component } from "react";

class TableView extends Component {

  _toolbar(){
    return(
      <div className="row toolbar-pf table-view-pf-toolbar" id="toolbar1">
        <div className="col-sm-12">
          <form className="toolbar-pf-actions">
            <div className="form-group toolbar-pf-filter">
              <label className="sr-only" htmlFor="filter">Rendering Engine</label>
              <div className="input-group">
                <div className="input-group-btn">
                  <button type="button" className="btn btn-default dropdown-toggle" id="filter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Rendering Engine <span className="caret"/></button>
                  <ul className="dropdown-menu">
                    <li><a href="#" id="filter1">Rendering Engine</a></li>
                    <li><a href="#" id="filter2">Browser</a></li>
                    <li><a href="#" id="filter3">Platform(s)</a></li>
                    <li><a href="#" id="filter4">Engine Version</a></li>
                    <li><a href="#" id="filter5">CSS Grade</a></li>
                  </ul>
                </div>
                <input type="text" className="form-control" placeholder="Filter By Rendering Engine..." autoComplete="off" id="filterInput"/>
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-default" type="button" id="deleteRows1">Delete Rows</button>
              <button className="btn btn-default" type="button" id="restoreRows1" disabled>Restore Rows</button>
              <div className="dropdown btn-group  dropdown-kebab-pf">
                <button className="btn btn-link dropdown-toggle" type="button" id="dropdownKebab" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  <span className="fa fa-ellipsis-v"/>
                </button>
                <ul className="dropdown-menu " aria-labelledby="dropdownKebab">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another Action</a></li>
                  <li><a href="#">Something Else Here</a></li>
                  <li role="separator" className="divider"/>
                  <li><a href="#">Separated Link</a></li>
                </ul>
              </div>

            </div>
            <div className="toolbar-pf-action-right">
              <div className="form-group toolbar-pf-find">
                <button className="btn btn-link btn-find" type="button">
                  <span className="fa fa-search"/>
                </button>
                <div className="find-pf-dropdown-container">
                  <input type="text" className="form-control" id="find" placeholder="Find By Keyword..."/>
                  <div className="find-pf-buttons">
                    <span className="find-pf-nums">1 of 3</span>
                    <button className="btn btn-link" type="button">
                      <span className="fa fa-angle-up"/>
                    </button>
                    <button className="btn btn-link" type="button">
                      <span className="fa fa-angle-down"/>
                    </button>
                    <button className="btn btn-link btn-find-close" type="button">
                      <span className="pficon pficon-close"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="row toolbar-pf-results">
            <div className="col-sm-9">
              <div className="hidden">
                <h5>0 Results</h5>
                <p>Active filters:</p>
                <ul className="list-inline"/>
                <p><a href="#">Clear All Filters</a></p>
              </div>
            </div>
            <div className="col-sm-3 table-view-pf-select-results">
              <strong>0</strong> of <strong>0</strong> selected
            </div>
          </div>
        </div>
      </div>
    )
  }

  _table(){
    return (
      <table className="table table-striped table-bordered table-hover" id="table1">
        <thead>
        <tr>
          <th><label className="sr-only" htmlFor="selectAll">Select all rows</label><input type="checkbox" id="selectAll" name="selectAll"/></th>
          <th>Rendering Engine</th>
          <th>Browser</th>
          <th>Platform(s)</th>
          <th>Engine Version</th>
          <th>CSS Grade</th>
          <th colSpan="2">Actions</th>
        </tr>
        </thead>
      </table>
    )
  }

  _form(){
    return(
      <form className="content-view-pf-pagination table-view-pf-pagination clearfix" id="pagination1">
        <div className="form-group">
          <select className="selectpicker pagination-pf-pagesize">
            <option value="6">6</option>
            <option value="10" >10</option>
            <option value="15" selected="selected">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>per page</span>
        </div>
        <div className="form-group">
          <span><span className="pagination-pf-items-current">1-15</span> of <span className="pagination-pf-items-total">75</span></span>
          <ul className="pagination pagination-pf-back">
            <li className="disabled"><a href="#" title="First Page"><span className="i fa fa-angle-double-left"/></a></li>
            <li className="disabled"><a href="#" title="Previous Page"><span className="i fa fa-angle-left"/></a></li>
          </ul>
          <label htmlFor="pagination1-page" className="sr-only">Current Page</label>
          <input className="pagination-pf-page" type="text" value="1" id="pagination1-page"/>
          <span>of <span className="pagination-pf-pages">5</span></span>
          <ul className="pagination pagination-pf-forward">
            <li><a href="#" title="Next Page"><span className="i fa fa-angle-right"/></a></li>
            <li><a href="#" title="Last Page"><span className="i fa fa-angle-double-right"/></a></li>
          </ul>
        </div>
      </form>
    )
  }

  _blankSlateHTML(){
    return(
      <div className="blank-slate-pf table-view-pf-empty hidden" id="emptyState1">
        <div className="blank-slate-pf-icon">
          <span className="pficon pficon pficon-add-circle-o"/>
        </div>
        <h1>Empty State Title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Learn more about this <a href="#">on the documentation</a>.</p>
        <div className="blank-slate-pf-main-action">
          <button className="btn btn-primary btn-lg"> Main Action </button>
        </div>
        <div className="blank-slate-pf-secondary-action">
          <button className="btn btn-default"> Secondary Action </button>
          <button className="btn btn-default"> Secondary Action </button>
          <button className="btn btn-default"> Secondary Action </button>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div>
        {/*{this._toolbar()}*/}
        {this._table()}
        {/*{this._form()}*/}
        {/*{this._blankSlateHTML()}*/}
      </div>
    )
  }
}

export default TableView
