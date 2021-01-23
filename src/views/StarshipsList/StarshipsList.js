import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'utils/axios';
import { Page, Header } from 'components';
import { Results } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const StarshipsList = () => {
  const classes = useStyles(); 

  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      axios.get('/starships/').then(response => {
        if (mounted) {
          setData(response.data.results);
        }
      });
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="Starships List"
    >
      <Header
        subTitle={'Starships'}
        title={'Starships'}
      />
      {data && (
        <Results
          characters={data}  
          className={classes.results}  
                
        />
      )}
    </Page>
  );
};

export default StarshipsList;
