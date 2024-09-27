import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect,useState } from "react";
import { getItems } from "../../redux/inventory";
import { BsCoin } from "react-icons/bs";
import "./EquippedItems.css"
import ManageEquippedModal from "./EquippedModal";
import { useLocation, useNavigate } from "react-router-dom";


function EquipedItems(){
    const dispatch = useDispatch()
    const user_items = useSelector(state => state.inventory)
    const itemsArray = Object.values(user_items).filter(item => item.equipped == true && item.equipment == false)
    const {setModalContent} = useModal();
    const [inventory,setInventory] = useState([])
    const [activeTab,setTab] = useState('items')
    const placeHolderCount  = 8;



    useEffect(() => {
        dispatch(getItems())
    },[dispatch,itemsArray.length])

    useEffect(() => {
        updateInventory()
    },[user_items,activeTab])





    const updateInventory = () => {
        const itemsArray = Object.values(user_items).filter(item => item.equipped === true);
        let filteredArray;

        if (activeTab === 'equipment') {
            filteredArray = itemsArray.filter(item => item.equipment === true);
        } else filteredArray = itemsArray.filter(item => item.equipment === false);
        setInventory(filteredArray);
    };

    const changeToItems = () => {
        setTab('items')
    }

    const changeToEquipment = () => {
        setTab('equipment')
    }


    const renderPlaceholders = () => {
        const placeholders = [];
        for (let i = 0; i < placeHolderCount; i++) {
            placeholders.push(
                <div key={i} className="equipped-card placeholder">
                    <div className="placeholder-content">
                        <h5 className="placeholder-name">Item Needed</h5>
                    </div>
                </div>
            );
        }
        return placeholders;
    };

    return(
        <>
            <div className="displayFlex alignBottom spaceBetween">
                <h2 className="font purpleFont">Equipped Items</h2>

                <div className="displayFlex littlePadding">
                    <p onClick={changeToItems} className="fontLight whiteFont smallFont littlePadding">Items</p>
                    <p onClick={changeToEquipment} className="fontLight whiteFont smallFont littlePadding">Equipment</p>
                </div>
            </div>

                <div className="equipped-container">
                {inventory.length > 0 ? (
                    <div className="equipped-carousel">
                        {inventory.map(item => (
                            <div key={item.id} className="equipped-card">
                                <div onClick={() => setModalContent(<ManageEquippedModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost}/>)}>
                                    <img src={item.itemImg} alt={item.name} className="reward-image" />
                                    <h5 className="reward-name">{item.name}</h5>
                                    <div className="reward-name"><BsCoin className="yellowFont" />{item.cost}</div>
                                </div>
                            </div>
                        ))}
                        {/* Render placeholders if inventory length is less than PLACEHOLDER_COUNT */}
                        {inventory.length < placeHolderCount && renderPlaceholders().slice(0, placeHolderCount - inventory.length)}
                    </div>
                ) : (
                    <div className="equipped-carousel">
                        {renderPlaceholders()}
                    </div>
                )}
            </div>
        </>
    )
}


export default EquipedItems
