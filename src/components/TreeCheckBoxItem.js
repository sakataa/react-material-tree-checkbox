import React from 'react';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const TreeCheckBoxItem = (props) => {
  const { id, name, checked, level, disabled, onChange, ...otherProps } = props;

  return (
    <TreeItem
      {...otherProps}
      nodeId={`${level}-${id}`}
      label={
        <FormControlLabel
          control={<Checkbox disabled={disabled} checked={!!checked} name={`${level}-${id}`} color="primary" />}
          label={name}
        />
      }
      onLabelClick={(event) => {
        if (!disabled) {
          onChange({ target: { id, name, level, checked: !checked } });
        }

        event.preventDefault();
      }}
    />
  );
};

TreeCheckBoxItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  level: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

TreeCheckBoxItem.defaultProps = {
  checked: false,
  onChange: () => {},
};

export default TreeCheckBoxItem;
