import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './index.sass';

import adjustStats from '../../utils/adjustStats';
import {getActiveUser,getAlbums} from '../../selectors';
import {fetchUser,findUserAlbum,resetUserSearch} from '../../actions';

import ProfileHeader from '../../components/ProfileHeader';
import Layout from '../../hoc/Layout';
import Search from '../../components/Search';
import AlbumList from '../../components/AlbumList';
import Header from '../../hoc/Header';
import Spinner from '../../components/UI/Spinner';
import Title from '../../components/UI/Title';

class UserPage extends Component {
  componentDidMount() {
    this.props.onFetchUser(this.props.match.params.id);
  }
  searchHandler = ({query}) => {
    this.props.onFindUserAlbum(query || '');
  };
  render() {
    const {user,albums,foundAlbums} = this.props;
    let content = <Spinner center color="blue" fullHeight/>;
    if(user && albums) {
      content = (
        <Layout footerBg={`/uploads/${user.get('background')}`}>
          <Header src={`/uploads/${user.get('background')}`}>
            <ProfileHeader user={user}/>
          </Header>
          <section className={classes.search}>
            <div className={classes.searchContainer}>
              <div className={classes.resetBtn} onClick={this.props.onResetUserSearch}>Все альбомы</div>
              <Search
                onSearch={this.searchHandler}
              />
            </div>
          </section>
          <AlbumList
            author={user}
            albums={foundAlbums ? foundAlbums : albums}
          >
            {foundAlbums
              ? <h3 className={classes.stats}>
                  {foundAlbums.size > 0
                    ? adjustStats(foundAlbums.size,this.props.query)
                    : `По запросу "${this.props.query}" ничего не найдено`
                  }
                </h3>
              : <Title>Альбомы</Title>
            }
          </AlbumList>
        </Layout>
      );
    }
    return content;
  }
}

const mapStateToProps = state => ({
  user: getActiveUser(state),
  albums: getAlbums(state,getActiveUser)
});

const mapDispatchToProps = dispatch => ({
  onFetchUser: (id) => dispatch(fetchUser(id)),
  onFindUserAlbum: (query) => dispatch(findUserAlbum(query)),
  onResetUserSearch: () => dispatch(resetUserSearch())
});

export default connect(mapStateToProps,mapDispatchToProps)(UserPage);