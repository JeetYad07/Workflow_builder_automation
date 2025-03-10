import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { updateNodeData, deleteNode } from "../store/workflowSlice";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

const WorkflowTable = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.workflow.nodes);
  console.log("nodes: ",nodes)
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({});


  
  // Handle input change in edit mode
  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // Enable edit mode and prefill data
  const handleEdit = (row) => {
    setEditMode(row.original.id);
    setEditData({ ...row.original.data }); // Prefill with existing data
  };

  // Save the updated node data
  const handleSave = (id) => {
    dispatch(updateNodeData({ id, data: editData }));
    setEditMode(null);
  };

  // Define columns for React Table
  const columns = [
    {
      header: "Node Type",
      accessorKey: "type",
    },
    {
      header: "Node Name",
      cell: ({ row }) =>
        editMode === row.original.id ? (
          <input
            type="text"
            value={editData.name || ""}
            onChange={(e) => handleInputChange(e, "name")}
          />
        ) : (
          row.original.data?.name || "N/A"
        ),
    },
    {
      header: "Status",
      cell: ({ row }) =>
        editMode === row.original.id ? (
          <select
            value={editData.status || ""}
            onChange={(e) => handleInputChange(e, "status")}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        ) : (
          row.original.data?.status || "N/A"
        ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <>
          {editMode === row.original.id ? (
            <button onClick={() => handleSave(row.original.id)}>
              <FaSave />
            </button>
          ) : (
            <>
              <button onClick={() => handleEdit(row)}>
                <FaEdit />
              </button>
              <button onClick={() => dispatch(deleteNode(row.original.id))}>
                <FaTrash />
              </button>
            </>
          )}
        </>
      ),
    },
  ];

  // Create table instance
  const table = useReactTable({
    data: nodes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h3>Workflow Table</h3>
      <table border="1" width="max-content">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkflowTable;
