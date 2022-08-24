import {StyledMenu,StyledMenuItem} from '../../Components/StyledMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv,faFileExcel,faRuler } from '@fortawesome/free-solid-svg-icons';
import Icon from '@mui/material/Icon';
import SaveIcon from '@mui/icons-material/Save';
import CachedIcon from '@mui/icons-material/Cached';
import { indexRequest } from '../../apiroute';
import { useSelector,useDispatch } from 'react-redux';
import { setRuler } from "../../Redux/Reducers/IndexReducer";
import CommonUtil from '../../Common/CommonUtil';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    MenuItem: {
        textAlign: "center"
    },
  });

const ContextMenu = ({ popupstate,chartData,chartName,setIndivisualSearchState,autoUpdate,setAutoUpdate,...other }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const tabValue = useSelector((state) => state.index.tabValue);
    const layouts = useSelector((state)=>state.index.layouts);

    const handleSave = ()=>{
        indexRequest.post('/SaveDashboardLayouts',{dashboard_id:tabValue,layouts:layouts}).then(function(){
            window.location.reload();
            popupstate.close();
        })
    }

    const handleUpdate = ()=>{
        setIndivisualSearchState();
        popupstate.close();
    }

    const handleRuler = ()=>{
        dispatch(setRuler());
        popupstate.close();
    }

    const handleAutoUpdate = ()=>{
        setAutoUpdate();
    }

    const handleExcel = (extension)=>{
        indexRequest.post('/Excel',{chartData:chartData,extension:extension},{responseType:'arraybuffer'}).then(function(response){
            const link = document.createElement("a");
            const blobData = new Blob([response.data], {
                type: CommonUtil.getMIMEType(extension)
            });
            link.download = `${chartName}.${extension}`;
            const url = URL.createObjectURL(blobData);
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            popupstate.close();
        });
       
    }
    return (
        <StyledMenu {...other}>
           <StyledMenuItem className={classes.MenuItem} onClick={()=>handleExcel("csv")}> <Icon style={{height:"1.2em"}}><FontAwesomeIcon icon={faFileCsv}/></Icon></StyledMenuItem>
           <StyledMenuItem className={classes.MenuItem} onClick={()=>handleExcel("xlsx")}><Icon style={{height:"1.2em"}}><FontAwesomeIcon icon={faFileExcel}/></Icon> </StyledMenuItem>
           <StyledMenuItem className={classes.MenuItem} onClick={handleSave}> <SaveIcon/></StyledMenuItem>
           <StyledMenuItem className={classes.MenuItem} onClick={handleUpdate}><CachedIcon/></StyledMenuItem>
           <StyledMenuItem className={classes.MenuItem} onClick={handleAutoUpdate}>{autoUpdate?<AlarmOffIcon/>:<AlarmOnIcon/>}</StyledMenuItem>
           <StyledMenuItem className={classes.MenuItem} onClick={handleRuler}><Icon style={{height:"1.2em"}}><FontAwesomeIcon icon={faRuler}/></Icon></StyledMenuItem>
        </StyledMenu>
    );
};

export default ContextMenu;