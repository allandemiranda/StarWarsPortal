import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import axios from 'utils/axios';
import { Page, Header, Summary, Films } from 'components';
import { PersonInfo } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)     
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const Person = props => {
  const { match, history } = props;
  const classes = useStyles();
  const { id, tab } = match.params;

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: 'summary', label: 'Summary' },
    { value: 'films', label: 'Films' }
  ];

  if (!tab) {
    return <Redirect to={`/details/${id}/summary`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  const [person, setPerson] = useState();

  useEffect(() => {
    let mounted = true;

    const fetchPerson = () => {
      axios.get('/people/'+ id +'/').then(response => {
        if (mounted) {
          setPerson(response.data); 
        }
      });
    };

    fetchPerson();

    return () => {
      mounted = false;
    };
  }, []);

  if (!person) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Person Details"
    >
      <Header 
        subTitle={'Person'}
        title={person.name} 
      />
      <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {tab === 'summary' && 
        <Summary 
          component={<PersonInfo person={person} />}
        />}
        {tab === 'films' && 
        <Films 
          data={person} 
          title={'Person Films'} 
        />}
      </div>
    </Page>
  );
};

Person.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Person;
