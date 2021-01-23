import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
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

const Planets = props => {
  const { className, data, title, ...rest } = props;

  const classes = useStyles();
  const [homeworld, setHomeworld] = useState([]);

  useEffect(async () => {
    let mounted = true;

    const fetchHomeworld = async () => {    
      const response = await axios.get(data.homeworld.split('/api')[1])
      if (mounted) {
        const results = await Promise.all([response]);
        setHomeworld(results[0].data);
      }
    };

    await fetchHomeworld();

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
        <CardContent className={classes.content}>
          {homeworld && <Table>
            <TableBody>            
              <TableRow
                onClick={() => history.push('/planet' + homeworld.url.split('planets')[1] + 'summary')}
                selected
                style={{cursor: 'pointer'}}
              >
                <TableCell>Name</TableCell>
                <TableCell>{homeworld.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Climate</TableCell>
                <TableCell>{homeworld.climate}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Diameter</TableCell>
                <TableCell>{homeworld.diameter} {' kilometers'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gravity</TableCell>
                <TableCell>{homeworld.gravity} {' standard G'}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Orbital Period</TableCell>
                <TableCell>{homeworld.orbital_period} {' hours'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Population</TableCell>
                <TableCell>{homeworld.population}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Rotation Period</TableCell>
                <TableCell>{homeworld.rotation_period} {' days'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Surface Water</TableCell>
                <TableCell>{homeworld.surface_water}{' percentage of the planet surface'}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Terrain</TableCell>
                <TableCell>{homeworld.terrain}</TableCell>
              </TableRow>
            </TableBody>
          </Table>}
        </CardContent>        
      </Card>
    </div>
  );
};

Planets.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default Planets;
