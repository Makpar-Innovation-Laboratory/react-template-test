import React, {useState} from 'react';
import { Tabs, Tab } from 'react-bootstrap';

export default function Tab1() {

    return (
        <div className="d-flex flex-column pt-3" style={{ width: "" }}>
            <div>
                {/* Data Preview/Summary */}
                <div className="d-flex bg-white" style={{ height: "70px" }}>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: "25%" }}>
                        <p>Total Transactions</p>
                        <h4>550</h4>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: "25%", borderLeft: "1px solid #a0a0a0" }}>
                        <p>Total Transactions</p>
                        <h4>550</h4>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: "25%", borderLeft: "1px solid #a0a0a0" }}>
                        <p>Total Transactions</p>
                        <h4>550</h4>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: "25%", borderLeft: "1px solid #a0a0a0" }}>
                        <p>Total Transactions</p>
                        <h4>550</h4>
                    </div>
                </div>
                <div>
                    {/* Pagination */}
                </div>
                <div className="pt-3">
                    {/* Main Table */}
                    <table id="customers">
                        <thead>
                            <tr className="background-dark">
                                <th>Award ID</th>
                                <th>Mod</th>
                                <th>Recipient Name</th>
                                <th>Action Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="background-light" rowspan="2">Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                {/* <td>Berglunds snabbköp</td> */}
                                <td>Christina Berglund</td>
                                <td>Sweden</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td className="background-light" rowspan="2">Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                {/* <td>Berglunds snabbköp</td> */}
                                <td>Christina Berglund</td>
                                <td>Sweden</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td className="background-light" rowspan="2">Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                {/* <td>Berglunds snabbköp</td> */}
                                <td>Christina Berglund</td>
                                <td>Sweden</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td className="background-light" rowspan="2">Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                {/* <td>Berglunds snabbköp</td> */}
                                <td>Christina Berglund</td>
                                <td>Sweden</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td className="background-light" rowspan="2">Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                {/* <td>Berglunds snabbköp</td> */}
                                <td>Christina Berglund</td>
                                <td>Sweden</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td className="background-light" rowspan="2">Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                {/* <td>Berglunds snabbköp</td> */}
                                <td>Christina Berglund</td>
                                <td>Sweden</td>
                                <td>Germany</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
