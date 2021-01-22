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

const Homeworld = props => {
  const { className, data, title, ...rest } = props;

  const classes = useStyles();
  const [homeworld, setHomeworld] = useState([]);

  useEffect(async () => {
    let mounted = true;

    const fetchHomeworld = () => {      
      const response = axios.get(data.homeworld.split('/api')[1])
      if (mounted) {
        setHomeworld(response);
      }
    };

    fetchHomeworld();

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
          <Table>
            <TableBody>            
              <TableRow selected>
                <TableCell>Name</TableCell>
                <TableCell>{homeworld.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Language</TableCell>
                <TableCell>{homeworld.language}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Hair Colors</TableCell>
                <TableCell>{homeworld.hair_colors}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Skin Colors</TableCell>
                <TableCell>{homeworld.skin_colors}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Eye Colors</TableCell>
                <TableCell>{homeworld.eye_colors}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Designation</TableCell>
                <TableCell>{homeworld.designation}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Classification</TableCell>
                <TableCell>{homeworld.classification}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Average Lifespan</TableCell>
                <TableCell>{homeworld.average_lifespan}{' years'}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Average Height</TableCell>
                <TableCell>{homeworld.average_height}{' sentient'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>        
      </Card>
    </div>
  );
};

Homeworld.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default Homeworld;
