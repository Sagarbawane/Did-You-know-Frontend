import React from "react";
import { connect } from "react-redux";
import { startRemoveFact } from "../../../../actions/factAction";

class Inspirational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleView = (id) => {
    console.log(id);
    this.props.history.push(`/technical/${id}`);
  };

  renderFact = () => {
    const fact = this.props.fact.map((ele) => {
      if (ele.type == "inspirational") {
        return (
          <div class="row" style={{ width: 30 + "rem" }}>
            <div class="col-auto  mb-4 d-flex align-items-stretch">
              <div class="card mt-4 mx-auto " style={{ width: 32 + "rem" }}>
                <div class="embed-responsive embed-responsive-16by9">
                  <img
                    src={ele.imageLink}
                    class="card-img-top embed-responsive-item"
                    alt="..."
                  />
                </div>
                <div class="card-body">
                  <h5 class="card-title">{ele.title}</h5>

                  <p class="card-text">{ele.createdAt}</p>
                  <h6 class="card-subtitle mb-2 text-muted">
                    Created By {ele.name}
                  </h6>

                  <p class="card-text">{ele.description.length == 20}</p>

                  <div class="card-footer">
                    <div class="btn-wrapper text-center d-flex justify-content-between">
                      <button
                        onClick={() => {
                          this.handleView(ele._id);
                        }}
                        type="button"
                        class="btn btn-secondary  btn-sm text-white d-flex align-items-center"
                      >
                        Read More
                      </button>
                      <button
                        type="button"
                        class="btn btn-warning"
                        onClick={() => {
                          this.props.dispatch(startRemoveFact(ele._id));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

    return <div className="row">{fact}</div>;
  };
  render() {
    return (
      <div>
        <div className="container-2">
          <h1 className="des">Inspirational Facts </h1>
        </div>

        <div>{this.renderFact()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    fact: state.fact,
    user: state.user,
  };
};
export default connect(mapStateToProps)(Inspirational);
