import React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, DateInput, Pagination } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
export const PostIcon = BookIcon;

const PostPagination = () => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />;

export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="end_user_id" />
            <TextField source="web_page_url" />
            <EditButton />
        </Datagrid>
    </List>
);

const UserURL = ({ record }) => {
    return <span>Post {record ? `"${record.web_page_url}"` : ''}</span>;
};

export const UserEdit = () => (
    <Edit title={<UserURL />}>
        <SimpleForm>
            <TextInput source="end_user_id" />
            <TextInput source="web_page_url" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create title="Create a User">
        <SimpleForm>
            <TextInput source="end_user_id" />
            <TextInput source="web_page_url" />
        </SimpleForm>
    </Create>
);
