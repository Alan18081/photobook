import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm,Field} from 'redux-form';

import classes from './index.sass';
import {loadImage} from '../../utils/loadImage';
import {validateAlbum} from '../../utils/validate';
import {createAlbum} from '../../actions/index';

import Panel from '../../components/UI/Panel/index';
import Controls from '../../components/UI/Controls/index';
import FormItem from '../../components/FormItem/index';
import FormItemImage from '../../components/FormItemImage/index';

class AddAlbum extends Component {
  state = {
    albumImageSrc: '',
    albumImageError: ''
  };
  changeAlbumImageHandler = async (event) => {
    const file = event.target.files[0];
    const src = await loadImage(file);
    if(file.size > 1024000) {
      this.setState({
        albumImageSrc: src,
        albumImageError: 'Файл слишком большой'
      });
    }
    else {
      this.setState({
        albumImageSrc: src,
        albumImageError: null
      });
      this.props.change('background',file);
    }
  };
  showValues = (values) => {
    if(values.background) {
      this.props.onCreateAlbum(values);
      this.props.hideCreateAlbum();
    }
    else {
      this.setState({
        ...this.state,
        albumImageError: 'Выберите фон для альбома'
      })
    }
  };
  render() {
    const {handleSubmit,hideCreateAlbum} = this.props;
    return (
      <Panel title="Добавить альбом" close={hideCreateAlbum}>
        <form
          onSubmit={handleSubmit(this.showValues)}
          className={classes.form}
        >
          <div className={classes.body}>
            <Field name="name" component={FormItem} caption="Название"/>
            <Field name="description" component={FormItem} caption="Описание" type="textarea"/>
            <FormItemImage
              maxSize={1024}
              error={this.state.albumImageError}
              btnText="Загрузить фон"
              src={this.state.albumImageSrc || 'https://res.cloudinary.com/dkvyhy1hr/image/upload/v1529502028/no_photo.jpg'}
              changed={this.changeAlbumImageHandler}
            />
          </div>
          <Controls
            cancel={hideCreateAlbum}
            loading={this.props.loading}
          />
        </form>
      </Panel>
    );
  }
}

const mapStateToProps = ({albums}) => ({
  loading: albums.get('addAlbumLoading')
});

const mapDispatchToProps = dispatch => ({
  onCreateAlbum: (albumInfo) => dispatch(createAlbum(albumInfo))
});

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
  form: 'album',
  validate: validateAlbum
})(AddAlbum));