# react-data-tables

React-data-tables is a library for React, allowing you to display your data into a table. It includes several functionnalities like search, sorting. It can also help you choose how many rows you want to display per page.

## Installation

npm i react-data-tables

## Node version

v20.12.2

## IDE

Visual Studio Code is the preferred IDE to use and develop react-data-tables.

## Example

In this example we will create two const : 
- columns, which will create the columns of your table (do not forget to specify if you want a column to be sortable or not),
- employees, which is the data you want to display thanks to react-data-tables.

Those two const have to be added as props ('data' and 'columns') when using the DataTables component.

You will have to add a third props, which is 'rowsPerPage', to display how many rows you want to display per page.

```js
import { DataTables } from '../../../../react-data-tables/lib/components/DataTables/DataTables.tsx';

const columns = [
  { column: 'firstName', index: 'firstName', sortable: true },
  { column: 'lastName', index: 'lastName', sortable: true },
  { column: 'dateOfBirth', index: 'dateOfBirth', sortable: true },
  { column: 'startDate', index: 'startDate', sortable: true },
  { column: 'street', index: 'street', sortable: true },
  { column: 'zipCode', index: 'zipCode', sortable: true },
  { column: 'city', index: 'city', sortable: true },
  { column: 'state', index: 'state', sortable: true },  
  { column: 'department', index: 'department', sortable: true },
];

const employees = [
  {
    firstName: 'Gabriel',
    lastName: 'Capell',
    dateOfBirth: '14/07/2000',
    startDate: '14/07/2024',
    street: '12 rue du Général De Gaulle',
    zipCode: '27000',
    city: 'Nogent-le-Rotrou',
    state: 'Alabama',
    department: 'Sales',
  },
  {
    firstName: 'Jean',
    lastName: 'Dot',
    dateOfBirth: '14/07/2000',
    startDate: '14/07/2024',
    street: '12 rue de la République',
    zipCode: '27000',
    city: 'Nogent-le-Rotrou',
    state: 'Utah',
    department: 'Sales',
  },
    firstName: 'Philippe',
    lastName: 'Le Petit',
    dateOfBirth: '14/07/2000',
    startDate: '14/07/2024',
    street: '12 rue de la Nation',
    zipCode: '27000',
    city: 'Nogent-le-Rotrou',
    state: 'Wisconsin',
    department: 'Sales',
]

function Employees() {

  return (
    <div id="employee-div" className="container">
      <DataTables data={employees} rowsPerPage={5} columns={columns}/>
    </div>
  );
}

export default Employees;
```

## Props

|  Props     |   Description    |   Default Value    |   Type    |   Required   |
|---    |:-:    |:-:    |:-:    |:-:    |
|  data     |   Your data to display as a table    |       |   array    | true | 
|  rowPerPages    |    The number of rows displayed per pages   |       |   number    | true |
|  columns     |   Your table's columns    |       |   array    | true |


