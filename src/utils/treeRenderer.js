import React from 'react';
import TreeCheckBoxItem from '../components/TreeCheckBoxItem';

export const renderTree = (dataSource, handleChange) => {
  return dataSource?.map((item) => {
    const { children, ...commonProps } = item;

    if (children?.length) {
      return (
        <TreeCheckBoxItem {...commonProps} key={commonProps.id} onChange={handleChange}>
          {renderTree(children, handleChange)}
        </TreeCheckBoxItem>
      );
    }

    return <TreeCheckBoxItem {...commonProps} key={commonProps.id} onChange={handleChange} />;
  });
};
