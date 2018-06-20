import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './index.sass';

import {getCurrentUser,getAlbums,getNewsByIds} from '../../selectors';
import {setSearchQuery,fetchNews} from '../../actions';

import ProfileHeader from '../../components/ProfileHeader';
import Search from '../../components/Search';
import NewImagesList from '../../components/NewImagesList';
import AlbumList from '../../components/AlbumList';
import AddAlbum from '../AddAlbum';
import Layout from '../../hoc/Layout';
import Header from '../../hoc/Header';
import ProfileEdit from '../ProfileEdit';
import Spinner from '../../components/UI/Spinner';
import Title from '../../components/UI/Title';
import ImageSlider from '../../components/ImageSlider';

class Profile extends Component {
  state = {
    shownEditProfile: false,
    shownCreateAlbum: false,
    shownNewsSlider: false,
    activeNewsIndex: 0,
    offset: 0
  };
  componentDidMount() {
    this.props.onFetchNews(this.state.offset);
  };
  loadMoreNewsHandler = () => {
    this.props.onFetchNews(this.state.offset + 3);
    this.setState({
      ...this.state,
      offset: this.state.offset + 3
    });
  }
  hideImageSliderHandler = () => {
    this.setState({
      ...this.state,
      shownNewsSlider: false
    });
  };
  showSliderHandler = (index) => {
    this.setState({
      ...this.state,
      shownNewsSlider: true,
      activeNewsIndex: index
    });
  };
  toggleCreateAlbumHandler = () => {
    this.setState({
      ...this.state,
      shownCreateAlbum: !this.state.shownCreateAlbum
    });
  };
  toggleEditProfileHandler = () => {
    this.setState({
      ...this.state,
      shownEditProfile: !this.state.shownEditProfile
    });
  };
  searchHandler = ({query}) => {
    if(query !== '') {
      this.props.onSetSearchQuery(query);
      this.props.history.push(`/search`);
    }
  };
  render() {
    const {user,albums,news} = this.props;
    let content = <Spinner center color="blue" fullHeight/>;
    if(this.state.shownNewsSlider) {
      content = <ImageSlider
        initialSlide={this.state.activeNewsIndex}
        close={this.hideImageSliderHandler}
        images={this.props.news}
        username={user.get('username')}
        avatar={user.get('username')}
      />
    }
    else if(this.state.shownEditProfile) {
      content = <ProfileEdit
        hide={this.toggleEditProfileHandler}
      />
    }
    else if(this.state.shownCreateAlbum) {
      content = <AddAlbum
        hideCreateAlbum={this.toggleCreateAlbumHandler}
        saveAlbum={this.saveAlbumHandler}
      />
    }
    else if(user && albums) {
      content = (
        <Layout footerBg={user.get('backgroundUrl')}>
          <Header src={user.get('backgroundUrl')}>
            <ProfileHeader editable user={user} handleEditMode={this.toggleEditProfileHandler}/>
          </Header>
          <section className={classes.search}>
            <div className={classes.searchContainer}>
              <Search
                onSearch={this.searchHandler}
              />
            </div>
          </section>
          <NewImagesList
            showSlider={this.showSliderHandler}
            news={news}
            loadMore={this.loadMoreNewsHandler}
            all={news.size >= this.props.size}
          >
            <Title>Новое в мире</Title>
          </NewImagesList>
          <AlbumList
            editable
            own
            author={user}
            showCreateAlbum={this.toggleCreateAlbumHandler}
            albums={albums}
          >
            <Title>Мои альбомы</Title>
          </AlbumList>
        </Layout>
      );
    }
    return content;
  }
}

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  albums: getAlbums(state,getCurrentUser),
  news: getNewsByIds(state),
  size: state.news.get('size')
});

const mapDispatchToProps = dispatch => ({
  onSetSearchQuery: (query) => dispatch(setSearchQuery(query)),
  onFetchNews: (offset) => dispatch(fetchNews(offset))
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
