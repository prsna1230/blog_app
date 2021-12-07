import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between bg-dark p-3">
        {/* social medias */}
        <div>
          <img
            src="https://cdn-icons.flaticon.com/png/512/2504/premium/2504903.png?token=exp=1638600138~hmac=69252353da9dd53facab9426662e2465"
            alt="fblogo"
            width="45px"
            className="me-1 ms-1"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/1409/1409946.png"
            alt="instalogo"
            className="me-1 ms-1"
            width="45px"
          />
        </div>
        <div>
          <p className="text-light">Copyright @bloggingworld2021 </p>
        </div>
        <div>
          <p className="text-light">designed by Prasanna</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
