import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm,Field,SubmissionError} from 'redux-form';

import classes from '../../hoc/Auth/index.sass';
import {validateResetPassword} from '../../utils/validate';
import {setNewPassword} from '../../actions';

import AuthInput from '../../components/UI/AuthInput';
import Button from '../../components/UI/Button';

import Auth from '../../hoc/Auth';

import PasswordIcon from '../../assets/icons/password.svg';

const newPassword = ({handleSubmit,onSetNewPassword,match,error,setNewPasswordError,isNewPasswordSet}) => {
  const newPasswordHandler = ({password,confirmPassword}) => {
    if(password === confirmPassword) {
      onSetNewPassword(password,match.params.token);
    }
    else {
      throw new SubmissionError({
        _error: 'Пароли не совпадают'
      })
    }
  };
  return (
    <Auth>
      <div className={classes.head}>
        <h1 className={classes.title}>Новый пароль</h1>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(newPasswordHandler)}>
        <Field
          Icon={PasswordIcon}
          name="password"
          component={AuthInput}
          type="password"
          placeholder="Пароль"
        />
        <Field
          Icon={PasswordIcon}
          name="confirmPassword"
          component={AuthInput}
          type="password"
          placeholder="Подтвердите пароль"
        />
        {error && <div className={classes.error}>{error}</div>}
        {setNewPasswordError && <div className={classes.error}>{setNewPasswordError}</div>}
        {isNewPasswordSet && <div className={classes.notification}>Пароль успешно обновлен</div>}
        <div className={classes.controls}>
          <Button fluid>Обновить пароль</Button>
          <div className={classes.links}><Link to="/">Войти</Link></div>
        </div>
      </form>
    </Auth>
  )
};

const mapStateToProps = state => ({
  setNewPasswordError: state.auth.get('setNewPasswordError'),
  isNewPasswordSet: state.auth.get('isNewPasswordSet')
});

const mapDispatchToProps = dispatch => ({
  onSetNewPassword: (password,token) => dispatch(setNewPassword(password,token))
});

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    form: 'setNewPassword',
    validate: validateResetPassword
  })(newPassword)
);