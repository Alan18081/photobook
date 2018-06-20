import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import classes from './index.sass';
import adjustStats from '../../utils/adjustStats';
import {getCurrentUser,getSearchResults} from '../../selectors';
import {fetchSearchResults,setSearchQuery} from '../../actions';

import HomeIcon from '../../assets/icons/home.svg';

import Title from '../../components/UI/Title';
import UserBlock from '../../components/UserBlock';
import SlideBtn from '../../components/UI/SlideBtn';
import Search from '../../components/Search';
import NewImagesList from '../../components/NewImagesList';
import Spinner from '../../components/UI/Spinner';
import ImageSlider from '../../components/ImageSlider';

class ResultsPage extends Component {
  state = {
    activeImageIndex: 0,
    shownImageSlider: false
  };
  componentDidMount() {
    this.props.onFetchSearchResults(this.props.query);
  }
  searchHandler = ({query}) => {
    if(query !== '') {
      this.props.onSetSearchQuery(query);
      this.props.onFetchSearchResults(query);
    }
  };
  showSliderHandler = (index) => {
    this.setState({
      ...this.state,
      shownImageSlider: true,
      activeImageIndex: index
    });
  };
  hideSliderHandler = () => {
    this.setState({
      ...this.state,
      shownImageSlider: false
    });
  };
  loadNews = () => {
    this.props.onSetSearchQuery('all');
    this.props.onFetchSearchResults();
  };
  render() {
    const {user,results,loading} = this.props;
    let list = null;
    if(loading) {
      list = <Spinner center color="blue" fullHeight/>
    }
    else {
      list = (
        <NewImagesList
          all
          showSlider={this.showSliderHandler}
          news={results}
        >
          {this.props.query !== 'all'
            ? <h2 className={classes.stats}>
              { results.size > 0
                ? adjustStats(results.size,this.props.query)
                : `По запросу "${this.props.query}" ничего не найдено`
              }
            </h2>
            : null
          }
        </NewImagesList>
      );
    }
    let content = null;
    if(this.state.shownImageSlider) {
      content = (
        <ImageSlider
          type="search"
          initialSlide={this.state.activeImageIndex}
          close={this.hideSliderHandler}
          images={results}
        />
      );
    }
    else {
      content = (
        <div>
          <div className={classes.header}>
            <Title center>Исследуй мир</Title>
            <div className={classes.links}>
              <SlideBtn
                hoverClass={classes.btnHome}
                Icon={HomeIcon}
              >
                <Link to="/" style={{color: '#fff',textDecoration: 'none'}}>На главную</Link>
              </SlideBtn>
            </div>
          </div>
          <div className={classes.panel}>
            <div className={classes.panelContainer}>
              <div className={classes.user}>
                <UserBlock
                  dark
                  avatar={user.get('avatar')}
                  username={user.get('username')}
                />
              </div>
              <div className={classes.search}>
                <Search
                  onSearch={this.searchHandler}
                />
              </div>
              <div className={classes.showNewsContainer}>
                <button className={classes.showNewsBtn} onClick={this.loadNews}>Показать новые</button>
              </div>
            </div>
          </div>
          <div className={classes.list}>
            {list}
          </div>
        </div>
      );
    }
    return content;
  }
}

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  query: state.search,
  results: getSearchResults(state)
});

const mapDispatchToProps = dispatch => ({
  onSetSearchQuery: (query) => dispatch(setSearchQuery(query)),
  onFetchSearchResults: () => dispatch(fetchSearchResults())
});

export default connect(mapStateToProps,mapDispatchToProps)(ResultsPage);