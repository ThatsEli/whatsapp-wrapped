import { Component, JSX } from "solid-js";
import './Page.css';

export const Page: Component<{children?: JSX.Element}> = (props) => {
    // return <div style={{height: '100vh', width: '100vw', "scroll-snap-align": 'start', "scroll-snap-stop": 'always', display: 'flex', "align-items": 'center', "flex-direction": "column"}}>{props.children}</div>;
    return <div class="pageContainer">
        {props.children}
        <div style={{height: '15vh'}} ></div>
    </div>;
};