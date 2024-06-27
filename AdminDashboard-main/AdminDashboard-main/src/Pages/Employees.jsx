import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective,Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';

import { employeesGrid } from '../Data/dummy';
import {Header} from '../Components'
const Employees = () => {
  const [employeesData,setEmployeesData] = useState([])
  const [error,setError] = useState(null);
  console.log(employeesData,"employeesData")
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/bookings", {
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
        setEmployeesData(data)
      })
      .catch((error) => {
        setError(error);
        console.error("Error saving data:", error);
      });
  },[])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Bookings" />
      <GridComponent
        dataSource={employeesData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width= 'auto'
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  );
};
export default Employees;