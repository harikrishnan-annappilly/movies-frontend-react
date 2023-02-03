import React from "react";
import Like from "./Like";
import _ from "lodash";

function TableBody(props) {
    const { data, columns } = props;

    return (
        <tbody>
            {data.map((movie) => (
                <tr key={movie._id}>
                    {columns.map((column) => (
                        <td key={(column.key || column.path) + movie._id}>
                            {column.content
                                ? column.content(movie)
                                : _.get(movie, column.path)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;
