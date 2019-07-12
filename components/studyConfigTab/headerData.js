export const HeaderData = {
    "Headerdata_View": {
        "columnDefs": [
            {
                "headerName": "Assignment Code",
                "field": "assignment",
                "width": 250

            },
            {
                "headerName": "Description",
                "field": "description",
                "width": 250
            },
            {
                "headerName": "Ratio",
                "field": "ratio",
                "width": 235
            },
            {
                "headerName": "Sequence Limit",
                "field": "sequenceLimit",
                "width": 220
            }
        ],
        "rowSelection": "single",
        "defaultColDef": { "resizable": true }
    },
    "Headerdata": {
        "columnDefs": [
            {
                "headerName": "Assignment Code",
                "field": "assignment",
                "width": 285

            },
            {
                "headerName": "Description",
                "field": "description",
                "width": 300    
            },
            {
                "headerName": "Ratio",
                "field": "ratio",
                "width": 75,
            },
            {
                "headerName": "Sequence Limit",
                "field": "sequenceLimit",
                "width": 200
            },
            {
                "headerName": "",
                "field": "EditColumn",
                "cellRenderer": "EditComponent",
                "cellRendererParams": { "action": "editAction" },
                "width": 50
            },
            {
                "headerName": "",
                "field": "DeleteColumn",
                "cellRenderer": "DeleteComponent",
                "cellRendererParams": { "action": "editAction" },
                "width":50
            }
        ],
        "rowSelection": "single",
        "defaultColDef": { "resizable": true }
    }
};