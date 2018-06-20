import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm,Field} from 'redux-form';

import {validateAuth} from '../../utils/validate';
import classes from '../../hoc/Auth/index.sass';
import {resetPassword} from '../../actions';

import Button from '../UI/Button/index';
import AuthInput from '../UI/AuthInput/index';
import Auth from '../../hoc/Auth';

import MailIcon from '../../assets/icons/envelope.svg';

const ResetPassword = ({onResetPassword,handleSubmit,resetPasswordNotification}) => (
  <Auth>
    <div className={classes.head}>
      <h1 className={classes.title}>Восстановление пароля</h1>
    </div>
    <form className={classes.form} onSubmit={handleSubmit(onResetPassword)}>
      <h4 className={classes.resetPasswordTitle}>Забыли пароль?</h4>
      <p className={classes.resetPasswordText}>Ничего страшного, введите свой e-mail, и мы вышлем вам инструкции по востановлению пароля</p>
      <Field
        Icon={MailIcon}
        name="email"
        component={AuthInput}
        type="email"
        resetPassword
        placeholder="Электронная почта"
      />
      {resetPasswordNotification
      && <div
        className={resetPasswordNotification.error
          ? classes.error
          : classes.notification}
      >
        {resetPasswordNotification.error ? resetPasswordNotification.error : resetPasswordNotification}
      </div>
      }
      <div className={classes.controls}>
        <Button fluid>Восстановить пароль</Button>
        <div className={classes.links}>Вспомнили пароль? <Link to="/">Войти</Link></div>
      </div>
    </form>
  </Auth>
);

const mapStateToProps = state => ({
  resetPasswordNotification: state.auth.get('resetPasswordNotification'),
  resetError: state.auth.get('resetError')
});

const mapDispatchToProps = dispatch => ({
  onResetPassword: (data) => dispatch(resetPassword(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    form: 'resetPassword',
    validate: validateAuth,
    destroyOnUnmount: false
  })(ResetPassword)
);