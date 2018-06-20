import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {reduxForm,Field} from 'redux-form';

import classes from './index.sass';
import {validateAlbum} from '../../utils/validate';
import {loadImage} from '../../utils/loadImage';
import {deleteAlbum,editAlbum} from '../../actions';

import Panel from '../../components/UI/Panel/index';
import Controls from '../../components/UI/Controls/index';
import FormItem from '../../components/FormItem/index';
import FormItemImage from '../../components/FormItemImage/index';
import Modal from '../../components/UI/Modal';
import Confirm from '../../components/Confirm';
import Notification from '../../components/UI/Notification';

class AlbumEdit extends Component {
  state = {
    albumImageSrc: '',
    deleteModal: false,
    shownRemovedModal: false
  };
  showRemovedInfoModal = () => {
    this.setState({
      ...this.state,
      shownRemovedModal: true
    });
  };
  changeAlbumImageHandler = async (event) => {
    const file = event.target.files[0];
    const src = await loadImage(file);
    this.setState({
      ...this.state,
      albumImageSrc: src
    });
    this.props.change('background',file);
  };
  toggleDeleteModal = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      deleteModal: !this.state.deleteModal
    })
  };
  saveAlbumHandler = (values) => {
    this.props.onSaveAlbum(this.props.album.get('_id'),values);
    this.props.hideEditAlbum();
  };
  deleteAlbumHandler = (event) => {
    this.props.onDeleteAlbum(this.props.album.get('_id'));
    this.toggleDeleteModal(event);
    this.showRemovedInfoModal();
    setTimeout(this.toProfilePage,4000);
  };
  toProfilePage = () => {
    this.props.history.push('/');
  };
  render() {
    const {handleSubmit,defaultBackground,hideEditAlbum} = this.props;
    return (
      <div>
        {this.state.deleteModal
          ? <Modal title="Удаление альбома" head hide={this.toggleDeleteModal}>
              <Confirm
                question="Вы хотите удалить альбом?"
                agree={this.deleteAlbumHandler}
                cancel={this.toggleDeleteModal}
              />
            </Modal>
          : null}
        {this.state.shownRemovedModal
          ? <Modal>
              <Notification
                title="Альбом успешно удален"
                close={this.toProfilePage}
                btn="На главную"
              />
          </Modal> : null
        }
        <Panel title="Редактировать альбом" close={hideEditAlbum}>
          <form
            onSubmit={handleSubmit(this.saveAlbumHandler)}
            className={classes.form}
          >
            <div className={classes.body}>
              <Field name="name" component={FormItem} caption="Название"/>
              <Field name="description" component={FormItem} caption="Описание" type="textarea"/>
              <FormItemImage
                btnText="Загрузить фон"
                maxSize={1024}
                src={this.state.albumImageSrc || `/uploads/${defaultBackground}`}
                changed={this.changeAlbumImageHandler}
              />
            </div>
            <Controls
              remove={this.toggleDeleteModal}
              cancel={hideEditAlbum}
              loading={this.props.loading}
            />
          </form>
        </Panel>
      </div>

    );
  }
}

const mapStateToProps = ({albums}) => ({
  loading: albums.get('addAlbumLoading'),
  initialValues: albums.get('activeAlbum').toJS()
});

const mapDispatchToProps = dispatch => ({
  onSaveAlbum: (id,albumInfo) => dispatch(editAlbum(id,albumInfo)),
  onDeleteAlbum: (id) => dispatch(deleteAlbum(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
  form: 'album',
  validate: validateAlbum
})(withRouter(AlbumEdit)));