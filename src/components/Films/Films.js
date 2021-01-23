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
import { GenericMoreButton } from 'components';

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

  useEffect(async () => {
    let mounted = true;

    const fetchFilms = async () => {
      const list_films = await data.films.map(async (url)=>{
        const response = await axios.get(url.split('/api')[1])
        return response
      })
      if (mounted) {
        const results = await Promise.all(list_films)
        setFilms(results);
      }
    };

    await fetchFilms();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title={title}
        />
        <Divider />
        {films && <CardContent className={classes.content}>
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
        </CardContent>}
      </Card>
    </div>
  );
};

Films.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default Films;
