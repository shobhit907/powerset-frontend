import React from 'react';
import  { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import { lighten, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import { Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const axios = require('axios')
//let rows=[];


// function createData(company, job_title, min_ctc, max_ctc, last_date) {
//   return {company, job_title, min_ctc, max_ctc, last_date};
// }

// const rows = [
//   createData('DE Shaw', 'Software Engineer', 3100000, 3500000, "26/04/2021"),
//   createData('Nutanix', 'Software Engineer', 2900000, 3000000, "28/04/2021"),
//   createData('Flipkart', 'Software Engineer', 2650000, 2700000, "30/05/2021"),
//   createData('Microsoft', 'Software Engineer', 4100000, 4300000, "26/04/2021"),
//   createData('Goldman Sachs', 'Analyst', 2100000, 250000, "26/04/2021"),
//   createData('Sprinlr', 'Product Engineer', 3000000, 3000000, "26/04/2021"),
//   createData('Amazon', 'Software Engineer', 3100000, 3200000, "26/04/2021"),
  
// ];

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
  { id: 'company', numeric: false, disablePadding: true, label: 'Company' },
  { id: 'job_title', numeric: true, disablePadding: false, label: 'Job Title' },
  { id: 'applied_on', numeric: false, disablePadding: false, label: 'Date Applied On' },
  { id: 'description', numeric: false, disablePadding: false, label: 'View Description' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  {id:'cancel',numeric:false,disablePadding:false,label:'Cancel '}
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
  const history=useHistory();
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
          Jobs you Applied In
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

export default function JobsAppliedByStudent() {
    
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('company');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows,setRows]=React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getData=()=>{
    let token=localStorage.getItem('token');
    let id=localStorage.getItem('id');
    console.log("Hello");
    const headers={
      'Authorization':token,
    }
    
      axios({
        method: 'get',
        
        url:'https://powerset-backend.herokuapp.com/placements/applied-jobs/',
        headers:{
          'Content-Type':'application/json',
          'Authorization':token,
        },
      })
      .then(function (response) {
        console.log(response);
          console.log(response.data.length);
          var curr_rows=[]
          for(var i=0;i<response.data.length;i++){
            var obj=new Object();
            obj.company=response.data[i].job_profile.company.name;
            obj.job_title=response.data[i].job_profile.title;
            obj.applied_on=response.data[i].date_applied;
            obj.job_id=response.data[i].job_profile.id;
            
            obj.is_selected=response.data[i].is_selected;
            obj.round=response.data[i].job_round;
            if(obj.is_selected==true){
                obj.status="Accepted";
            }
            else{
                obj.status="Round "+response.data[i].job_round;
            }
            curr_rows=[...curr_rows,obj];
          }
          setRows(curr_rows);
          console.log(curr_rows);
          
        
  
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

  const handleClick = (event, company) => {
    const selectedIndex = selected.indexOf(company);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, company);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleViewJobDescription = (event,job_id) => {

    console.log("Viewing Job Description");
  };
  const handleCancelJobApplication = (event,job_id) => {
    handleClickOpen();
    let token=localStorage.getItem('token');
    let obj=new Object();
    obj.id=job_id;
    let temp=[];
    temp=[...temp,obj];
    

    
    
    console.log(temp);
    console.log("Job id is"+job_id);

    axios({
        method: 'delete',
        
        url:'https://powerset-backend.herokuapp.com/placements/cancel/',
        headers:{
          'Content-Type':'application/json',
          'Authorization':token,
        },
        data:temp,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        //console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
        console.log(err);
      });
    
  };
  const isSelected = (company) => selected.indexOf(company) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cancel Job Application?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to cancel the job application? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yes, Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No, don't cancel
          </Button>
        </DialogActions>
      </Dialog>

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
                      key={row.job_id}
                    >
                     
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.company}
                      </TableCell>
                      <TableCell align="center">{row.job_title}</TableCell>
                      <TableCell align="center">{row.applied_on}</TableCell>
                      <TableCell alight="left"><Button color="primary" variant="contained" onClick={(e)=>handleViewJobDescription(e,row.job_id)}>View Details</Button></TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell alight="left"><Button color="secondary" variant="contained" onClick={(e)=>handleCancelJobApplication(e,row.job_id)}>Cancel Application</Button></TableCell>
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