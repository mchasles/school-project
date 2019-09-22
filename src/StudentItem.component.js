import React from 'react';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

function StudentItem({ student, onClickEdit, onClickRemove }) {
  return (
    <ListItem key={student.id} alignItems="center" divider>
      <Box
        width={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <ListItemAvatar>
          <Avatar alt={student.name} src={student.avatar} />
        </ListItemAvatar>
        <ListItemText primary={student.name} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => onClickEdit(student.id)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => onClickRemove(student.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </Box>
    </ListItem>
  );
}

export default StudentItem;
