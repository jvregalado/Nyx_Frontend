import React from 'react';
import {Select} from '../../select'
import {setValue} from '../../../store/filters';
import {useSelector,useDispatch} from 'react-redux';


const SelectFilter = ({
    column:{filterValue, preFilteredRows, setFilter},
    variant,
    label,
    name,
}) => {

    const reducer = useSelector(state => state.filters)
    const dispatch = useDispatch();

    React.useEffect(()=>{
        setFilter(reducer[variant])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
       <Select
            label={label}
            name={name}
            type={variant}
            value={filterValue }
            handleChange={(e)=>{
                setFilter(e || undefined)
                dispatch(setValue({
                    variant,
                    value:e||undefined
               }))
            }}
       />
    )
}

export default SelectFilter
