import React from "react";
import { connect } from "react-redux";
import { findIndividualFact } from "../../../../selectors/factSelector";
import { StartAddComment } from "../../../../actions/commentAction";
import { startRemoveComment } from "../../../../actions/commentAction";

class FactDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removeComment: false,
      addComment: false,
      comment: "",
    };
  }
  handleAddComment = () => {
    this.setState((prevState) => {
      return {
        addComment: !prevState.addComment,
      };
    });
  };
  handleRemoveComment = (id) => {
    this.setState((prevState) => {
      return {
        removeComment: !prevState.removeComment,
      };
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.props.user.username,
      comment: this.state.comment,
      factId: this.props.fact._id,
    };
    this.props.dispatch(StartAddComment(formData));
  };
  render() {
    return (
      <div className="container">
        {this.props.fact && (
          <div className="container">
            <h3 className="heading ">{this.props.fact.title}</h3>
            <br /> <br /> <br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <h5 className="created">Created By-{this.props.fact.name}</h5>
            <h5 className="created">{this.props.fact.createdAt}</h5>
            <h4 className="description">{this.props.fact.description}</h4>
            <br />
            <button onClick={this.handleAddComment}>Add Comment</button>
          </div>
        )}
        {this.state.addComment && (
          <div>
            <div className="container">
              &nbsp; &nbsp; &nbsp; &nbsp;
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <input
                    type="text"
                    name="comment"
                    placeholder="Post your Comment...."
                    value={this.state.comment}
                    onChange={this.handleChange}
                    class="form-control"
                  />
                  <br />
                  <input
                    type="submit"
                    class="btn btn-success "
                    value="Submit"
                  />
                </div>
                <div>
                  <h1>comment</h1>
                  {this.props.fact && (
                    <div>
                      {this.props.comment.map((ele) => {
                        if (ele.factId == this.props.fact._id) {
                          return (
                            <div className="container">
                              <h5>{ele.name}</h5>
                              {ele.comment}
                              &nbsp; &nbsp; &nbsp;
                              <button
                                type="button"
                                class="  btn-sm "
                                onClick={() =>
                                  this.handleRemoveComment(ele._id)
                                }
                              >
                                ...
                              </button>
                              {this.state.removeComment && (
                                <div>
                                  <button
                                    type="button"
                                    class=" btn btn-secondary btn-sm "
                                    onClick={() => {
                                      this.props.dispatch(
                                        startRemoveComment(ele._id)
                                      );
                                    }}
                                  >
                                    remove
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    comment: state.comment,
    fact: findIndividualFact(state.fact, props.match.params.id),
    user: state.user,
  };
};
export default connect(mapStateToProps)(FactDescription);
