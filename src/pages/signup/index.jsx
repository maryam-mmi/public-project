import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userDataActions from "../../redux/actions/userDataActions";
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Input from '../../component/input';
import Select from '../../component/select';

//const SwedishIDRegExp = RegExp(/^(((20)((0[0-9])|(1[0-1])))|(([1][^0-8])?\d{2}))((0[1-9])|1[0-2])((0[1-9])|(2[0-9])|(3[01]))[-]?\d{4}$/);
const mobileRegExp = RegExp(/^^(?:0|\(?\+46\)?\s?|0046\s?)[1-79](?:[\s]?\d\d){4}$/);
const emailRegExp = RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    custom: {
        height: '350px',
        width: '350px',
        borderRadius: '16px',
        background: 'white',
    },
    form: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
    }
}
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialSecurityNumber: undefined,
            phoneNumber: undefined,
            email: undefined,
            country: undefined,
            formErrors: {
                socialSecurityNumber: false,
                phoneNumber: false,
                email: false,
                country: false,
                ssnErrMessage: ''
            }
        };
    }


    daysInMonth = (m, y) => { // m is 0 indexed: 0-11
        switch (m) {
            case 1:
                return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
            case 8: case 3: case 5: case 10:
                return 30;
            default:
                return 31;
        }
    }

    isValid = (d, m, y) => {
        return m >= 0 && m < 12 && d > 0 && d <= this.daysInMonth(m, y);
    }

    onSSNChange = (e) => {
        e.preventDefault();
        this.setState({
            socialSecurityNumber: e.target.value
        })
    }

    onPNChange = (e) => {
        e.preventDefault();
        this.setState({
            phoneNumber: e.target.value
        })
    }

    onEmailChange = (e) => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }
    onBlur = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'socialSecurityNumber':
                formErrors.socialSecurityNumber =
                    value.length === 10 && this.isValid(value.slice(4,6) * 1, value.slice(2,4) * 1, value.slice(0,2) * 1)
                        ? false
                        : true
                break;
            case 'phoneNumber':
                formErrors.phoneNumber =
                    mobileRegExp.test(value)
                        ? false
                        : true
                break;
            case 'email':
                formErrors.email =
                    emailRegExp.test(value) && value.length > 0
                        ? false
                        : true
                break;
            case 'country':
                formErrors.country =
                    value.length <= 0 || value === ''
                        ? true
                        : false
                break;
            default:
                break;
        }
        this.setState(
            { formErrors, [name]: value }, () => {
            });
    }

    selectCountry = (e) => {
        this.setState({ country: e.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //
    }

    componentDidMount() {
        this.props.userActions.getCountries();
    }

    render() {
        const { socialSecurityNumber, phoneNumber, email, country, formErrors } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root} >
                <div className={classes.custom} >
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <div>
                            <Input
                                label='Social security number'
                                type='number'
                                name='socialSecurityNumber'
                                placeholder="YYMMDDXXXX"
                                value={socialSecurityNumber || ''}
                                onChange={e => this.onSSNChange(e)}
                                onBlur={e => this.onBlur(e)}
                                error={formErrors.socialSecurityNumber}
                                helperText={formErrors.ssnErrMessage}
                                noValidate/>
                            <Input
                                label='Phone number'
                                type='tel'
                                name='phoneNumber'
                                value={phoneNumber || ''}
                                onChange={e => this.onPNChange(e)}
                                onBlur={e => this.onBlur(e)}
                                error={formErrors.phoneNumber}
                                noValidate />
                            <Input
                                label='Email address'
                                type='email'
                                name='email'
                                value={email || ''}
                                onChange={e => this.onEmailChange(e)}
                                onBlur={e => this.onBlur(e)}
                                error={formErrors.email}
                                noValidate
                            />
                            <Select
                                label='Country:'
                                name='country'
                                value={country || ''}
                                onChange={e => this.selectCountry(e)}
                                onBlur={e => this.onBlur(e)}
                                error={formErrors.country}
                                list={this.props.data}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit"
                                value="Submit">
                                Submit
                                </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: (state.user_data) ? state.user_data.entities || [] : ''
        //formNewEntity
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userDataActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Signup));