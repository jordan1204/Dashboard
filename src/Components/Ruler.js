import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    ruler:{
        width:'calc(100% - 20px)',
        height:'20px',
        position:'relative',
        borderTopStyle:'solid',
        borderTopWidth:'1px',
        marginLeft:'10px',
        margiRight:'10px',
        marginBottom:'15px'
    },
    cm:{
        height:'20px',
        borderLeft: '1px solid #555',
        width:props=>`${100/props}%`,
        position:'absolute',
        '&:after':{
            position: 'absolute',
            bottom: '-15px',
            font: '11px/1 sans-serif',
        },
        
    }
});
const asds = makeStyles({
    root:{
        display:props=>props.display,
        left:props=>props.left,
    }
});
function RulerItem(props){
    const {index,amount,cm,content} = props;
    const styleProps = {
        left:index===0?'0%':`${100/amount*index}%`
      };
    const classes = asds(styleProps);
    return (<div className={`${classes.root} ${cm}`}>{content}</div>);
}
const Ruler = ({amount,display})=>{
    const classes = useStyles(amount);
    return (
        <div className={classes.ruler} style={{display:display?'block':'none'}}>
            {
                new Array(amount+1).fill(undefined).map(function(item,index){
                    let content  = null;
                    let returnobj = null;
                    if(index === amount-1){
                        content = <><div style={{float:"left"}}>{index}</div><div style={{float:"right"}}>{index+1}</div></>;
                        returnobj = <RulerItem key={index} index={index} amount={amount} cm={classes.cm} content={content}/>
                    }
                    else if(index === amount){
                        returnobj = <RulerItem key={index} index={index} amount={amount} cm={classes.cm} content={null}/>;
                    }
                    else{
                        content = <div style={{float:"left"}}>{index}</div>;
                        returnobj = <RulerItem key={index} index={index} amount={amount} cm={classes.cm} content={content}/>
                    }
                    return returnobj;
                })
            }
        </div>
    );
}

export default Ruler;