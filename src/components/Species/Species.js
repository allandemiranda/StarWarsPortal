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

const Species = props => {
  const { className, data, title, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [species, setSpecies] = useState([]);
  const [progress, setProgress] = useState(false);
  const [alertNull, setAlertNull] = useState(false);

  useEffect(async () => {
    let mounted = true;

    const fetchSpecies = async () => {
      if(data.species.length > 0){
        const list_species = await data.species.map(async (url)=>{
          const response = await axios.get(url.split('/api')[1])
          return response
        })
        if (mounted) {
          const results = await Promise.all(list_species)
          setSpecies(results);
        }
      } else{
        setProgress(true);
        setAlertNull(true);
      }
    };

    await fetchSpecies();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(()=>{
    if(species.length > 0){
      const response = species.map((value)=>{
        return (value.status === 200)
      });
      setProgress(response.some(element => element != false))
    }
  },[species])

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
                    <TableCell>Name</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Classification</TableCell>   
                    <TableCell>Designation</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {species.map((specie, key) => (
                    <TableRow 
                      hover
                      key={key}
                      onClick={() => history.push('/specie' + specie.data.url.split('species')[1] + 'summary')}
                      style={{cursor: 'pointer'}}
                    >
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
        </CardContent>
      </Card>}
    </div>
  );
};

Species.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default Species;
