import React from "react";

function TableHeader(props) {
    const { columns, currentSortColumn, onSortClick } = props;

    function renderSortIcon(column) {
        if (currentSortColumn.path === column.path)
            return (
                <i
                    className={
                        "fa fa-sort-" +
                        (currentSortColumn.order === "asc"
                            ? "asc text-success"
                            : "desc text-danger")
                    }
                    aria-hidden="true"
                ></i>
            );
        return <i className="fa fa-sort text-secondary" aria-hidden="true"></i>;
    }

    return (
        <thead className="user-select-none">
            <tr>
                {columns.map((column) => (
                    <th
                        key={column.key || column.path}
                        className={column.path ? "clickable" : null}
                        onClick={column.path ? () => onSortClick(column) : null}
                    >
                        {column.label}{" "}
                        {column.path ? renderSortIcon(column) : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;
