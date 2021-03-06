import React, { useRef } from 'react';
import faker from 'faker';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  editNameInput: {
    width: '100%',
    marginRight: theme.spacing(4),
    '& input': {
      letterSpacing: '0.00938em'
    }
  }
}));

function StudentForm({ student = {}, onClickAway, onSubmit }) {
  const inputNameRef = useRef();
  const classes = useStyles();

  return (
    <ListItem alignItems="center" divider>
      <ClickAwayListener onClickAway={onClickAway}>
        <Box
          width={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          component="form"
          onSubmit={e => {
            e.preventDefault();
            onSubmit({
              ...student,
              name: inputNameRef.current.value,
              avatar: student.avatar || faker.image.avatar()
            });
          }}
        >
          <ListItemAvatar>
            <Avatar alt={student.name} src={student.avatar} />
          </ListItemAvatar>
          <TextField
            className={classes.editNameInput}
            inputRef={inputNameRef}
            autoFocus
            defaultValue={student.name || ''}
            inputProps={{ 'aria-label': 'name' }}
          />
          <Button
            aria-label="submit"
            type="submit"
            variant="outlined"
            size="small"
            color="primary"
          >
            {student.id >= 0 ? 'Save' : 'Add'}
          </Button>
        </Box>
      </ClickAwayListener>
    </ListItem>
  );
}

export default StudentForm;
