import React from "react";
import ramen_menu1 from "../images/ramen_menu1.png";
import ramen_menu2 from "../images/ramen_menu2.png";

const Menu = () => {
    return (
        <>
            <div className="menuBackgorund">
                <h1>MENU</h1>
                <img className="ramen_menu1" src={ramen_menu1} alt="amen_menu1" />
                <img className="ramen_menu2" src={ramen_menu2} alt="amen_menu2" />
            </div>
        </>

    );
};

export default Menu;