import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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

  const handleCheckTreeItem = (
    selectedItemIds,
    selectedItems,
    flattenedTreeData
  ) => {
    setSelectedIds(selectedItemIds);
    console.log('selectedItemIds: ', selectedItemIds);
    console.log('selectedItems: ', selectedItems);
    console.log('flattenedTreeData: ', flattenedTreeData);
  };

  const style = {
    textAlign: 'center',
  };

  return (
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
        <Paper>
          <h4>Tree Information</h4>
        </Paper>
      </Grid>
    </Grid>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
