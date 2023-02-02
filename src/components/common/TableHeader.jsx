import React from "react";

function TableHeader(props) {
    const columns = props.columns;

    return (
        <thead className="user-select-none">
            <tr>
                {columns.map((column) => (
                    <th key={column.path}>{column.label}</th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;
