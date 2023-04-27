import { useState } from "react";
import styles from "./styles.module.css";
import * as React from "react";
import {
  Datagrid,
  List,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  required,
} from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";



const updateStatus = async (record) => {
  const response = await fetch(`http://localhost:3000/records/${record.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: record.status === "pending" ? "accepted" : "rejected" }),
  });
  if (!response.ok) {
    throw new Error("Failed to update status");
  }
};

const useUpdateStatus = () => {
  return useMutation(updateStatus);
};

const RecordList = ({ handleClick }) => {
  const classes = useStyles();
  const updateStatus = useUpdateStatus();

  const handleAcceptReject = async (record) => {
    await updateStatus.mutateAsync(record);
    handleClick();
  };

  const rowStyle = (record) => ({
    backgroundColor: record.status === "accepted" ? "#c8e6c9" : record.status === "rejected" ? "#ffcdd2" : "",
  });

  return (
    <List basePath="/records" className={classes.list}>
      <Datagrid rowClick="edit" rowStyle={rowStyle}>
        <TextField source="name" />
        <TextField source="status" />
        <DateField source="created_at" />
        <CustomButton handleClick={handleAcceptReject} />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

const RecordEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <SelectInput
          source="status"
          choices={[
            { id: "pending", name: "Pending" },
            { id: "accepted", name: "Accepted" },
            { id: "rejected", name: "Rejected" },
          ]}
          validate={required()}
        />
        <DateInput source="created_at" disabled />
      </SimpleForm>
    </Edit>
  );
};



const CustomButton = ({ record, handleClick }) => {
  return (
    <Button
      color={record.status === "pending" ? "primary" : "secondary"}
      onClick={() => handleClick(record)}
    >
      {record.status === "pending" ? "Accept" : "Reject"}
    </Button>
  );
};




const Admin = ({ children }) => {

    const [data, setData] = useState("")

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
      };


  return <>
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>User payment</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          approve
        </button>
        <button className={styles.white_btn} onClick={handleLogout}>
          reject
        </button>
      </nav>
    <CustomButton />
    The Admin page
    </div>
  </>
};

export default Admin;
