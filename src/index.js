import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TreeViewCheckBox from './components';

const sampleData = [
  {
    id: 1,
    name: 'Parent 1',
    children: [
      {
        id: 11,
        name: 'Item Id 11 (Child of Parent 1)',
      },
    ],
  },
  {
    id: 2,
    name: 'Item 2',
  },
  {
    id: 3,
    name: 'Parent 3',
    children: [
      {
        id: 30,
        name: 'Parent Id 30 (Child of Parent 3)',
        children: [
          {
            id: 31,
            name: 'Parent Id 31 (Child of Parent 30)',
          },
          {
            id: 32,
            name: 'Parent Id 32 (Child of Parent 30)',
            children: [
              {
                id: 40,
                name: 'Parent Id 40 (Child of Parent 32)',
                children: [
                  {
                    id: 41,
                    name: 'Parent Id 41 (Child of Parent 40)',
                  },
                  {
                    id: 42,
                    name: 'Parent Id 42 (Child of Parent 40)',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const App = () => {
  const [dataList, setDataList] = useState([...sampleData]);
  const [selectedIds, setSelectedIds] = useState([1, 11, 2]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [flattenedTreeData, setFlattenedTreeData] = useState([]);

  const handleCheckTreeItem = (
    selectedItemIds,
    selectedItems,
    flattenedTreeData
  ) => {
    setSelectedIds(selectedItemIds);
    setSelectedItems(selectedItems);
    setFlattenedTreeData(flattenedTreeData);
    console.log('selectedItemIds: ', selectedItemIds);
    console.log('selectedItems: ', selectedItems);
    console.log('flattenedTreeData: ', flattenedTreeData);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            <TreeViewCheckBox
              data={dataList}
              onCheck={handleCheckTreeItem}
              idField="id"
              nameField="name"
              childrenFieldName="children"
              selectedIds={selectedIds}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: 15 }}>
            <h4>Tree Information</h4>
            <h5>Selected Ids</h5>
            <div>{selectedIds.map((x) => x).join(', ')}</div>

            <h5>Selected Items</h5>
            <ul>
              {selectedItems.map((x) => {
                return (
                  <li key={x.id}>
                    Id: {x.id} - Name: {x.name}
                  </li>
                );
              })}
            </ul>

            <h5>Flattened Data</h5>
            <ul>
              {flattenedTreeData.map((x) => {
                return <li key={x.id}>{JSON.stringify(x)}</li>;
              })}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
