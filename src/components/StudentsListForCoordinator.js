import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchBar from "material-ui-search-bar";
import FilterListIcon from '@material-ui/icons/FilterList';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Navbar from "./navbar/NavBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {ExportCSV} from "./ExportButton";
import CountUp from 'react-countup';
import AnimatedNumber from 'react-animated-number';
const axios = require('axios')


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'roll_no', numeric: false, disablePadding: true, label: 'Enrollment No' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'branch', numeric: false, disablePadding: false, label: 'Branch' },
  { id: 'batch', numeric: false, disablePadding: false, label: 'Batch' },
  { id: 'cgpa', numeric: true, disablePadding: false, label: 'CGPA' },
  { id: 'verified', numeric: false, disablePadding: false, label: 'Verified' },
  { id: 'selected', numeric: false, disablePadding: false, label: 'Selected' },
  { id: 'profile', numeric: false, disablePadding: false, label: 'View Profile' },
  
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy===headCell.id ?order:false}
          >
            <TableSortLabel
              active={orderBy===headCell.id}
              direction={orderBy===headCell.id?order:'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Students List
        </Typography>
      )}

      
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    width: '70%',
    marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    marginLeft:'auto',
    marginRight:'auto',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
    },
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function StudentsListForCoordinator() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('company');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows,setRows]=React.useState([]);
  const [update,setUpdate]=React.useState(false);
  const [interns,setInterns]=React.useState([]);
  const [placements,setPlacements]=React.useState([]);
  const [selectedTab,setSelectedTab]=React.useState(0);
  const [selectedStrudents,setSelectedStudents]=React.useState(0);
  const [verifiedStrudents,setVerifiedStudents]=React.useState(0);
  const [totalStudents,setTotalStudents]=React.useState(0);
  const [searched, setSearched] = React.useState("");
  const history = useHistory();

  const getData=()=>{
    let token=localStorage.getItem('token');
    let id=localStorage.getItem('id');
    console.log("Hello");
    const headers={
      'Authorization':token,
    }
    
      axios({
        method: 'get',
        
        url:'https://powerset-backend.herokuapp.com/students/',
        headers:{
          'Content-Type':'application/json',
          'Authorization':token,
        },
      })
      .then(function (response) {
        console.log(response);
          console.log(response.data.length);
          var curr_interns=[];
          var curr_placements=[];
          var total=0;
          var selected=0;
          var verified=0;
          for(var i=0;i<response.data.length;i++){
            

            var obj=new Object();
            obj.name=response.data[i].user.name;
            obj.branch=response.data[i].branch;
            obj.batch=response.data[i].batch;
            obj.cgpa=response.data[i].cgpa;
            obj.student_id=response.data[i].id;
            obj.roll_no=response.data[i].entry_number;
            obj.is_verified=response.data[i].is_verified;
            obj.placement=response.data[i].placement.name;
            obj.resume_link=response.data[i].primary_resume.resume;
            if(obj.placement=="Intern"){
              total+=1;
              if(obj.is_verified="Verified"){
                verified+=1;
              }
              if (response.data[i].is_selected==true){
                obj.is_selected="Selected";
                selected+=1;
              } else{
                obj.is_selected="Not selected";
              }
          }
            if(obj.placement=="Intern"){
              curr_interns=[...curr_interns,obj];
            }
            else {
              curr_placements=[...curr_placements,obj]
            }
          }
          setInterns(curr_interns);
          setPlacements(curr_placements);
          console.log(curr_placements);
          console.log(curr_interns);
          setRows(curr_interns);
          setSelectedStudents(selected);
          setTotalStudents(total);
          setVerifiedStudents(verified);
          
        
  
      })
      .catch(function (err) {
        //console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
        console.log(err);
      });
  }
  
  React.useEffect(()=>{
    getData();
},[]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.company);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleViewProfile=(event,student_id)=>{
    let redirect_url="/student/"+student_id.toString();
    history.push(redirect_url);
  };
  
  const handleChangeTab=(event, new_value)=>{
    setSelectedTab(new_value);
    var total=0;
    var selected=0;
    var verified=0;
    if(new_value==0){
      setRows(interns);
      for(var i=0;i<interns.length;i+=1){
        total+=1;
        if(interns[i].is_verified=="Verified"){
          verified+=1;
        }
        if(interns[i].is_selected=="Selected"){
          selected+=1;
        }
      }
    }
    else{
       setRows(placements);
       for(var i=0;i<placements.length;i+=1){
        total+=1;
        if(placements[i].is_verified=="Verified"){
          verified+=1;
        }
        if(placements[i].is_selected=="Selected"){
          selected+=1;
        }
      }
    }
    setSelectedStudents(selected);
    setTotalStudents(total);
    setVerifiedStudents(verified);
  }
  const requestSearch=(searchVal)=>{
    console.log(searchVal);
    var count=0;
    var selected=0;
    var verified=0;
    console.log(count);
    if(selectedTab==0){
      const filteredRows=interns.filter((row)=>{
        
        if( row.name.toString().toLowerCase().includes(searchVal.toString().toLowerCase()) ||
        row.branch.toString().toLowerCase().includes(searchVal.toString().toLowerCase()) || 
        row.batch.toString().toLowerCase().includes(searchVal.toString().toLowerCase()) ||
        row.roll_no.toString().toLowerCase().includes(searchVal.toString().toLowerCase()) ||
        row.is_selected.toString().includes(searchVal.toString()) ||
        row.is_verified.toString().includes(searchVal.toString())
        ==true){
          count+=1;
          if(row.is_selected=="Selected"){
            selected+=1;
          }
          if(row.is_verified=="Verified"){
            verified+=1;
          }
          return true;
        }
        else return false;
      })
      setRows(filteredRows);
    }
    else if(selectedTab==1){
      count+=1;
      const filteredRows=placements.filter((row)=>{
        
        if (row.name.toString().toLowerCase().includes(searchVal.toString().toLowerCase()) ||
        row.branch.toString().toLowerCase().includes(searchVal.toString().toLowerCase()) || 
        row.batch.toString().toLowerCase().includes(searchVal.toString().toLowerCase()) ||
        row.roll_no.toString().toLowerCase().includes(searchVal.toString().toLowerCase()) ||
        row.is_selected.toString().includes(searchVal.toString()) ||
        row.is_verified.toString().includes(searchVal.toString()) ==true){
          count+=1;
          if(row.is_selected=="Selected"){
            selected+=1;
          }
          if(row.is_verified=="Verified"){
            verified+=1;
          }
          return true;
        }
        else return false;
      })
      setRows(filteredRows);
      
    }
    console.log(count);
    setTotalStudents(count);
    setSelectedStudents(selected);
    setVerifiedStudents(verified);
  }
  const cancelSearch=()=>{
    setSearched("");
    requestSearch(searched);
  }
  const isSelected = (company) => selected.indexOf(company) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const formatValue = (value) => value.toFixed(1);
  return (
    
    <div className={classes.root} spacing={"10 px"}>
    <Grid container  alignItems="center"
    justify="center"
    direction="column"
    spacing={0}>
    <Grid item sm={12}>
    <div style={{ fontSize:20}}>Selected = <AnimatedNumber
          value={selectedStrudents}
          style={{
            transition: '0.8s ease-out',
            fontSize: 20,
            transitionProperty:
                'background-color, color, opacity'
        }}
        
        frameStyle={perc => (
            perc === 100 ? {} : {backgroundColor: '#25db5f'}
        )}
        duration={4000}
        formatValue={formatValue}
        />
        </div>
        </Grid>

        <Grid item sm={12}>
        <div style={{ fontSize:20}}>Verified = <AnimatedNumber
        value={verifiedStrudents}
        style={{
          transition: '0.8s ease-out',
          fontSize: 20,
          transitionProperty:
              'background-color, color, opacity'
      }}
      frameStyle={perc => (
          perc === 100 ? {} : {backgroundColor: '#1682e0'}
      )}
      duration={3000}
      formatValue={formatValue}
      />
      </div>
      </Grid>


      <Grid item sm={12}>
      <div style={{ fontSize:20}}>Total Students = <AnimatedNumber
      value={totalStudents}
      style={{
        transition: '0.8s ease-out',
        fontSize: 20,
        transitionProperty:
            'background-color, color, opacity'
    }}
    frameStyle={perc => (
        perc === 100 ? {} : {backgroundColor: '#f0a80c'}
    )}
    duration={3000}
    formatValue={formatValue}
    />
    </div>
    </Grid>
    </Grid>


      <Paper className={classes.paper}>
      <SearchBar
      value={searched}
      onChange={(searchVal) => requestSearch(searchVal)}
      onCancelSearch={() => cancelSearch()}
      style={{border:'3px solid rgba(0, 0, 0, 0.05)'}}
    />
    <Grid container>
    <Grid item sm={10} >
      <Tabs
        value={selectedTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
        
      >
        <Tab label="Internship" />
        <Tab label="Placement" />
        
      </Tabs>
      </Grid>
      <Grid item sm={1}>
      <ExportCSV csvData={rows} fileName={"students"}/>
      </Grid>
      </Grid>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.company);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      key={row.student_id}
                    >
                      
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.roll_no}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.branch}</TableCell>
                      <TableCell align="left">{row.batch}</TableCell>
                      <TableCell align="right">{row.cgpa}</TableCell>
                      
                      <TableCell align="left">{row.is_verified}</TableCell>
                      <TableCell align="left">{row.is_selected}</TableCell>
                      <TableCell align="left"><Button variant="contained" color="primary" onClick={(e)=>handleViewProfile(e,row.student_id)}>View Profile</Button></TableCell>
                      
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
  );
}