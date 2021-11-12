import React, { useState } from 'react';
import { Tabs, Tab, Form, Select } from 'react-bootstrap';
import Tab1 from './Tab1';
import AreaChart from './AreaChart';
import { MultiSelect } from "react-multi-select-component";
import Search from '../../Assets/search-icon.svg';

export default function ToolTwo() {

    const [LCAT, setLCAT] = useState("");

    const MultiSelect1options = [
        { label: "Option 1", value: "Option 1", key: 1 },
        { label: "Option 2", value: "Option 2", key: 2 },
        { label: "Option 3", value: "Option 3", disabled: true, key: 3 },
        { label: "Option 4", value: "Option 4", key: 4 },
        { label: "Option 5", value: "Option 5", key: 5 },
    ];

    const MultiSelect2options = [
        { label: "Option 1", value: "Option 1", key: 1 },
        { label: "Option 2", value: "Option 2", key: 2 },
        { label: "Option 3", value: "Option 3", disabled: true, key: 3 },
        { label: "Option 4", value: "Option 4", key: 4 },
        { label: "Option 5", value: "Option 5", key: 5 },
    ];

    const [MultiSelect1, setMultiSelect1] = useState([]);
    const [MultiSelect2, setMultiSelect2] = useState([]);

    return (
        <div className="d-flex flex-column align-items-center background-light" style={{ width: "100%", minHeight: "90vh" }}>
            <h2 className="mt-3">Tool Two (Area Chart)</h2>

            <div className="d-flex justify-content-center pb-5" style={{ width: "100%" }}>
                <div className="d-flex justify-content-around" style={{ width: "98%" }}>
                    <div className="d-flex flex-column align-items-center bg-white py-3" style={{ width: "22%", height: "100%" }}>
                        <h5>Filters</h5>
                        <form style={{ width: "90%" }}>
                            <div className="d-flex pt-2">
                                <input
                                    className="form-control search-bar"
                                    type="text"
                                    placeholder="Keyword Search"
                                    name="keyword"
                                    // onChange={(e) => setKeyword(e.target.value)}
                                    // value={keyword}
                                    style={{
                                        borderRadius: "5px 0px 0px 5px"
                                    }}
                                />
                                <button
                                    className="px-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        borderRadius: "0px 5px 5px 0px",
                                        border: "1px solid #ced4da"
                                    }}>
                                    {/* Search */}
                                    <img src={Search} width="20px" />
                                </button>
                            </div>
                            <div className="pt-2">
                                <label className="color-dark">Select 1</label>
                                <select className="form-select color-dark" aria-label="Default select example">
                                    <option value="0">Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="pt-2">
                                <label className="color-dark">Select 2</label>
                                <select className="form-select color-dark" aria-label="Default select example">
                                    <option value="0">Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="pt-2">
                                <label className="color-dark">MultiSelect 1</label>
                                <MultiSelect
                                    options={MultiSelect1options}
                                    value={MultiSelect1}
                                    onChange={setMultiSelect1}
                                    labelledBy="MultiSelect1"
                                    className="select"
                                />
                            </div>
                            <div className="pt-2">
                                <label className="color-dark">MultiSelect 2</label>
                                <MultiSelect
                                    options={MultiSelect2options}
                                    value={MultiSelect2}
                                    onChange={setMultiSelect2}
                                    labelledBy="MultiSelect2"
                                    className="select"
                                />
                            </div>

                            <div className="d-flex justify-content-center" style={{width: "100%"}}>
                                <button className="btn btn-round-dark mt-3">
                                    Filter
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white p-3" style={{ width: "75%" }}>
                        <div className="d-flex align-items-start">
                            {/* Tabs */}
                            <div style={{ display: 'block', width: "100%" }}>
                                <Tabs defaultActiveKey="second">
                                    <Tab eventKey="first" title="Colspan Table">
                                        <Tab1 />
                                    </Tab>
                                    <Tab eventKey="second" title="Chart View">
                                        <AreaChart />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
