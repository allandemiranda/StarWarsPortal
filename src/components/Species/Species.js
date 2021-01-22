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

const Species = props => {
  const { className, data, title, ...rest } = props;

  const classes = useStyles();
  const [species, setSpecies] = useState([]);

  useEffect(async () => {
    let mounted = true;

    const fetchSpecies = async () => {
      const list_species = await data.species.map(async (url)=>{
        const response = await axios.get(url.split('/api')[1])
        return response
      })
      if (mounted) {
        const results = await Promise.all(list_species)
        setSpecies(results);
      }
    };

    await fetchSpecies();

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
        {species && <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Classification</TableCell>   
                    <TableCell>Designation</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {species.map((specie, key) => (
                    <TableRow key={key}>
                      <TableCell>{specie.data.name}</TableCell>
                      <TableCell>{specie.data.language}</TableCell>
                      <TableCell>{specie.data.classification}</TableCell>
                      <TableCell>{specie.data.designation}</TableCell>
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

Species.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default Species;
