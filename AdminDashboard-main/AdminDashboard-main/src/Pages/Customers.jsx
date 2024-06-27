import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import {customersData, customersGrid} from '../Data/dummy';
import {Header} from '../Components';

const Customers = () => {
  const [userData,setUserData] = useState([])
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Optionally, you can do something with the data received from the API
        console.log(data); // For example, log the data to the console
        setUserData(data)
      })
  },[])
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/v1/users", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json(); // Parse the response as JSON
  //     })
  //     .then((data) => {
  //       // Optionally, you can do something with the data received from the API
  //       console.log(data); // For example, log the data to the console
  //       setEmployeesData(data)
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       console.error("Error saving data:", error);
  //     });
  // },[])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Users" />
      <GridComponent
        dataSource={userData}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{allowDeleting: true, allowEditing: true}}
        width= 'auto'
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page,Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  )
}

export default Customers