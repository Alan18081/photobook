import React, {Component} from 'react';

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
import EditImage from '../../components/EditImage';

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
    const {albumId,userId} = this.props.match.params;
    if(this.props.userAlbum) {
      this.props.onFetchUser(userId);
    }
    this.props.onGetAlbum(albumId,this.props.userAlbum);
    this.props.onResetAlbumOffset();
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
  loadMoreHandler = () => {
    this.props.onIncAlbumOffset();
    this.props.onFetchImages(this.props.album.get('_id'));
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
    const {
      user,
      loading,
      album,
      userAlbum,
      images,
      likesNumber,
      commentsNumber
    } = this.props;
    let content = null;
    if(!user || !album || !images) {
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
        defaultBackground={this.props.album && this.props.album.get('backgorundUrl')}
        showDelModal={this.showDeletedModalHandler}
      />
    }
    else {
      content = (
        <Layout footerBg={this.state.backgroundSrc || album ? album.get('backgroundUrl') : ''}>
          {this.state.shownImagesLoader
            ? (
              <Modal head title="Добавить фотографию" hide={this.toggleImagesLoaderHandler}>
                <LoadImages album={album} close={this.toggleImagesLoaderHandler}/>
              </Modal>
            )
            : null
          }
          {this.state.shownEditImage
            ? (
              <Modal head title="Редактировать фотографию" hide={this.toggleEditImageHandler}>
                <EditImage
                  album={album}
                  hideEditImage={this.toggleEditImageHandler}
                />
              </Modal>
            )
            : null
          }
          {userAlbum
            ? null
            : <SlideBtn
                hoverClass={classes.addImagesBtn}
                Icon={AddIcon}
                clicked={this.toggleImagesLoaderHandler}
              >
                Загрузить
              </SlideBtn>
          }
          <Header src={this.state.albumBgSrc || album ? album.get('backgroundUrl') : ''}>
            <AlbumHeader
              editable={!userAlbum}
              avatar={album.get('author').get('avatarUrl')}
              username={album.get('author').get('username')}
              handleEditMode={this.handleEditModeHandler}
              name={album.get('name')}
              description={album.get('description')}
            />
            <Stats
              photos={images && images.size}
              likes={likesNumber}
              comments={commentsNumber}
            />
          </Header>
          {loading
            ? <Spinner center color="blue"/>
            : <ImagesList
                all={this.props.images.size >= this.props.album.get('images').size}
                loadMore={this.loadMoreHandler}
                editable={!userAlbum}
                showSlider={this.showSliderHandler}
                images={images}
                editImage={this.getActiveImageHandler}
                album={album}
              />
          }
        </Layout>
      );
    }
    if(this.state.shownImageSlider) {
      content = (
        <ImageSlider
          userAlbum={this.props.userAlbum}
          initialSlide={this.state.activeImageIndex}
          close={this.hideImageSliderHandler}
          images={images}
          username={user.get('username')}
          avatar={user.get('username')}
          albumId={album.get('_id')}
        />
      );
    }
    return content;
  }
}

// const mapStateToProps = state => ({
//   user: getCurrentUser(state),
//   album: state.albums.get('activeAlbum')
// });
//
// const mapDispatchToProps = dispatch => ({
//   onGetAlbum: (id) => dispatch(getAlbum(id)),
//   onGetActiveImage: (albumId,imageId) => dispatch(getActiveImage(albumId,imageId))
// });
//
// export default connect(mapStateToProps,mapDispatchToProps)(AlbumPage);

export default AlbumPage;