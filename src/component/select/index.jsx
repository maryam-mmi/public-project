import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@material-ui/core'

const styles = {
    custom: {
        width: '200px',
        textAlign: 'left',
    },
}

function SelectComponent(props) {

    const { classes, label, name, list, error, value, onChange, onBlur } = props;
    return (
        <div>
            <FormControl className={classes.custom} required>
                <InputLabel>Country</InputLabel>
                <Select
                    required
                    label={label}
                    name={name}
                    value={value}
                    error={error}
                    onChange={onChange}
                    onBlur={onBlur}>
                    {list.map((item) =>
                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                    )}
                </Select>
                <FormHelperText></FormHelperText>
            </FormControl>
        </div>
    );
}


SelectComponent.propTypes = {
    lable: PropTypes.string,
    name: PropTypes.string,
    list: PropTypes.array.isRequired,
}

export default withStyles(styles)(SelectComponent);