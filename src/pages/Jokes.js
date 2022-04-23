import React, { useEffect, useState } from "react";
import JokesList from "../components/JokesList";
import JokesAPI from "../libs/api/jokes.service";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import useInterval from "../libs/hooks/useInterval";
import { Button, Switch, Tooltip } from "@mui/material";
import { useSnackbar } from 'notistack';

/**
 * Jokes is main landing page of application 
 * Covers parent page holding JokesList and Favourites list
 * Logic used to fetch data, add, remove favourites is maintained below.
 * */
const Jokes = () => {

  const [jokes, setJokes] = useState([]);
  const [favJokes, setFavJokes] = useState([]);
  const [interval, setIntervalState] = useState(null);
  const [checked, setChecked] = useState(false);
  // Enable toast message to provide feedback to user. 
  const { enqueueSnackbar } = useSnackbar();

  // useEffect Hook : On application load bydefault fetch first 10 random jokes
  // Check localstorage for previously favourited jokes and add then to favourites list
  useEffect(() => {
    fetchJokes();
    const favourite = JSON.parse(localStorage.getItem("favourite"));
    if (favourite) {
      setFavJokes(favourite);
    }
  }, []);

  // useInterval Hook is used to maintain state while doing interval based fetch of jokes.
  // RHUSHI: I have used this hook from Dan Abramov to solve problem around react rendering of updated states(array object) when using setInterval
  useInterval(() => {
    addRandomJoke();
  }, interval);

  // Use async menthod to fetch jokes and add in state 
  const fetchJokes = async () => {
    try {
      const response = await JokesAPI.get(10);
      setJokes(response.data.value);
      enqueueSnackbar('Updated list with new 10 random jokes. Have Fun...!', {variant: "success"} );
    } catch (e) {
      console.log(e);
    }
  };

  // Method to fetch random joke from API and add to favourite 
  // Check if joke is already added to Favourites list then fetch another.
  const addRandomFavourite = async () => {
    try {
      const response = await JokesAPI.get(1);
      const joke = response.data.value[0];
      if (
        favJokes.findIndex((item) => item.id === joke.id) == -1 &&
        favJokes.length < 10
      ) {
        addRemoveFavourite(joke);
      } else if (favJokes.length < 10) {
        addRandomFavourite();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Method to add and remove joke to favourite
  // Verify joke is already present in favourites or favourite list full (Max 10 favourite)
  // Provide notification on each action
  const addRemoveFavourite = (joke) => {
    if (
      favJokes.findIndex((item) => item.id === joke.id) == -1 &&
      favJokes.length < 10
    ) {
      const jokeList = [...favJokes, joke];
      setFavJokes(jokeList);
      saveFavourite(jokeList);
      enqueueSnackbar('Joke added to Favourites.', {variant: "info"} );
    } else if (favJokes.findIndex((item) => item.id === joke.id) !== -1) {
      removeJoke(joke);
    }else{
      enqueueSnackbar('You can favourite maximum 10 jokes only.', {variant: "warning"} );
    }
  };

  // Method to remove joke from favourite
  const removeJoke = (joke) => {
    favJokes.splice(
      favJokes.findIndex((item) => item.id === joke.id),
      1
    );
    const jokeList = [...favJokes];
    setFavJokes(jokeList);
    saveFavourite(jokeList);
    enqueueSnackbar('Joke removed from Favourites.', {variant: "info"} );
  };

  // Common method to update local storage 
  // Separated our as it can be refactored to server side save in future. 
  const saveFavourite = (jokeList) => {
    localStorage.setItem("favourite", JSON.stringify(jokeList));
  };

  // Initialise fetching of joke from server and push to favourite untill favourites bucket is not full (max 10)
  // Interval set to 5000 = 5 sec. 
  const initRandomFetch = (value) => () => {
    const check = !checked;
    if (check) {
      setIntervalState(5000);
      enqueueSnackbar('Adding one random joke to the favourites list every 5 seconds initiated.', {variant: "info"} );
    } else {
      enqueueSnackbar('Disabled adding of one random joke to the favourites list after every 5 seconds.', {variant: "info"} );
      setIntervalState(null);
    }
    // Update checked status for Switch button
    setChecked(check);
  };

  const addRandomJoke = () => {
    if (favJokes.length < 10) {
      addRandomFavourite();
    }
  };

  // Using Box and grid layout to paint UI in two columns
  // Using JokesList as single smart component and keeping all logic in Pages.
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid className="list-box" sx={{ minWidth: "200px" }} item xs={7}>
          <div className="section-header">
            <h1>Chuck Norris Jokes</h1>
            <Tooltip title="Fetch new 10 random jokes">
              <Button
                variant="contained"
                size="small"
                id="fetch-button"
                primary="Fetch Jokes"
                onClick={() => fetchJokes()}
              >
                Fetch
              </Button>
            </Tooltip>
          </div>
          <JokesList
            data={jokes}
            favourites={favJokes}
            isFavourite={false}
            secondaryAction={addRemoveFavourite}
          ></JokesList>
        </Grid>
        <Grid className="fav-box" sx={{ minWidth: "200px" }} item xs={5}>
          <div className="section-header">
            <h1>
              Favourite Jokes <span className="badge">{favJokes.length} </span>
            </h1>
            <div>
              <Tooltip title="Auto fill favourites with random jokes">
                <Switch
                  onChange={initRandomFetch()}
                  checked={checked}
                  inputProps={{
                    "aria-labelledby": "switch-auto-fetch",
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <JokesList
            data={favJokes}
            isFavourite={true}
            secondaryAction={removeJoke}
            addRandomFavourite={addRandomFavourite}
          ></JokesList>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Jokes;
