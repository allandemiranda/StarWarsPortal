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

const Vehicles = props => {
  const { className, data, title, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [vehicles, setVehicles] = useState([]);

  useEffect(async () => {
    let mounted = true;

    const fetchVehicles = async () => {
      const list_vehicles = await data.vehicles.map(async (url)=>{
        const response = await axios.get(url.split('/api')[1])
        return response
      })
      if (mounted) {
        const results = await Promise.all(list_vehicles)
        setVehicles(results);
      }
    };

    await fetchVehicles();

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
        {vehicles && <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Manufacturer</TableCell>   
                    <TableCell>Class</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map((vehicle, key) => (
                    <TableRow 
                      hover
                      key={key}
                      onClick={() => history.push('/vehicle' + vehicle.data.url.split('vehicles')[1] + 'summary')}
                      style={{cursor: 'pointer'}}
                    >
                      <TableCell>{vehicle.data.name}</TableCell>
                      <TableCell>{vehicle.data.model}</TableCell>
                      <TableCell>{vehicle.data.manufacturer}</TableCell>
                      <TableCell>{vehicle.data.vehicle_class}</TableCell>
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

Vehicles.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default Vehicles;
