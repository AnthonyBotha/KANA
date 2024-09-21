import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./InventorySelection.css"


function InventorySelectionButton() {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu)
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    return (
        <div className="inventory-selection-container">
            <span
                className="inventory-text fontLight largeFont whiteFont leftMargin"
                onClick={toggleMenu}
            >
                Inventory
            </span>
            {showMenu && (
                <ul className="inventory-dropdown lightGrey removeDecorations dropShadow largeRightPadding littleTopPadding littleBottomPadding" ref={ulRef}>
                    <>
                        <NavLink to="/items" className="inventory-navlink font whiteFont littleBottomMargin littleTopMargin">Items</NavLink>
                        <NavLink to="/equipment" className="inventory-navlink font whiteFont littleBottomMargin">Equipment</NavLink>
                    </>
                </ul>

            )}
        </div>
    );
}

export default InventorySelectionButton;
