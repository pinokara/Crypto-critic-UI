import React from "react";
import {CSSTransition} from "react-transition-group";

const Slide = ({children,className,timeout,...props}) => {
    return (
        <CSSTransition
            {...props}
            timeout={timeout}
            classNames={className}
        >
            {children}
        </CSSTransition>
    );
};

export {Slide};