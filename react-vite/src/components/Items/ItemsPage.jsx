import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getUserInventory } from "../../redux/inventory";
import ManageItemModal from "./ItemModal";
import "./ItemsPage.css"

function ItemsPage() {
  const dispatch = useDispatch();
  const  { setModalContent } = useModal();
  const sessionUser = useSelector(state => state.session.user);

  // const inventory = useSelector(state => state.inventory);

  const inventoryDictionary = {
    1: {
      'id': 1,
      'name': "yellow dragon",
      'type': "special",
      'description': "It's a special friend and pet. It's a Dragon!!! Everyone wants a dragon thats yellow.",
      'equipment': false,
      'cost': 30,
      'itemImg': "https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331484/Yellow_Baby_Dragon_tbk3l1.png"
    },
    2: {
      'id': 1,
      'name': "yellow dragon",
      'type': "egg",
      'description': "It's a special friend and pet. It's a Dragon!!! Everyone wants a dragon thats yellow.",
      'equipment': false,
      'cost': 30,
      'itemImg': "https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331484/Yellow_Baby_Dragon_tbk3l1.png"
    },
    3: {
      'id': 1,
      'name': "yellow dragon",
      'type': "potion",
      'description': "It's a special friend and pet. It's a Dragon!!! Everyone wants a dragon thats yellow.",
      'equipment': false,
      'cost': 30,
      'itemImg': "https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331484/Yellow_Baby_Dragon_tbk3l1.png"
    },
    4: {
      'id': 1,
      'name': "yellow dragon",
      'type': "food",
      'description': "It's a special friend and pet. It's a Dragon!!! Everyone wants a dragon thats yellow.",
      'equipment': false,
      'cost': 30,
      'itemImg': "https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331484/Yellow_Baby_Dragon_tbk3l1.png"
    }
  }

  const inventoryArr = Object.values(inventoryDictionary);

  const eggsArr = inventoryArr.filter(item => item.type === "egg");

  const potionArr = inventoryArr.filter(item => item.type === "potion");

  const foodArr = inventoryArr.filter(item => item.type === "food");

  const specialArr = inventoryArr.filter(item => item.type === "special");

  const [currentBatchEggs, setCurrentBatchEggs] = useState(0); // Batch tracker for Eggs array
  const [currentBatchPotion, setCurrentBatchPotion] = useState(0); // Batch tracker for Potion array
  const [currentBatchFood, setCurrentBatchFood] = useState(0); // Batch tracker for Food array
  const [currentBatchSpecial, setCurrentBatchSpecial] = useState(0); // Batch tracker for Special array
  const [batchSize, setBatchSize] = useState(5);

  const visibleEggs = useMemo(() => {
    return eggsArr.slice(currentBatchEggs * batchSize, (currentBatchEggs + 1) * batchSize);
  }, [eggsArr, currentBatchEggs, batchSize]);

  // const visiblePotion = useMemo(() => {
  //   return potionArr.slice(currentBatchPotion * batchSize, (currentBatchPotion + 1) * batchSize);
  // }, [potionArr, currentBatchPotion, batchSize]);

  // const visibleFood = useMemo(() => {
  //   return foodArr.slice(currentBatchFood * batchSize, (currentBatchFood + 1) * batchSize);
  // }, [foodArr, currentBatchFood, batchSize]);

  // const visibleSpecial = useMemo(() => {
  //   return specialArr.slice(currentBatchSpecial * batchSize, (currentBatchSpecial + 1) * batchSize);
  // }, [specialArr, currentBatchSpecial, batchSize]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(getUserInventory());
    }

    // Function to calculate and set batch size based on screen width
    const updateBatchSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1200) {
        setBatchSize(5);
      } else if (screenWidth >= 900) {
        setBatchSize(4);
      } else if (screenWidth >= 600) {
        setBatchSize(3);
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

  }, [dispatch]);

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
      <div className="fullScreen black">

        {/* user dashboard */}
        <div className="displayFlex leftPageBorder rightPageBorder spaceBetween littleTopPadding">
          {/* Avatar */}
          <div className="darkGrey littleRightMargin">
            AVATAR PLACEHOLDER
          </div>

          {/* User info and stats */}
          <div className="littleRightMargin">
            <p className="font purpleFont xx-largeFont">{sessionUser.username}!</p>
            <p className="font purpleFont mediumFont">Level: {sessionUser.level}</p>
            <p className="white">experience: {sessionUser.experience}</p>
            <p className="white">health: {sessionUser.health}</p>
          </div>

          {/* Items and equipment dashboard */}
          <div className="almostBlack itemDashboard">
            <p className="whiteFont">IMPORT ITEMS & EQUIPMENT COMPONENT</p>
          </div>
        </div>
        <div className="leftPageBorder items-container">
          <h2 className="font purpleFont">Items</h2>
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
                  onClick={() => loadNextBatchEggs("right")}
                  disabled={(currentBatchEggs + 1) * batchSize >= eggsArr.length}
                >
                  &gt;
                </button>
              </div>
            ) : (<p className="no-items">You dont own any of these.</p>)}
          </div>

        </div>

    </>
  )
}
export default ItemsPage;