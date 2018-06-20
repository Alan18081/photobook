import React from 'react';

import classes from './index.sass';

import Button from '../Button';
import Spinner from '../Spinner';

import DeleteIcon from '../../../assets/icons/delete.svg';

const controls = ({save,cancel,loading,remove}) => (
  <div className={classes.controls}>
    <Button clicked={save}>Сохранить</Button>
    <div className={classes.cancel} onClick={cancel}>Отменить</div>
    {loading && <Spinner size={4} />}
    {remove ? <Button icon color="red" clicked={remove}>
      <DeleteIcon/>
      Удалить
    </Button> : null}
  </div>
);

export default controls;