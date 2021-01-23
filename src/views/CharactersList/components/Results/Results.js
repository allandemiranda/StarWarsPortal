import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import { GenericMoreButton } from 'components';
import axios from 'utils/axios';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

const Results = props => {
  const { className, characters, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(0); 
  const [nextPage, setNextPage] = useState(true);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  useEffect(()=>{
    setPeople(characters)
  },[characters]); 

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = () => {
      setPeople([])
      axios.get('/people/?page='+(page+1)).then(response => {
        if (mounted) {
          setPeople(response.data.results);
          if(response.data.next === null){
            setNextPage(false)
          } else {
            setNextPage(true)
          }
        }
      });
    };

    fetchCustomers();

    return () => {
      mounted = false;
    };
  }, [page]);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title=""
        />
        <Divider />
        <CardContent className={classes.content}>
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
                      onClick={() => history.push('/person' + person.url.split('people')[1] + 'summary')}
                      style={{cursor: 'pointer'}}
                    >                      
                      <TableCell>{person.name}</TableCell>
                      <TableCell>{person.mass} {' kilograms'}</TableCell>
                      <TableCell>{person.height} {' centimeters'}</TableCell>
                      {(person.gender === 'n/a')? <TableCell/> : <TableCell>{person.gender}</TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination            
            component="div"
            labelDisplayedRows={()=>{false}}
            nextIconButtonProps={{
              style: {
                color: !nextPage ? '#b5b8c4' : null, 
                cursor: !nextPage ? 'not-allowed' : null,
                pointerEvents: !nextPage ? 'none' : null
              }
            }}
            onChangePage={handleChangePage}
            page={page}            
            rowsPerPage={false}
            rowsPerPageOptions={[]}            
          />
        </CardActions>
      </Card>
    </div>
  );
};

Results.propTypes = {
  characters: PropTypes.array.isRequired,
  className: PropTypes.string  
};

Results.defaultProps = {
  characters: []
};

export default Results;
