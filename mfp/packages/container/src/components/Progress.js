import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Do not write 
//   import { LinearProgress } from '...';
// because apparently it breaks the app and browser renders
// a nasty exception in the console of development tools.
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => {
    return createStyles({
        bar: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2)
            }
        }
    });
});

export default () => {
    const classes = useStyles();
    return (
        <div className={classes.bar}>
            <LinearProgress/>
        </div>
    );
}