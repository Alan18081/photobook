import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm,Field} from 'redux-form';

import classes from './index.sass';
import {saveProfile} from '../../actions/index';
import {getCurrentUser} from '../../selectors';

import Controls from '../../components/UI/Controls';
import Panel from '../../components/UI/Panel';
import FormItem from '../../components/FormItem';
import FormItemImage from '../../components/FormItemImage';

import {loadImage} from '../../utils/loadImage';

class ProfileEdit extends Component {
  state = {
    backgroundSrc: '',
    avatarSrc: '',
    avatarError: '',
    backgroundError: ''
  };
  changeAvatarHandler = async (event) => {
    const file = event.target.files[0];
    const src = await loadImage(file);
    if(file.size > 512000) {
      this.setState({
        avatarSrc: src,
        avatarError: 'Аватар слишком большой'
      });
    }
    else {
      this.setState({
        avatarSrc: src,
        avatarError: null
      });
      this.props.change('avatar',file);
    }
  };
  changeBackgroundHandler = async (event) => {
    const file = event.target.files[0];
    const src = await loadImage(file);
    if(file.size > 1024000) {
      this.setState({
        backgroundSrc: src,
        backgroundError: 'Фон слишком большой'
      });
    }
    else {
      this.setState({
        backgroundSrc: src,
        backgroundError: null
      });
      this.props.change('background',file);
    }
  };
  saveProfileHandler = (values) => {
    this.props.onSaveProfile(values);
    this.props.hide();
  };
  render() {
    const {
      handleSubmit,
      hide,
      initialValues
    } = this.props;
    return (
      <Panel title="Редактирование профиля" close={hide}>
        <form onSubmit={handleSubmit(this.saveProfileHandler)} className={classes.form}>
          <div className={classes.main}>
            <Field name="username" component={FormItem} caption="Имя"/>
            <Field name="description" component={FormItem} caption="О себе" type="textarea"/>
            <FormItemImage
              error={this.state.avatarError}
              btnText="Загрузить аватар"
              maxSize={512}
              src={this.state.avatarSrc || `/uploads/${initialValues.avatar}`}
              changed={this.changeAvatarHandler}
            />
            <FormItemImage
              error={this.state.backgroundError}
              btnText="Загрузить фон"
              maxSize={1024}
              src={this.state.backgroundSrc || `/uploads/${initialValues.background}`}
              changed={this.changeBackgroundHandler}
            />
          </div>
          <div className={classes.links}>
            <Field name="vk" caption="Вконтакте" component={FormItem}/>
            <Field name="facebook" caption="Facebook" component={FormItem}/>
            <Field name="twitter" caption="Twitter" component={FormItem}/>
            <Field name="google" caption="Google+" component={FormItem}/>
            <Field name="email" caption="Email" component={FormItem}/>
          </div>
          <Controls
            cancel={hide}
          />
        </form>
      </Panel>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: getCurrentUser(state).toJS()
});

const mapDispatchToProps = dispatch => ({
  onSaveProfile: (values) => dispatch(saveProfile(values))
});

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    form: 'profile'
  })(ProfileEdit)
);