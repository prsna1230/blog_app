import React from "react";

const LikeLoveReport = () => {
  return (
    <div>
      <div className="d-inline">
        <img
          src="https://cdn-icons.flaticon.com/png/512/880/premium/880452.png?token=exp=1638456668~hmac=f1e31c6d4ee536b21b341472f4afb600"
          alt="like"
          width="25px"
          onClick={() => console.log("I clicked Like")}
        />
        <span> Like </span>
      </div>
      <div className="d-inline">
        <img
          src="https://cdn-icons.flaticon.com/png/512/2589/premium/2589175.png?token=exp=1638456668~hmac=6b1ca4f83bbe779fbaf1187783fb1b34"
          alt="love"
          width="25px"
          onClick={() => console.log("I clicked love")}
        />
        <span> Love </span>
      </div>
      <div className="d-inline">
        <img
          src="https://cdn-icons.flaticon.com/png/512/2550/premium/2550450.png?token=exp=1638457207~hmac=ffc1026c63cdb454d793784e95c89cfc"
          alt="love"
          width="25px"
          onClick={() => console.log("I clicked report")}
        />
        <span>Report</span>
      </div>
    </div>
  );
};

export default LikeLoveReport;
