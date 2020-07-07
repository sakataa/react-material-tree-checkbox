import React from 'react';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const TreeCheckBoxItem = props => {
  const { id, name, checked, onChange, ...otherProps } = props;

  return (
    <TreeItem
      {...otherProps}
      nodeId={`${id}`}
      label={<FormControlLabel control={<Checkbox checked={!!checked} name={id} color="primary" />} label={name} />}
      onLabelClick={event => {
        onChange({ target: { id, name, checked: !checked } });
        event.preventDefault();
      }}
    />
  );
};

TreeCheckBoxItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

TreeCheckBoxItem.defaultProps = {
  checked: false,
};

export default TreeCheckBoxItem;
