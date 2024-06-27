import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../Data/dummy';
import {Header} from '../Components'
const Tours = () => {
  console.log(ordersData,"orderdata");
  console.log(ordersGrid,"grid")
  const [error,setError] = useState(null);
  const [tourData,setTourData] = useState([]);
  
  
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/tours", {
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
        setTourData(data)
      })
      .catch((error) => {
        setError(error);
        console.error("Error saving data:", error);
      });
  },[])
  console.log(tourData,"tourData======")
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Tours" />
      <GridComponent
        id="gridcomp"
        dataSource={tourData}
        allowPaging
        allowSorting
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};
export default Tours;