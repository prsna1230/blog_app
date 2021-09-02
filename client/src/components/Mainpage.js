import React from 'react'

function Mainpage() {
    return (
        <div className="container row mt-5">
           <div className="col-8 me-4">
               <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a  className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        </div>
                    </div>
           </div>
           <div className="col-3 shadow text-center">
                <h4>Prasanna</h4>
           </div>
        </div>
    )
}

export default Mainpage
