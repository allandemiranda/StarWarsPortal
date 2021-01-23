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

const People = props => {
  const { className, variable, data, title, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [people, setPeople] = useState([]);

  useEffect(async () => {
    let mounted = true;

    const fetchPeople = async () => {   
      switch (variable) {
        case 'pilots':
          {
            const list_people = await data.pilots.map(async (url)=>{
              const response = await axios.get(url.split('/api')[1])
              return response
            })
            if (mounted) {
              const results = await Promise.all(list_people);
              setPeople(results);
            }
          }
          break;
        case 'residents':
          {
            const list_people = await data.residents.map(async (url)=>{
              const response = await axios.get(url.split('/api')[1])
              return response
            })
            if (mounted) {
              const results = await Promise.all(list_people);
              setPeople(results);
            }
          }
          break;
        case 'characters':
          {
            const list_people = await data.characters.map(async (url)=>{
              const response = await axios.get(url.split('/api')[1])
              return response
            })
            if (mounted) {
              const results = await Promise.all(list_people);
              setPeople(results);
            }
          }
          break;
        default:
        {
          const list_people = await data.people.map(async (url)=>{
            const response = await axios.get(url.split('/api')[1])
            return response
          });
          if (mounted) {
            const results = await Promise.all(list_people);
            setPeople(results);
          }
        }
          
      }  
    };

    await fetchPeople();

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
        {people && <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Mass</TableCell>
                    <TableCell>Height</TableCell>   
                    <TableCell>Gender</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {people.map((person, key) => (
                    <TableRow 
                      hover
                      key={key}
                      onClick={() => history.push('/person' + person.data.url.split('people')[1] + 'summary')}
                      style={{cursor: 'pointer'}}
                    >
                      <TableCell>{person.data.name}</TableCell>
                      <TableCell>{person.data.mass} {' kilograms'}</TableCell>
                      <TableCell>{person.data.height} {' centimeters'}</TableCell>
                      <TableCell>{person.data.gender}</TableCell>
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

People.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  variable: PropTypes.string
};

export default People;
