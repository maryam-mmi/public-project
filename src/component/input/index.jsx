import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core'

const styles = {
    custom: {
        width: '200px'
    }
}
function InputComponent(props) {

    const { classes, label, type, name, placeholder, error, helperText, value, onChange, onBlur } = props;
    return (
        <div>
            <TextField
                className={classes.custom}
                label={label}
                type={type}
                name={name}
                placeholder={placeholder}
                required
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={error}
                helperText={helperText} />
        </div>
    );
}

InputComponent.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.bool
}

export default withStyles(styles)(InputComponent);