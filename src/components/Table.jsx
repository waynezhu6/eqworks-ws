import React, { useMemo, memo } from "react";
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce } from "react-table";
import { matchSorter } from 'match-sorter';
import styles from '../styles/components/Table.module.scss';

const fuzzyTextFilter = (rows, id, filterValue) => {
  if (!filterValue || !filterValue.length)
    return rows;

  const terms = filterValue.split(' ');
  if(!terms)
    return rows;

  console.log(filterValue);

  return terms.reduceRight((results, term) => 
    matchSorter(results, term, { keys: [row => row.values[id]] }), rows);
    
  // return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilter.autoRemove = val => !val;

const Table = ({config, data, visible}) => {
  const filterTypes = useMemo(() => ({
    fuzzyText: fuzzyTextFilter
  }))

  const columns = useMemo(() => config, []);

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable({columns, data, filterTypes}, useGlobalFilter, useSortBy);

  return (
    <div style={!visible ? {display: "none"} : {}}>

      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.slice(1).map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ⮝'
                        : ' ⮟'
                      : ' ⮞'}
                </th>
              ))}
            </tr>
          ))}

        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>

  );
}

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }){
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className={styles.search}>
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} rows by year, date, place, etc...`}
        
      />
    </div>
  )
}

export default memo(Table);