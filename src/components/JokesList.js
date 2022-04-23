import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

// JokesLiist is common component to paint jokes 
// Usage: Used for jokes list and Favourites list
const JokesList = (props) => {
  // Check if joke is already favourited 
  const isJokeFavourite = (joke) => {
    return props.favourites.findIndex((item) => item.id === joke.id) == -1;
  };

  // Logic to paint secondary icon on list 
  // Favourite, Favourited, Delete
  const favIcon = (recObj) => {
    if (props.isFavourite) {
      // IF JokesList is for favourite then paint delete icon only 
      return (
        <IconButton onClick={() => props.secondaryAction(recObj)}>
          <Tooltip title="Remove from Favourites">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      );
    } else {
      // IF JokesList is not for favourite then paint favourite border or filled as per isJokeFavourite 
      return (
        <IconButton
          color="primary"
          onClick={() => props.secondaryAction(recObj)}
        >
          {isJokeFavourite(recObj) ? (
            <Tooltip title="Add to Favourites">
              <FavoriteBorderIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Remove from Favourites">
              <FavoriteIcon />
            </Tooltip>
          )}
        </IconButton>
      );
    }
  };
  return (
    <List
      dense
      sx={{ width: "100%", minWidth: 200, bgcolor: "background.paper" }}
    >
      {props.data.map((recObj) => {
        const labelId = `checkbox-list-secondary-label-${recObj.id}`;
        const jokeId = props.isFavourite
          ? `fav-list-${recObj.id}`
          : `joke-list-${recObj.id}`;
        return (
          <ListItem
            key={jokeId}
            aria-label="listitem"
            secondaryAction={favIcon(recObj)}
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={recObj.joke} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default JokesList;
