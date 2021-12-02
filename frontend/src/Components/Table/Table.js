import React, {useContext, useState, useEffect} from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";
import {Context} from '../../App.js'
const Table = ({ theadData, tbodyData, customClass }) => {
    const context = useContext(Context)
    const [data, setData] = useState();
    const [tableBody, setTableBody] = useState()
    let newdata
    let tbody
    useEffect(() => {
        // console.log(context.data)
        
        
        newdata = Object.keys(context.data.results).map(function(key) {
            let container ={}
            let tempArr = new Array(key)
            tempArr.push.apply(tempArr, Object.values(context.data.results[key]))
            // for (var i=0; i<context.data.results[key].length; i++){
            //     tempArr.push(context.data.results[key][i])
            // }
            // console.log(i)
            // console.log(Object.values(context.data.results[key]))
            container['id'] = key
            container['item'] = tempArr
            // container['items'] = context.data.results[item]
            return container
        })
        tbody = newdata.map(function(e){return <TableRow key={e.id} data={e.item} />;})
        setTableBody(tbody)
        setData(newdata)
        // context.updateData(newdata)
        console.log(tbody)
        // console.log('pushed')
        },[context.data.results])
    
    return (
        <div>
            {context.showTable === true ? (
            <table className={customClass}>
                <thead>
                    <tr>
                        {theadData.map((h) => {
                            return <TableHeadItem key={h} item={h} />;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* {data.map((item) => {
                        return <TableRow key={item.id} data={item} />;
                    })} */}
                    {tableBody}
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