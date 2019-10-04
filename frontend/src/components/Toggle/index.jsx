import React from 'react';
import classNames from 'classnames';

const Toggle = ({clickHandler, text, icon, active, large, disable}) => {
    const buttonClass = classNames({
        'btn': true,
        'btn-outline-secondary': true,
        large        
    });
    const iconClass = `fa fa-fw fa-${icon}`;

    if(disable){
        return (
            <button type="button" disabled className={buttonClass} onClick={clickHandler}>
              <i className={iconClass} />
              {text}
            </button>
        );
    }else{
        return (
            <button type="button" className={buttonClass} onClick={clickHandler}>
              <i className={iconClass} />
              {text}
            </button>
        );
    }
};

export default Toggle;
