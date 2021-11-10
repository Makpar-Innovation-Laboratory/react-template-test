import React, { useState, forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import LocPicker from '../CountryCityState/locationpicker'
import DatePicker from "react-datepicker";

// import {Context} from '../../App'


export default function Table(props) {
    // const context = useContext(Context)
    const [dest, setDest] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const renderLocationPicker = (params) => {
        return (
            <div>
                <LocPicker />
            </div>
        )
    }
    const renderStartDatePicker = (params) => {
        
        return (
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        );
    }
    const renderEndDatePicker = (params) => {
        
        return (
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        );
    }
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
    const [columns, setColumns] = useState([
        {
            title: "Origin",
            field: "origin",
            render: renderLocationPicker,
            disableClickEventBubbling: true,
            editable:true
        },
        {
            title: "Destination",
            field: "destination",
            render: renderLocationPicker,
            disableClickEventBubbling: true,
            editable:true
        },
        {
            title: "Start Date",
            field: "start_date",
            render: renderStartDatePicker,
            disableClickEventBubbling: true,
            editable:true
        },
        {
            title: "End Date",
            field: "end_date",
            render: renderEndDatePicker,
            disableClickEventBubbling: true,
            editable:true
        },
        {
            title: "Per-diem",
            field: "perdiem",
        },
    ])
    const [tableData, setTableData] = useState([{
        origin: "value",
        destination: "value",
        start_date: "value",
        end_date: "value",
        perdiem: 100
    },
    ])
    // useEffect(() => {
    //     if (props.mydata != "false") {
    //         setTableData(context.data);
    //         console.log(tableData);
    //         // setColumns(tableData);
    //     }
    // }, [context.data])
    return (
        <div style={{ width: "95%" }}>
            <MaterialTable
                columns={columns}
                data={tableData}
                title=""
                icons={tableIcons}
                options={{
                    headerStyle: {
                        backgroundColor: '#707070',
                        color: '#FFF',
                        fontWeight: 'bold',
                    },
                    rowStyle: {
                        color: '#707070'
                    },
                    
                    // search: true
                }}
                actions={[
                    {
                      icon: AddBox,
                      tooltip: "my tooltip",
                      position: "toolbar",
                      onClick: () => {
                        console.log("clicked");
                      }
                    }
                ]}
            />
        </div>
    );
}