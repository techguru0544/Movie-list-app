import React, { useEffect, useState, useContext } from 'react'
import { GlobalContext } from './../../context/GlobalState';

const withActions = (WrappedComponent, type) => {

    function WithActions(props) {
        const container = React.createRef();

        const { allRatingList, genreList, filterMovies, updateRatingList, updateGenreList } = useContext(GlobalContext);

        const [showList, setShowList] = useState(false);

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
        })
    
        const handleClickOutside = (event) => {
            if (container.current && !container.current.contains(event.target)) {
              setShowList(false);
            }
        };
    
        const ShowHideList = () => {
            setShowList(!showList);            
        }

        const CheckboxChangedEvent = (e) => {
            const target = e.target;
            var value = target.value;
            
            let list = [];

            if (type === 'rating') {
                list = allRatingList;
                updateRatingList(list);
            }

            if (type === 'genre') {
                list = genreList;
                updateGenreList(list);
            }
            
            if (value === '' || value == 0) {
                list.filter(item => {
                    if (item.value == '' || item.value == 0) {
                        item.selected = target.checked;
                    } else {
                        item.selected = false;
                    }
                });
            } else {
                list.filter(item => {
                    if (item.value == '' || item.value == 0) {
                        item.selected = false;
                    }
                    if (value == item.value) {
                        item.selected = target.checked;
                    }
                });
            }            

            filterMovies();

        }

        return(
            <>
                <WrappedComponent
                    showHideList={ShowHideList}
                    sheckboxChangedEvent={CheckboxChangedEvent} 
                    container={container} 
                    showList={showList}                  
                    {...props}
                />
            </>
        )

    }
	return WithActions
}

export default withActions
