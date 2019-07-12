export const HeaderData = {
    "enrollmentTargetHeaderView": {
        "columnDefs": [
            {
                "headerName": "Month",
                "field": "month",
                "width": 400,
                "valueGetter": (params) => {   
                    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];                 
                    let date = new Date(params.data.month);
                    let month_value = monthNames[date.getMonth()];
                    let year_value = date.getFullYear();
                    return month_value+"-"+year_value;
                }
            },
            {
                "headerName": "Target",
                "field": "target",
                "width": 400
            },
        ],
        "rowSelection": "single",
        "defaultColDef": { "resizable": true }
    },
    "enrollmentTargetHeaderCreate": {
        "columnDefs": [
            {
                "headerName": "Month",
                "field": "month",
                "width": 400,
                "valueGetter": (params) => {   
                    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];                 
                    let date = new Date(params.data.month);
                    let month_value = monthNames[date.getMonth()];
                    let year_value = date.getFullYear();
                    return month_value+"-"+year_value;
                }
            },
            {
                "headerName": "Target",
                "field": "target",
                "width": 400
            },
            {
                "headerName": "",
                "field": "EditColumn",
                "cellRenderer": "EditComponent",
                "cellRendererParams": {
                },
                "width": 75
            },
            {
                "headerName": "",
                "field": "DeleteColumn",
                "cellRenderer": "DeleteComponent",
                "cellRendererParams": {
                },
                "width": 75
            }
        ],
        "rowSelection": "single",
        "defaultColDef": { "resizable": true }
    }
};
