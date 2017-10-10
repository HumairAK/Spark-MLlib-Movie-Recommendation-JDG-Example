import React, { Component } from "react";
import PropTypes from 'prop-types';

import { dataSet } from '../movieRating/dataSet'

class Table extends Component {
  static get propTypes() {
    return {
      names: PropTypes.array,
    }
  }

  componentDidMount() {
    let dt = $(this.table).DataTable({
      columns: [
        { data: null,
          className: "table-view-pf-select",
          render: function (data, type, full, meta) {
            // Select row checkbox renderer
            var id = "select" + meta.row;
            return '<label class="sr-only" for="' + id + '">Select row ' + meta.row +
              '</label><input type="checkbox" id="' + id + '" name="' + id + '">';
          },
          sortable: false
        },
        { data: "engine" },
        { data: "browser" },
        { data: "platforms" },
        { data: "version" },
        { data: "grade"},
        { data: null,
          className: "table-view-pf-actions",
          render: function (data, type, full, meta) {
            // Inline action button renderer
            return '<div class="table-view-pf-btn"><button class="btn btn-default" type="button">Actions</button></div>';
          }
        }, {
          data: null,
          className: "table-view-pf-actions",
          render: function (data, type, full, meta) {
            // Inline action kebab renderer
            return '<div class="dropdown dropdown-kebab-pf">' +
              '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
              '<span class="fa fa-ellipsis-v"></span></button>' +
              '<ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownKebabRight">' +
              '<li><a href="#">Action</a></li>' +
              '<li><a href="#">Another action</a></li>' +
              '<li><a href="#">Something else here</a></li>' +
              '<li role="separator" class="divider"></li>' +
              '<li><a href="#">Separated link</a></li></ul></div>';
          }
        }
      ],
      data: dataSet,
      dom: "t",
      language: {
        zeroRecords: "No records found"
      },
      order: [[ 1, 'asc' ]],
      pfConfig: {
        emptyStateSelector: "#emptyState1",
        filterCaseInsensitive: true,
        filterCols: [
          null,
          {
            default: true,
            optionSelector: "#filter1",
            placeholder: "Filter By Rendering Engine..."
          }, {
            optionSelector: "#filter2",
            placeholder: "Filter By Browser..."
          }, {
            optionSelector: "#filter3",
            placeholder: "Filter By Platform(s)..."
          }, {
            optionSelector: "#filter4",
            placeholder: "Filter By Engine Version..."
          }, {
            optionSelector: "#filter5",
            placeholder: "Filter By CSS Grade..."
          }
        ],
        paginationSelector: "#pagination1",
        toolbarSelector: "#toolbar1",
        selectAllSelector: 'th:first-child input[type="checkbox"]',
        colvisMenuSelector: '.table-view-pf-colvis-menu'
      },
      select: {
        selector: 'td:first-child input[type="checkbox"]',
        style: 'multi'
      },
    });
  }

  componentWillUnmount(){
    $('.data-table-wrapper')
      .find('table')
      .DataTable()
      .destroy(true);
  }

  shouldComponentUpdate() {
    return false;
  }

  _table(){
    return (
      <table ref={table => this.table = table }
        className="table table-striped table-bordered table-hover" id="table1">
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
    let testFunc = (e) => {
      e.preventDefault();
      $(this.table).next();
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
          <span><span className="pagination-pf-items-current">1-15</span> of <span className="pagination-pf-items-total">75</span></span>
          <ul className="pagination pagination-pf-back">
            <li><a href="#" onClick={testFunc} title="First Page"><span className="i fa fa-angle-double-left"/></a></li>
            <li><a href="#" onClick={testFunc} title="Previous Page"><span className="i fa fa-angle-left"/></a></li>
          </ul>
          <label htmlFor="pagination1-page" className="sr-only">Current Page</label>
          <input className="pagination-pf-page" type="text" value="1" id="pagination1-page"/>
          <span>of <span className="pagination-pf-pages">5</span></span>
          <ul className="pagination pagination-pf-forward">
            <li><a href="#" onClick={testFunc} title="Next Page"><span className="i fa fa-angle-right"/></a></li>
            <li><a href="#" onClick={testFunc}  title="Last Page"><span className="i fa fa-angle-double-right"/></a></li>
          </ul>
        </div>
      </form>
    )
  }

  render() {
    return (
      <div>
        {/*<table ref={table => this.table = table} />*/}
        {this._table()}
        {this._form()}
      </div>);
  }
}

export default Table