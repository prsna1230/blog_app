import React from "react";

function Home() {
  return (
    <div>
      {/* image */}
      <h3 className="text-center mb-5">Welcome To The Blogging World</h3>
      <div className="position-relative">
        <h3 className="position-absolute top-0 start-50 translate-middle blog ">
          Blog
        </h3>
        <img
          src="https://images.pexels.com/photos/235648/pexels-photo-235648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="green image"
          className="w-100 mt-2"
          height="450px"
        />
      </div>
    </div>
  );
}

export default Home;
