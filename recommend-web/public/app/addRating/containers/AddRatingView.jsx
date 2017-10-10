import React, { Component } from "react";

class AddRating extends Component {
  render() {
    let title = <h2 className="card-pf-title">Add Rating</h2>;
    let content = <div>Stuff goes here</div>;

    return (
      <div className="col col-cards-pf container-cards-pf fader">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented">
            {title}
            <div className="card-pf-footer ">
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default AddRating