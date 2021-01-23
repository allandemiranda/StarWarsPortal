import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import useRouter from 'utils/useRouter';
import axios from 'utils/axios';
import { GenericMoreButton, Alert } from 'components';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  }
}));

const Films = props => {
  const { className, data, title, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [films, setFilms] = useState([]);
  const [progress, setProgress] = useState(false);
  const [alertNull, setAlertNull] = useState(false);

  useEffect(async () => {
    let mounted = true;

    const fetchFilms = async () => {
      if(data.films.length > 0){
        const list_films = await data.films.map(async (url)=>{
          const response = await axios.get(url.split('/api')[1])
          return response
        })
        if (mounted) {
          const results = await Promise.all(list_films)
          setFilms(results);
        }
      } else {
        setProgress(true);
        setAlertNull(true);
      }
    };

    await fetchFilms();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(()=>{
    if(films.length > 0){
      const response = films.map((value)=>{
        return (value.status === 200)
      });
      setProgress(response.some(element => element != false))
    }
  },[films])

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      { alertNull ? 
        <Alert
          message={'There is no information here!'}
          variant={'warning'}
        /> : null }

      {!progress ? <CircularProgress/> : !alertNull && <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title={title}
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Director</TableCell>
                    <TableCell>Producer</TableCell>   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {films.map((film, key) => (
                    <TableRow 
                      hover
                      key={key}
                      onClick={() => history.push('/film' + film.data.url.split('films')[1] + 'summary')}
                      style={{cursor: 'pointer'}}
                    >
                      <TableCell>{film.data.title}</TableCell>
                      <TableCell>{film.data.director}</TableCell>
                      <TableCell>{film.data.producer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>}
    </div>
  );
};

Films.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default Films;
