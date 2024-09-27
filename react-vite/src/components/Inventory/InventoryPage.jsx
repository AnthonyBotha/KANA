import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { getItems } from "../../redux/inventory";
import { useModal } from "../../context/Modal";

import ManageItemModal from "./ItemModal";
import UserDashboard from "../UserDashboard/UserDashboard";
import SmallWhiteLogo from '../../static/SmallLogoWhite.png';
import "./ItemsPage.css"

function ItemsPage() {
  const dispatch = useDispatch()
  const user_items = useSelector(state => state.inventory)
  const itemsArray = Object.values(user_items).filter(item => item.equipment == false)
  // const sessionUser = useSelector(state => state.session.user);
  const { setModalContent } = useModal();

  console.log(itemsArray)

  const eggsArr = itemsArray.filter(item => item.type === "egg");

  const potionArr = itemsArray.filter(item => item.type === "potion");

  const foodArr = itemsArray.filter(item => item.type === "food");

  const specialArr = itemsArray.filter(item => item.type === "special");


  const [currentBatchEggs, setCurrentBatchEggs] = useState(0); // Batch tracker for Eggs array
  const [currentBatchPotion, setCurrentBatchPotion] = useState(0); // Batch tracker for Potion array
  const [currentBatchFood, setCurrentBatchFood] = useState(0); // Batch tracker for Food array
  const [currentBatchSpecial, setCurrentBatchSpecial] = useState(0); // Batch tracker for Special array
  const [batchSize, setBatchSize] = useState(5);

  const visibleEggs = useMemo(() => {
    return eggsArr.slice(currentBatchEggs * batchSize, (currentBatchEggs + 1) * batchSize);
  }, [eggsArr, currentBatchEggs, batchSize]);

  const visiblePotion = useMemo(() => {
    return potionArr.slice(currentBatchPotion * batchSize, (currentBatchPotion + 1) * batchSize);
  }, [potionArr, currentBatchPotion, batchSize]);

  const visibleFood = useMemo(() => {
    return foodArr.slice(currentBatchFood * batchSize, (currentBatchFood + 1) * batchSize);
  }, [foodArr, currentBatchFood, batchSize]);

  const visibleSpecial = useMemo(() => {
    return specialArr.slice(currentBatchSpecial * batchSize, (currentBatchSpecial + 1) * batchSize);
  }, [specialArr, currentBatchSpecial, batchSize]);


  useEffect(() => {
    let isMounted = true;

    if (isMounted) dispatch(getItems())


    const updateBatchSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1200) {
        setBatchSize(12);
      } else if (screenWidth >= 900) {
        setBatchSize(8);
      } else if (screenWidth >= 600) {
        setBatchSize(4);
      } else {
        setBatchSize(2);
      }
    };

    // Set initial batch size and add resize listener
    updateBatchSize();
    window.addEventListener("resize", updateBatchSize);

    // Cleanup listener on component unmount
    return () => {
      isMounted = false;
      window.removeEventListener("resize", updateBatchSize);
    }
  }, [dispatch])




  if (!itemsArray.length) return <h1>Loading...</h1>



  const loadNextBatchEggs = (direction) => {
    let newBatch = direction === "right" ? currentBatchEggs + 1 : currentBatchEggs - 1;
    if (newBatch < 0 || newBatch * batchSize >= eggsArr.length) return;

    setCurrentBatchEggs(newBatch);
  }

  const loadNextBatchPotion = (direction) => {
    let newBatch = direction === "right" ? currentBatchPotion + 1 : currentBatchPotion - 1;
    if (newBatch < 0 || newBatch * batchSize >= potionArr.length) return;

    setCurrentBatchPotion(newBatch);
  }

  const loadNextBatchFood = (direction) => {
    let newBatch = direction === "right" ? currentBatchFood + 1 : currentBatchFood - 1;
    if (newBatch < 0 || newBatch * batchSize >= foodArr.length) return;

    setCurrentBatchFood(newBatch);
  }

  const loadNextBatchSpecial = (direction) => {
    let newBatch = direction === "right" ? currentBatchSpecial + 1 : currentBatchSpecial - 1;
    if (newBatch < 0 || newBatch * batchSize >= specialArr.length) return;

    setCurrentBatchSpecial(newBatch);
  }

  return (
    <>
      <div className="blackBackground">
        <UserDashboard />
        <div className="leftPageBorder items-container">
          <div className="items-page-header">
            <h2 className="items-heading font purpleFont">Items</h2>
            <div className="inventory-headings">
              <NavLink
                to="/inventory/items"
                className={({ isActive }) => {
                  if (isActive) {
                    return "inventory-navlink font purpleFont littleBottomMargin littleTopMargin active-link disabled-link";
                  }
                  return "inventory-navlink font whiteFont littleBottomMargin littleTopMargin";
                }}
              >
                Items
              </NavLink>
              <NavLink
                to="/inventory/equipment"
                className="inventory-navlink font whiteFont littleBottomMargin littleTopMargin"
              >
                Equipment
              </NavLink>

            </div>

          </div>


          {/* Eggs Carousel */}
          <h4 className="font whiteFont item-title">Eggs</h4>
          {eggsArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchEggs("left")}
                disabled={currentBatchEggs === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleEggs.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} equipped={item.equipped} />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>


                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchEggs("right")}
                disabled={(currentBatchEggs + 1) * batchSize >= eggsArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Potions Carousel */}
          <h4 className="font whiteFont item-title">Potions</h4>
          {potionArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchPotion("left")}
                disabled={currentBatchPotion === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visiblePotion.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>


                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchPotion("right")}
                disabled={(currentBatchPotion + 1) * batchSize >= potionArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Food Carousel */}
          <h4 className="font whiteFont item-title">Food</h4>
          {foodArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchFood("left")}
                disabled={currentBatchFood === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleFood.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>


                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchFood("right")}
                disabled={(currentBatchFood + 1) * batchSize >= foodArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Special Carousel */}
          <h4 className="font whiteFont item-title">Special</h4>
          {specialArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchSpecial("left")}
                disabled={currentBatchSpecial === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleSpecial.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>


                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchSpecial("right")}
                disabled={(currentBatchSpecial + 1) * batchSize >= specialArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
        </div>

        {/* footer */}
        <div className="black displayFlex alignBottom spaceBetween littleBottomPadding">
          <p className='leftPageBorder font whiteFont smallFont noMargin'>© 2024 KANA. All rights reserved.</p>
          <img className="smallLogo" src={SmallWhiteLogo} />
          <a className="rightPageBorder fontLight whiteFont smallFont" href='https://github.com/AnthonyBotha/KANA/wiki'>GitHub</a>
        </div>

      </div>

    </>
  )
}

export default ItemsPage;
