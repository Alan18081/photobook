import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm,Field} from 'redux-form';

import classes from '../../containers/AddAlbum/index.sass';
import {validateAlbum} from '../../utils/validate';
import {editImage,deleteImage} from '../../actions';

import Controls from '../UI/Controls/index';
import FormItem from '../FormItem/index';
import Confirm from '../Confirm';

class EditImages extends Component {
  state = {
    shownDeletedModal: false
  };
  toggleDeletedModalHandler = () => {
    this.setState({
      shownDeletedModal: !this.state.shownDeletedModal
    })
  };
  editImageHandler = (values) => {
    this.props.onEditImage(this.props.initialValues._id,values);
    this.props.hideEditImage();
  };
  deleteImageHandler = () => {
    this.props.onDeleteImage(this.props.album.get('_id'),this.props.initialValues._id);
    this.toggleDeletedModalHandler();
    this.props.hideEditImage();
  };
  render() {
    const {handleSubmit, hideEditImage} = this.props;
    return (
      <div>
        {this.state.shownDeletedModal
          ? <Confirm
              question="Вы точно хотите удалить это фото?"
              agree={this.deleteImageHandler}
              cancel={this.toggleDeletedModalHandler}
          />
          : <form
            onSubmit={handleSubmit(this.editImageHandler)}
            className={classes.form}
          >
            <div className={classes.body}>
              <Field name="name" component={FormItem} caption="Название"/>
              <Field name="description" component={FormItem} caption="Описание" type="textarea"/>
            </div>
            <Controls
              remove={this.toggleDeletedModalHandler}
              cancel={hideEditImage}
            />
          </form>
        }
      </div>
    );
  }
}

const mapStateToProps = ({images}) => ({
  initialValues: images.get('activeImage').toJS()
});

const mapDispatchToProps = dispatch => ({
  onEditImage: (albumId,imageId,info) => dispatch(editImage(albumId,imageId,info)),
  onDeleteImage: (albumId,imageId) => dispatch(deleteImage(albumId,imageId))
});

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
  form: 'album',
  validate: validateAlbum
})(EditImages));