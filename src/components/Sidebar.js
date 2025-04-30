import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Movie Explorer
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/my-list">
          <ListItemText primary="My List" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;