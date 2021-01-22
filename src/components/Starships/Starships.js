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

import axios from 'utils/axios';
import { GenericMoreButton } from 'components';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  }
}));

const Starships = props => {
  const { className, data, title, ...rest } = props;

  const classes = useStyles();
  const [starships, setStarships] = useState([]);

  useEffect(async () => {
    let mounted = true;

    const fetchStarships = async () => {
      const list_starships = await data.starships.map(async (url)=>{
        const response = await axios.get(url.split('/api')[1])
        return response
      })
      if (mounted) {
        const results = await Promise.all(list_starships)
        setStarships(results);
      }
    };

    await fetchStarships();

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
        {starships && <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Manufacturer</TableCell>   
                    <TableCell>MGLT</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {starships.map((starship, key) => (
                    <TableRow key={key}>
                      <TableCell>{starship.data.name}</TableCell>
                      <TableCell>{starship.data.model}</TableCell>
                      <TableCell>{starship.data.manufacturer}</TableCell>
                      <TableCell>{starship.data.MGLT}</TableCell>
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

Starships.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default Starships;
