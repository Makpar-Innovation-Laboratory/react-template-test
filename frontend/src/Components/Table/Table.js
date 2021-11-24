import React, {useContext} from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";
import {Context} from '../../App.js'
const Table = ({ theadData, tbodyData, customClass }) => {
    const context = useContext(Context)
    return (
        <div>
            {context.data.results.length > 0 ? (
            <table className={customClass}>
                <thead>
                    <tr>
                        {theadData.map((h) => {
                            return <TableHeadItem key={h} item={h} />;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tbodyData.map((item) => {
                        return <TableRow key={item.id} data={item.items} />;
                    })}
                </tbody>
            </table>) : (
            <div
            className="d-flex flex-column align-items-center justify-content-center bg-white mt-4"
            style={{ width: "70%", minHeight: "40vh" }}
            >
            <p>No Data Found </p>
            </div>
        )}
      </div>
    );
};

export default Table;