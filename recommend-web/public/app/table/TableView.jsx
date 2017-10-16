import React, { Component } from "react";
import PropTypes from 'prop-types';
//import SelectOption from './selectOption.jsx';
import * as _ from 'underscore';

class Table extends Component {
  static get propTypes() {
    return {
      config: PropTypes.object.isRequired,
    }
  }

  shouldComponentUpdate(nextProps) {
    console.log("Should Update");

    /* Table has not been created (see ComponentDidMount()).*/
    if(this.props.config.data.length === 0)
      return true;
    else if(nextProps.config.data !== this.props.config.data)
      this._reloadTableData(nextProps.config.data);
    else
      this._updateTable(nextProps.config.data);

    return false;
  }

  _reloadTableData(data) {
    //console.log(data);
    const table = $(this.table).DataTable();
    table.clear();
    table.rows.add(data);
    table.draw();
  }

  _updateTable(newData) {
    const table = $(this.table).DataTable();
    let dataChanged = false;
    table.rows().every(function () {
      const oldDataRow = this.data();
      const newDataRow = newData.find((newRow) => {
        return _.isEqual(newRow, oldDataRow);
      });

      if (_.isEqual(newDataRow, oldDataRow)) {
        dataChanged = true;
        this.data(newDataRow);
      }
      return true; // RCA esLint configuration wants us to
      // return something
    });

    if (dataChanged) {
      table.draw();
    }
  }

  _table(){
    return <table ref={table => this.table = table } className="table table-striped table-bordered table-hover" id="table1"/>
  }

  render() {
    console.log("Rendering");
    return this._table();
  }


  componentDidUpdate(){
    console.log("Did Update");

    if(this.props.config.data.length !== 0)
      $(this.table).DataTable(this.props.config);
  }

  componentDidMount() {
    console.log("Did Mount");

    if(this.props.config.data.length !== 0)
      $(this.table).DataTable(this.props.config);
  }

  componentWillUnmount(){
    console.log("Will Unmount");

    $(this.table).DataTable().destroy();
  }
}

export default Table
