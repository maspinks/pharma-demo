// *https://www.registers.service.gov.uk/registers/country/use-the-api*
//import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataQueries } from '../../dal/data-queries';

// export function onUpdateInput()
// {

// }

export default function AccountContactLink(props) {
  const [myValue] = React.useState([] as string[]); 
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
 
  // onUpdateInput: React.pr = ()=>
  // {

  // }

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const dbQueries = new DataQueries();
      const response = await dbQueries.getContacts(''); 

      if (active) {
        //setOptions(Object.keys(response).map((key) => countries[key].item[0]));
        setOptions(response as any);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
      <div>
          <h1> MY Value: {myValue} </h1>
    <Autocomplete       
     // onUpdateInput={this.handleUpdateInput.bind(this)}
      multiple={true}
      disableCloseOnSelect={true}
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        props.onUpdateInput(event, newValue);
      }}
      onInputChange={(event, newValue) => {
        props.onUpdateInput(event, newValue);
      }}
      getOptionSelected={(option, value) =>
        { 
          const isSelected = (option as any).key === (value as any).key;
          if (isSelected) {props.onUpdateInput((value as any).key);}
          return isSelected; 
        } }
      getOptionLabel={(option) => (option as any).name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField          
          {...params}
          label="Contacts"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    </div>
  );
}


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import { getDefaultNormalizer } from '@testing-library/react';
// import { DataQueries } from '../../dal/data-queries';
// import { IContact } from '../../dal/data-model';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: 'auto',
//   },
//   paper: {
//     width: 200,
//     height: 230,
//     overflow: 'auto',
//   },
//   button: {
//     margin: theme.spacing(0.5, 0),
//   },
// }));

// function not(a, b) {
//   return a.filter((value) => b.indexOf(value) === -1);
// }

// function intersection(a, b) {
//   return a.filter((value) => b.indexOf(value) !== -1);
// }

// export default function AccountContactLink() {
//   const classes = useStyles();
//   const [checked, setChecked] = React.useState([]);
//   const [left, setLeft] = React.useState([] as IContact[]);
//   const [right, setRight] = React.useState([] as IContact[]);

//   const getData = async () =>
//   { 
//         const dbQueries = new DataQueries();
//         const contacts = await dbQueries.getContacts('');
//         setLeft(contacts as IContact[]);
//   }  

//   getData();

//   const leftChecked = intersection(checked, left);
//   const rightChecked = intersection(checked, right);

//   const handleToggle = (value: never) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };

//   const handleAllRight = () => {
//     setRight(right.concat(left));
//     setLeft([]);
//   };

//   const handleCheckedRight = () => {
//     setRight(right.concat(leftChecked));
//     setLeft(not(left, leftChecked));
//     setChecked(not(checked, leftChecked));
//   };

//   const handleCheckedLeft = () => {
//     setLeft(left.concat(rightChecked));
//     setRight(not(right, rightChecked));
//     setChecked(not(checked, rightChecked));
//   };

//   const handleAllLeft = () => {
//     setLeft(left.concat(right));
//     setRight([]);
//   };

//   const customList = (items) => (
//     <Paper className={classes.paper}>
//       <List dense component="div" role="list">
//         {items.map((value: never) => {
//           const labelId = `transfer-list-item-${value}-label`;

//           return (
//             <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
//               <ListItemIcon>
//                 <Checkbox
//                   checked={checked.indexOf(value) !== -1}
//                   tabIndex={-1}
//                   disableRipple
//                   inputProps={{ 'aria-labelledby': labelId }}
//                 />
//               </ListItemIcon>
//               <ListItemText id={labelId} primary={`List item ${value + 1}`} />
//             </ListItem>
//           );
//         })}
//         <ListItem />
//       </List>
//     </Paper>
//   );

//   return (
//     <Grid container spacing={2} alignItems="center" className={classes.root}>
//       <Grid item>{customList(left)}</Grid>
//       <Grid item>
//         <Grid container direction="column" alignItems="center">
//           <Button
//             variant="outlined"
//             size="small"
//             className={classes.button}
//             onClick={handleAllRight}
//             disabled={left.length === 0}
//             aria-label="move all right"
//           >
//             ≫
//           </Button>
//           <Button
//             variant="outlined"
//             size="small"
//             className={classes.button}
//             onClick={handleCheckedRight}
//             disabled={leftChecked.length === 0}
//             aria-label="move selected right"
//           >
//             &gt;
//           </Button>
//           <Button
//             variant="outlined"
//             size="small"
//             className={classes.button}
//             onClick={handleCheckedLeft}
//             disabled={rightChecked.length === 0}
//             aria-label="move selected left"
//           >
//             &lt;
//           </Button>
//           <Button
//             variant="outlined"
//             size="small"
//             className={classes.button}
//             onClick={handleAllLeft}
//             disabled={right.length === 0}
//             aria-label="move all left"
//           >
//             ≪
//           </Button>
//         </Grid>
//       </Grid>
//       <Grid item>{customList(right)}</Grid>
//     </Grid>
//   );
// }
