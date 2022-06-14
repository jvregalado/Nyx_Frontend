import React from "react";
import MUIDataTable from "mui-datatables";

function TableJSON({
	columns,
	data,
	//options,
	title,
	filename
})	{

	const options = {
		filterType: "dropdown",
		responsive: "scroll",
		selectableRowsHeader: false,
		selectableRowsHideCheckboxes: true,
		print: false,
		pagination:false,
		downloadOptions:{filename: `${filename}.csv`, separator: ','}
	};
	return (
		<MUIDataTable
		title={title}
		data={data}
		columns={columns}
		options={options}
		/>
	);
}

TableJSON.defaultProps = {
	columns:[],
	data:[],
	title:''
}

export default TableJSON;