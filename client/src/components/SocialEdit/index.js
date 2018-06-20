import React from 'react';

import classes from './index.sass';
import Button from '../UI/Button/index';

const socialEdit = ({position,value,saveLink,hideLinkModal,changeLink}) => {
  return (
    <div className={classes.SocialEdit} style={position}>
      <input
        type="text"
        className={classes.SocialEdit__field}
        value={value}
        onChange={changeLink}
      />
      <div className={classes.SocialEdit__controls}>
        <Button clicked={saveLink} shadow>Сохранить</Button>
        <div className={classes.SocialEdit__cancel} onClick={hideLinkModal}>Отменить</div>
      </div>
    </div>
  );
};

export default socialEdit;