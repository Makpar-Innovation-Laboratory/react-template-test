import React, { useEffect, useState } from 'react';
import Chart from "react-google-charts";

export default function PieChart(props) {

    const dataArr = []

    dataArr.push(['Award ID', 'Amount']);
    for (let i = 0; i < props.data[0].length; i++) {
        dataArr.push([props.data[i][0], props.data[i][4]]);
    }
    console.log(dataArr);

    return (
        <div className="d-flex justify-content-center align-items-center text-centered" style={{width: "100%"}}>
            <Chart
                width={'700px'}
                height={'700px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={dataArr}
                // data={[
                //     ['Language', 'Speakers (in millions)'],
                //     ['German', 5.85],
                //     ['French', 1.66],
                //     ['Italian', 0.316],
                //     ['Romansh', 0.0791],
                // ]}
                options={{
                    legend: 'none',
                    pieSliceText: 'label',
                    title: 'Swiss Language Use (100 degree rotation)',
                    pieStartAngle: 100,
                }}
                rootProps={{ 'data-testid': '4' }}
            />
        </div>
    )
}

// NAICS
// awarding agencies, obligation amount, rank


