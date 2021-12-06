import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, getBlog } from "../../redux-store/blogSlice";
import EditBlog from "../EditBlog";
import Footer from "../Footer";
import ListofBlog from "../ListofBlog";

const Userdashboard = () => {
  let dispatch = useDispatch();
  let [index, setindex] = useState(null);
  let [blogForEdit, setBlogForEdit] = useState({});
  let [ed, seted] = useState(false);
  useEffect(() => {
    dispatch(getBlog());
  }, [index]);
  let { userObj } = useSelector((state) => state.user);
  let { blogObj } = useSelector((state) => state.blog);
  const result = blogObj.filter((bl) => bl.email === userObj.email);

  // To edit particular blog
  const editBlog = (val) => {
    let index = result.findIndex((obj) => obj._id === val._id);
    seted(!ed);
    setindex(index);
    setBlogForEdit({ ...val });
  };

  // To delete particular blog
  const deleteblog = (val) => {
    let index = result.findIndex((obj) => obj._id === val._id);
    setindex(index);
    dispatch(deleteBlog({ bid: val._id, index: index }));
  };

  return (
    <div className="container">
      <div className="row row-col-1 row-col-sm-2">
        <div className="col">
          {/* For photo and the Name */}
          <img
            src={userObj.profileimage}
            className="rounded-pill d-block mx-auto"
            width="100px"
            alt="profile image"
          />
          <br />
          {/* username */}
          <h5 className="text-center text-capitalize">
            Username: {userObj.username}
          </h5>
          <h5 className="text-center">Email: {userObj.email}</h5>
        </div>
        <div className="col">
          <h3>Other Details</h3>
          <br />
          <h6>
            <strong>Gender:</strong>
            {userObj.gender}
          </h6>
          <br />
          <h6>
            <strong>Intrests:</strong> {userObj.intrests}
          </h6>
          <br />
          <h6>
            <strong>Favourite Music:</strong> {userObj.favouritemusic}
          </h6>
          <br />
        </div>
      </div>
      {/* posts */}
      {ed ? (
        <EditBlog blogForEdit={blogForEdit} index={index} seted={seted} />
      ) : (
        <div>
          <h3 className="text-center mt-4 mb-2">
            <strong>Your Posts</strong>
          </h3>
          <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 mb-4">
            {result.map((bl, index) => {
              return (
                <div key={index}>
                  <ListofBlog bl={bl} />
                  <div className="mt-0 card card-footer">
                    <div className="d-flex justify-content-end">
                      <img
                        src="https://cdn-icons.flaticon.com/png/512/738/premium/738880.png?token=exp=1638695075~hmac=1c5a27686b9544f66d98043abe013b4f"
                        alt="edit"
                        width="40px"
                        onClick={() => editBlog(bl)}
                      />
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1632/1632602.png"
                        alt="delete"
                        width="40px"
                        onClick={() => deleteblog(bl)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Userdashboard;
