import axios from "../config/axios";
import Swal from "sweetalert2";

export const Comment = (comment) => {
  return { type: "ADD_COMMENT", payload: comment };
};

export const startGetComment = () => {
  return (dispatch) => {
    axios
      .get("/comment", {
        headers: {
          auth: localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const comment = response.data;
        dispatch(Comment(comment));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const StartAddComment = (formData) => {
  console.log(formData);
  return (dispatch) => {
    axios
      .post("/comment", formData, {
        headers: {
          auth: localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.hasOwnProperty("errors")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "somthing goes wrong",
          });
        } else {
          const comment = response.data;
          dispatch(Comment(comment));
          Swal.fire({
            title: "Are you sure?",

            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ADD!",
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const RemoveComment = (_id) => {
  return { type: "REMOVE_COMMENT", payload: _id };
};

export const startRemoveComment = (id) => {
  return (dispatch) => {
    axios
      .delete(`/comment/${id}`, {
        headers: {
          auth: localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.errors,
          });
        } else {
          Swal.fire({
            title: "Are you sure?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "REMOVE!",
          });
          const removeComment = response.data;
          dispatch(RemoveComment(removeComment._id));
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
};
