import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './index.sass';
import {getCurrentUser} from '../../selectors';

import Spinner from '../../components/UI/Spinner';

const auth = ({children,loading,user}) => {
  return (
    <div className={classes.Auth}>
      <div>
        {user && <Redirect to="/"/>}
        {children}
      </div>
      {loading
        && <div className={classes.loader}>
            <Spinner/>
          </div>
      }
      <div className={classes.copyrights}>2016 Создано командой профессионалов на продвинутом курсе по
        веб-разработке от LoftSchool
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  loading: state.auth.get('loading')
});

export default connect(mapStateToProps)(auth);