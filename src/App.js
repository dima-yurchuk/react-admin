import React from "react";
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import {UserList, UserEdit, UserCreate} from "./components/CustomUserList";

function App() {
  return (
      <Admin dataProvider={simpleRestProvider('http://localhost:5000/api')}>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}/>
      </Admin>
  );
}

export default App;
