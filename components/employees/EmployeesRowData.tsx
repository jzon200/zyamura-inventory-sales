import React, { Fragment } from "react";
import { useAppDispatch } from "../../redux-store/hooks/hooks";
import {
  setEmployee,
  setShowDeleteDialog,
  setShowEditDialog,
} from "../../redux-store/slices/employeesSlice";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

type Props = {
  employee: Employee;
};

const EmployeesRowData = ({ employee }: Props) => {
  const { id, firstName, lastName, email, contactNumber, role, imageUrl } =
    employee;

  const dispatch = useAppDispatch();

  const editHandler = () => {
    dispatch(setEmployee(employee));
    dispatch(setShowEditDialog(true));
  };

  const deleteHandler = () => {
    dispatch(setEmployee(employee));
    dispatch(setShowDeleteDialog(true));
  };

  return (
    <Fragment>
      {imageUrl ? (
        <div className="w-20">
          <Image
            src={imageUrl}
            className="rounded-md "
            width={720}
            height={720}
            objectFit={"cover"}
            quality={100}
            alt=""
          />
        </div>
      ) : (
        <div className="h-20 w-20" />
      )}
      <div>{id}</div>
      <div>{`${firstName} ${lastName}`}</div>
      <div>{contactNumber}</div>
      <div>{email}</div>
      <div>{role}</div>
      <div className="flex gap-4">
        <button title="Edit" onClick={editHandler}>
          <FiEdit />
        </button>
        <button title="Delete" onClick={deleteHandler}>
          <BsTrash />
        </button>
      </div>
    </Fragment>
  );
};

export default EmployeesRowData;
