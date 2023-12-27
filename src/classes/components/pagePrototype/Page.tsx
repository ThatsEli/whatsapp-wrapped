import { Component, JSX } from "solid-js";
import './Page.css';

export const Page: Component<{ children?: JSX.Element }> = (props) => {
    return <div class="pageContainer">
        {props.children}
        <div style={{ height: '15vh' }} ></div>
        
    </div>;
};