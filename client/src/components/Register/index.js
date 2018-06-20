import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm,Field} from 'redux-form';

import {validateAuth} from '../../utils/validate';
import classes from '../../hoc/Auth/index.sass';
import {register} from '../../actions';

import Button from '../UI/Button/index';
import AuthInput from '../UI/AuthInput/index';
import Auth from '../../hoc/Auth/index';

import UserIcon from '../../assets/icons/name.svg';
import MailIcon from '../../assets/icons/envelope.svg';
import PasswordIcon from '../../assets/icons/password.svg';

const renderErrors = (errors) => errors.map(error => (
  <div className={classes.error} key={error.error}>{error.error}</div>
));

const Register = ({onRegister,handleSubmit,registerErrors,showLogin}) => (
  <Auth>
    <div className={classes.head}>
      <h1 className={classes.title}>Регистрация</h1>
    </div>
    <form className={classes.form} onSubmit={handleSubmit(onRegister)}>
      <Field
        Icon={UserIcon}
        name="username"
        component={AuthInput}
        type="text"
        placeholder="Имя"
      />
      <Field
        Icon={MailIcon}
        name="email"
        component={AuthInput}
        type="email"
        placeholder="Электронная почта"
      />
      <Field
        Icon={PasswordIcon}
        name="password"
        component={AuthInput}
        type="password"
        placeholder="Пароль"
      />
      <div className={classes.controls}>
        <div className={classes.info}>Ваши данные остаются строго конфиденциальны</div>
        {registerErrors.size ? renderErrors(registerErrors) : null}
        <Button fluid>Создать аккаунт</Button>
        <div className={classes.links}>Уже зарегистрированы? <Link to="/" onClick={showLogin}>Войти</Link></div>
      </div>
    </form>
  </Auth>
);

const mapStateToProps = state => ({
  registerErrors: state.auth.get('registerErrors')
});

const mapDispatchToProps = dispatch => ({
  onRegister: (userInfo) => dispatch(register(userInfo))
});

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    form: 'register',
    validate: validateAuth,
    destroyOnUnmount: false
  })(Register)
);