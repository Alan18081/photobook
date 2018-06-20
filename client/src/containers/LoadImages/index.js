import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './index.sass';
import {loadImage} from '../../utils/loadImage';
import {loadImages} from '../../actions';

import CameraIcon from '../../assets/icons/cam.svg';
import CloseIcon from '../../assets/icons/close.svg';

import Controls from '../../components/UI/Controls';
import Notification from '../../components/UI/Notification';

class LoadImages extends Component {
  state = {
    loadedImages: [],
    loadedSrc: [],
    errorSrc: [],
    shownLoadedModal: false,
  };
  input;
  toggleLoadedModalHandler = () => {
    this.setState({
      ...this.state,
      shownLoadedModal: !this.state.shownLoadedModal
    });
  };
  removeLoadedImageHandler = (i) => {
    const updatedSrc = [...this.state.loadedSrc];
    const updatedImages = [...this.state.loadedImages];
    updatedSrc.splice(i,1);
    updatedImages.splice(i,1);
    this.setState({
      loadedImages: updatedImages,
      loadedSrc: updatedSrc
    });
  };
  changeInputHandler = async (event) => {
    const files = event.target.files;
    const srcArray = [];
    const errorSrc = [];
    for(let file of files) {
      const src = await loadImage(file);
      if(file.size > 1024000) {
        errorSrc.push(src);
      }
      else {
        srcArray.push(src);
      }
    }
    this.setState({
      loadedImages: files,
      loadedSrc: srcArray,
      errorSrc
    });
  };
  loadImagesHandler = () => {
    const id = this.props.album.get('_id');
    const images = [...this.state.loadedImages];
    this.input.value = '';
    this.props.onLoadImages(id,images,this.props.close);
    this.setState({
      ...this.state,
      loadedImages: [],
      loadedSrc: []
    });
    console.log('Hello');
    this.toggleLoadedModalHandler();
  };
  render() {
    const {album} = this.props;
    let loaderContent = (
      <div className={classes.loaderCaption}>
        <CameraIcon className={classes.loaderIcon}/>
        <p className={classes.loaderText}>
          Перетащите файл сюда или <span className={classes.loaderTrigger} onClick={this.triggerInput}>выберите файл</span>
        </p>
      </div>
    );
    if(this.state.loadedSrc.length > 0) {
      loaderContent = (
        <ul className={classes.loadedList}>
          {this.state.loadedSrc.map((src,i) => (
            <li key={src} className={classes.loadedItem}>
              <div className={classes.loadedImgWrapper}>
                <img src={src} className={classes.loadedImg} alt="Фото"/>
              </div>
              <div className={classes.loadedItemClose} onClick={() => this.removeLoadedImageHandler(i)}>
                <CloseIcon className={classes.loadedItemIcon}/>
              </div>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className={classes.container}>
        {this.state.shownLoadedModal ? <Notification
          title={
            this.state.loadedImages.length > 1
              ? 'Фотографии успешно загружены'
              : 'Фотография успешно загружена'
          }
          btn="Закрыть"
          close={this.toggleLoadedModalHandler}
        /> : null}
        <div className={classes.content}>
          <div className={classes.head}>
            <div className={classes.title}>Альбом</div>
            <div className={classes.albumName}>{album.get('name')}</div>
          </div>
          <div className={classes.loader}>
            <input onChange={this.changeInputHandler} ref={item => this.input = item} type="file" className={classes.loaderInput} multiple/>
            {loaderContent}
          </div>
        </div>
        <Controls
          save={this.loadImagesHandler}
          cancel={this.props.close}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onLoadImages: (id,files,cb) => dispatch(loadImages(id,files,cb))
});

export default connect(null,mapDispatchToProps)(LoadImages);