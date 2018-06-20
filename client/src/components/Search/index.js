import React from 'react';
import {connect} from 'react-redux';
import {reduxForm,Field} from 'redux-form';
import {validateSearch} from '../../utils/validate';

import classes from './index.sass';

import SearchIcon from '../../assets/icons/search.svg';

const renderInput = ({input}) => {
 return (
   <div className={classes.field}>
     <SearchIcon className={classes.icon}/>
     <input type="text" placeholder="Исследовать мир" {...input} className={classes.input}/>
   </div>
 );
};

const search = ({handleSubmit,onSearch}) => (
  <form onSubmit={handleSubmit(onSearch)} className={classes.field}>
    <Field name="query" placeholder="Исследовать мир" component={renderInput} className={classes.input}/>
  </form>
);

const mapDispatchToProps = dispatch => ({

});

export default connect(null,mapDispatchToProps)(
  reduxForm({
    form: 'search',
    validate: validateSearch
  })(search)
);