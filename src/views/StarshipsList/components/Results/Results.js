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

  const [starships, setStarships] = useState([]);
  const [page, setPage] = useState(0); 
  const [nextPage, setNextPage] = useState(true);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  useEffect(()=>{
    setStarships(characters)
  },[characters]); 

  useEffect(() => {
    let mounted = true;

    const fetchStarships = () => {
      setStarships([])
      axios.get('/starships/?page='+(page+1)).then(response => {
        if (mounted) {
          setStarships(response.data.results);
          if(response.data.next === null){
            setNextPage(false)
          } else {
            setNextPage(true)
          }
        }
      });
    };

    fetchStarships();

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
                    <TableCell>Model</TableCell>
                    <TableCell>Manufacturer</TableCell>
                    <TableCell>MGLT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {starships.map((starship, key) => (
                    <TableRow                      
                      hover
                      key={key}
                      onClick={() => history.push('/starship' + starship.url.split('starship')[1] + 'summary')}
                      style={{cursor: 'pointer'}}
                    >                      
                      <TableCell>{starship.name}</TableCell>
                      <TableCell>{starship.model}</TableCell>
                      <TableCell>{starship.manufacturer}</TableCell>
                      <TableCell>{starship.MGLT}</TableCell>
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
