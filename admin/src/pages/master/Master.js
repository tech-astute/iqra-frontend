import React, {useState} from 'react'
import PropTypes from 'prop-types';
import { Box, Tabs, Tab, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Category from './category/Category';
import Medium from './medium/Medium';
import Level from './level/Level';
import Subject from './subject/Subject';
import Language from './language/Language';
import ImportantIssue from './importantIssue/ImportantIssue';
import WeeklyNews from './weeklyNews/WeeklyNews';
import { useSelector } from 'react-redux';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Master = () => {
    const categories = useSelector(state => state.category.categories);
    const subjects = useSelector(state => state.subject.subjects);
    const mediums = useSelector(state => state.medium.mediums);
    const levels = useSelector(state => state.level.levels);
    const languages = useSelector(state => state.language.languages);
    const importantIssues = useSelector(state => state.importantIssue.importantIssues);
    const weeklyNews = useSelector(state => state.weeklyNews.weeklyNews);
    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  return (
    <Box sx={{ width:'100%', bgcolor: 'background.paper', 
    border: '1px solid',
    borderRadius: 2,
    borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
    boxShadow: 'inherit',
    ':hover': {
        boxShadow: 'inherit'
    },
    '& pre': {
        m: 0,
        p: '16px !important',
        fontFamily: theme.typography.fontFamily,
        fontSize: '0.75rem'
    }}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Category" {...a11yProps(0)} />
        <Tab label="Subject" {...a11yProps(1)}/>
        <Tab label="Medium" {...a11yProps(2)}/>
        <Tab label="Level" {...a11yProps(3)}/>
        <Tab label="Language" {...a11yProps(4)}/>
        <Tab label="Important Issue" {...a11yProps(5)}/>
        <Tab label="Weekly News" {...a11yProps(6)}/>
      </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Category categories={categories} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Subject subjects={subjects} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Medium mediums={mediums} />
      </TabPanel>
        <TabPanel value={value} index={3}>
         <Level levels={levels} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Language languages={languages} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ImportantIssue iICategorys={importantIssues}  />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <WeeklyNews wNCategorys={weeklyNews} />
        </TabPanel>
    </Box> 
  )
}

export default Master