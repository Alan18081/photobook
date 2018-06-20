import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getCurrentUser} from '../../selectors';
import {getAlbum,getActiveImage} from '../../actions';

import classes from './index.sass';

import AlbumHeader from '../../components/AlbumHeader';
import AlbumEdit from '../AlbumEdit';
import Stats from '../../components/Stats';
import Layout from '../../hoc/Layout';
import ImagesList from '../../components/ImageList';
import SlideBtn from '../../components/UI/SlideBtn';
import ImageSlider from '../../components/ImageSlider';
import LoadImages from '../LoadImages';
import Modal from '../../components/UI/Modal';
import Header from '../../hoc/Header';
import Spinner from '../../components/UI/Spinner';
import Notification from '../../components/UI/Notification';
import EditImages from '../../components/EditImage';

import AddIcon from '../../assets/icons/add.svg';

class AlbumPage extends Component {
  state = {
    albumBgSrc: '',
    editMode: false,
    shownEditImage: false,
    shownDeletedModal: false,
    shownLoadedModal: false,
    shownImageSlider: false,
    activeImageIndex: 0,
    shownImagesLoader: false
  };
  componentDidMount() {
    const id = this.props.match.params.albumId;
    this.props.onGetAlbum(id);
  }
  showDeletedModalHandler = () => {
    this.setState({
      ...this.state,
      shownDeleteModal: !this.state.shownDeletedModal
    });
  };
  hideImageSliderHandler = () => {
    this.setState({
      ...this.state,
      shownImageSlider: false
    });
  };
  handleEditModeHandler = () => {
    this.setState({
      ...this.state,
      editMode: !this.state.editMode
    });
  };
  changeBgHandler = (src) => {
    this.setState({
      ...this.state,
      albumBgSrc: src
    })
  };
  showSliderHandler = (index) => {
    this.setState({
      ...this.state,
      shownImageSlider: true,
      activeImageIndex: index
    });
  };
  toggleImagesLoaderHandler = () => {
    this.setState({
      ...this.state,
      shownImagesLoader: !this.state.shownImagesLoader
    });
  };
  toggleEditImageHandler = () => {
    this.setState({
      ...this.state,
      shownEditImage: !this.state.shownEditImage
    });
  };
  getActiveImageHandler = (albumId,imageId) => {
    this.props.onGetActiveImage(albumId,imageId);
    this.toggleEditImageHandler();
  };
  render() {
    const {user,album,editable} = this.props;
    let content = null;
    if(!user || !album) {
      content = (
        <Spinner center color="blue" fullHeight/>
      );
    }
    else if(this.state.shownDeletedModal) {
      content = (<Notification
        title="Альбом успешно удален"
        btn="На главную"
        close={() => this.props.history.push('/')}
      />);
    }
    else if(this.state.editMode) {
      content = <AlbumEdit
        album={album}
        hideEditAlbum={this.handleEditModeHandler}
        defaultBackground={this.props.album && this.props.album.get('background')}
        showDelModal={this.showDeletedModalHandler}
      />
    }
    else {
      content = (
        <Layout footerBg={this.state.backgroundSrc || album ? `/uploads/${album.get('background')}` : ''}>
          {this.state.shownImagesLoader
            ? (
              <Modal head title="Добавить фотографию" hide={this.toggleImagesLoaderHandler}>
                <LoadImages album={album}/>
              </Modal>
            )
            : null
          }
          {this.state.shownEditImage
            ? (
              <Modal head title="Редактировать фотографию" hide={this.toggleEditImageHandler}>
                <EditImages
                  album={album}
                  hideEditImage={this.toggleEditImageHandler}
                />
              </Modal>
            )
            : null
          }
          <SlideBtn
            hoverClass={classes.addImagesBtn}
            Icon={AddIcon}
            clicked={this.toggleImagesLoaderHandler}
          >Загрузить</SlideBtn>
          <Header src={this.state.albumBgSrc || album ? `/uploads/${album.get('background')}` : ''}>
            <AlbumHeader
              editable={editable}
              avatar={user.get('avatar')}
              username={user.get('username')}
              handleEditMode={this.handleEditModeHandler}
              name={album.get('name')}
              description={album.get('description')}
            />
            <Stats
              photos={album.get('images').size}
              likes={album.get('likesNumber')}
              comments={album.get('commentsNumber')}
            />
          </Header>
          {album ? <ImagesList
            showSlider={this.showSliderHandler}
            images={album.get('images')}
            editImage={this.getActiveImageHandler}
            album={album}
          /> : null}
        </Layout>
      );
    }
    if(this.state.shownImageSlider) {
      content = (
        <ImageSlider
          initialSlide={this.state.activeImageIndex}
          close={this.hideImageSliderHandler}
          images={album.get('images')}
          username={user.get('username')}
          avatar={user.get('username')}
        />
      );
    }
    return content;
  }
}

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  album: state.albums.get('activeAlbum')
});

const mapDispatchToProps = dispatch => ({
  onGetAlbum: (id) => dispatch(getAlbum(id)),
  onGetActiveImage: (albumId,imageId) => dispatch(getActiveImage(albumId,imageId))
});

export default connect(mapStateToProps,mapDispatchToProps)(AlbumPage);