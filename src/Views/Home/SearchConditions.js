import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const SearchConditions = ({tabval})=>{
    return (
        <Box sx={{ width: '100%',paddingTop:'25px',paddingBottom:'25px',paddingLeft:'20px' }}>
             <Grid container>
                <Grid item xs={12} md={4} xl={2}>
                    
                </Grid>
                <Grid item xs={8}>
                    <Button variant="contained" color="primary">查詢</Button>
                </Grid>
             </Grid>
        </Box>
    );
}

export default SearchConditions;