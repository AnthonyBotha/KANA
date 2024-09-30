import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { getItems } from "../../../redux/inventory";
import ManageItemModal from "../ItemModal";
import UserDashboard from "../../UserDashboard/UserDashboard";
import SmallWhiteLogo from '../../../static/SmallLogoWhite.png';
import '../ItemsPage.css'


function EquipmentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isLoading,setLoading] = useState(true)
  const { setModalContent } = useModal();
  const sessionUser = useSelector(state => state.session.user);

  const inventory = useSelector(state => state.inventory);



  //Off-Hand Items,Armor,Helmets, Weapons, Back Accessories, Head Accessory, Body Accessory, Eyewear,

  const inventoryArr = Object.values(inventory).filter(item => item.equipment == true);


  const armorArr = inventoryArr.filter(item => item.type === "armor");

  const helmetsArr = inventoryArr.filter(item => item.type === "helmet");

  const shieldsArr = inventoryArr.filter(item => item.type === "off hands");

  const weaponsArr = inventoryArr.filter(item => item.type === "weapon");

  const backAccessoriesArr = inventoryArr.filter(item => item.type === "back");

  const bodyAccessoriesArr = inventoryArr.filter(item => item.type === "body");

  const headAccessoriesArr = inventoryArr.filter(item => item.type === "hat");

  const eyewearArr = inventoryArr.filter(item => item.type === "eyewear");

  const [currentBatchArmor, setCurrentBatchArmor] = useState(0); // Batch tracker for Armor array
  const [currentBatchHelmets, setCurrentBatchHelmets] = useState(0); // Batch tracker for Helmets array
  const [currentBatchShields, setCurrentBatchShields] = useState(0); // Batch tracker for Shields array
  const [currentBatchWeapons, setCurrentBatchWeapons] = useState(0); // Batch tracker for Weapons array
  const [currentBatchBackAcc, setCurrentBatchBackAcc] = useState(0); // Batch tracker for Back Accessories array
  const [currentBatchBodyAcc, setCurrentBatchBodyAcc] = useState(0); // Batch tracker for Body Accessories array
  const [currentBatchHeadAcc, setCurrentBatchHeadAcc] = useState(0); // Batch tracker for Head Accessories array
  const [currentBatchEyewear, setCurrentBatchEyewear] = useState(0); // Batch tracker for Eyewear Accessories array


  const [batchSize, setBatchSize] = useState(5);

  const visibleArmor = useMemo(() => {
    return armorArr.slice(currentBatchArmor * batchSize, (currentBatchArmor + 1) * batchSize);
  }, [armorArr, currentBatchArmor, batchSize]);

  const visibleHelmets = useMemo(() => {
    return helmetsArr.slice(currentBatchHelmets * batchSize, (currentBatchHelmets + 1) * batchSize);
  }, [helmetsArr, currentBatchHelmets, batchSize]);

  const visibleShields = useMemo(() => {
    return shieldsArr.slice(currentBatchShields * batchSize, (currentBatchShields + 1) * batchSize);
  }, [shieldsArr, currentBatchShields, batchSize]);

  const visibleWeapons = useMemo(() => {
    return weaponsArr.slice(currentBatchWeapons * batchSize, (currentBatchWeapons + 1) * batchSize);
  }, [weaponsArr, currentBatchWeapons, batchSize]);

  const visibleBackAcc = useMemo(() => {
    return backAccessoriesArr.slice(currentBatchBackAcc * batchSize, (currentBatchBackAcc + 1) * batchSize);
  }, [backAccessoriesArr, currentBatchBackAcc, batchSize]);

  const visibleBodyAcc = useMemo(() => {
    return bodyAccessoriesArr.slice(currentBatchBodyAcc * batchSize, (currentBatchBodyAcc + 1) * batchSize);
  }, [bodyAccessoriesArr, currentBatchBodyAcc, batchSize]);

  const visibleHeadAcc = useMemo(() => {
    return headAccessoriesArr.slice(currentBatchHeadAcc * batchSize, (currentBatchHeadAcc + 1) * batchSize);
  }, [headAccessoriesArr, currentBatchHeadAcc, batchSize]);

  const visibleEyewear = useMemo(() => {
    return eyewearArr.slice(currentBatchEyewear * batchSize, (currentBatchEyewear + 1) * batchSize);
  }, [eyewearArr, currentBatchEyewear, batchSize]);

  useEffect(() => {
    let isMounted = true;

    const checkSession = () => {
      if(!sessionUser)navigate('/')
      else setLoading(false)
    }

    if (isMounted) {
      dispatch(getItems()).then(() => checkSession());
    }

    // Function to calculate and set batch size based on screen width
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

  }, [dispatch,navigate,sessionUser]);

  const loadNextBatchArmor = (direction) => {
    let newBatch = direction === "right" ? currentBatchArmor + 1 : currentBatchArmor - 1;
    if (newBatch < 0 || newBatch * batchSize >= armorArr.length) return;

    setCurrentBatchArmor(newBatch);
  }

  const loadNextBatchHelmets = (direction) => {
    let newBatch = direction === "right" ? currentBatchHelmets + 1 : currentBatchHelmets - 1;
    if (newBatch < 0 || newBatch * batchSize >= helmetsArr.length) return;

    setCurrentBatchHelmets(newBatch);
  }

  const loadNextBatchShields = (direction) => {
    let newBatch = direction === "right" ? currentBatchShields + 1 : currentBatchShields - 1;
    if (newBatch < 0 || newBatch * batchSize >= shieldsArr.length) return;

    setCurrentBatchShields(newBatch);
  }

  const loadNextBatchWeapons = (direction) => {
    let newBatch = direction === "right" ? currentBatchWeapons + 1 : currentBatchWeapons - 1;
    if (newBatch < 0 || newBatch * batchSize >= weaponsArr.length) return;

    setCurrentBatchWeapons(newBatch);
  }

  const loadNextBatchBackAcc = (direction) => {
    let newBatch = direction === "right" ? currentBatchBackAcc + 1 : currentBatchBackAcc - 1;
    if (newBatch < 0 || newBatch * batchSize >= backAccessoriesArr.length) return;

    setCurrentBatchBackAcc(newBatch);
  }

  const loadNextBatchBodyAcc = (direction) => {
    let newBatch = direction === "right" ? currentBatchBodyAcc + 1 : currentBatchBodyAcc - 1;
    if (newBatch < 0 || newBatch * batchSize >= bodyAccessoriesArr.length) return;

    setCurrentBatchBodyAcc(newBatch);
  }

  const loadNextBatchHeadAcc = (direction) => {
    let newBatch = direction === "right" ? currentBatchHeadAcc + 1 : currentBatchHeadAcc - 1;
    if (newBatch < 0 || newBatch * batchSize >= headAccessoriesArr.length) return;

    setCurrentBatchHeadAcc(newBatch);
  }

  const loadNextBatchEyewear = (direction) => {
    let newBatch = direction === "right" ? currentBatchEyewear + 1 : currentBatchEyewear - 1;
    if (newBatch < 0 || newBatch * batchSize >= eyewearArr.length) return;

    setCurrentBatchEyewear(newBatch);
  }

  if(isLoading) return <h1>Loading...</h1>

  return (
    <>
      <div className="blackBackground">

      <UserDashboard />

        <div className="leftPageBorder items-container">
          <div className="items-page-header">
            <h2 className="items-heading font purpleFont">Equipment</h2>
            <div className="inventory-headings">
              <NavLink
                to="/inventory/items"
                className="inventory-navlink font whiteFont littleBottomMargin littleTopMargin"
              >
                Items
              </NavLink>
              <NavLink
                to="/inventory/equipment"
                className={({ isActive }) => {
                  if (isActive) {
                    return "inventory-navlink font purpleFont littleBottomMargin littleTopMargin active-link disabled-link";
                  }
                  return "inventory-navlink font whiteFont littleBottomMargin littleTopMargin";
                }}

              >
                Equipment
              </NavLink>

            </div>

          </div>


          {/* Armor Carousel */}
          <h4 className="font whiteFont item-title">Armor</h4>
          {armorArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchArmor("left")}
                disabled={currentBatchArmor === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleArmor.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} equipped={item.equipped} equipment={item.equipment} />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>


                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchArmor("right")}
                disabled={(currentBatchArmor + 1) * batchSize >= armorArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Helmets Carousel */}
          <h4 className="font whiteFont item-title">Helmets</h4>
          {helmetsArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchHelmets("left")}
                disabled={currentBatchHelmets === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleHelmets.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} equipped={item.equipped} equipment={item.equipment}  />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>


                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchHelmets("right")}
                disabled={(currentBatchHelmets + 1) * batchSize >= helmetsArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Shields Carousel */}
          <h4 className="font whiteFont item-title">Shields</h4>
          {shieldsArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchShields("left")}
                disabled={currentBatchShields === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleShields.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} equipped={item.equipped} equipment={item.equipment}   />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>


                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchShields("right")}
                disabled={(currentBatchShields + 1) * batchSize >= shieldsArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Weapons Carousel */}
          <h4 className="font whiteFont item-title">Weapons</h4>
          {weaponsArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchWeapons("left")}
                disabled={currentBatchWeapons === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleWeapons.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} equipped={item.equipped} equipment={item.equipment}  />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>


                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchWeapons("right")}
                disabled={(currentBatchWeapons + 1) * batchSize >= weaponsArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Back Accessories Carousel */}
          <h4 className="font whiteFont item-title">Back Accessories</h4>
          {backAccessoriesArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchBackAcc("left")}
                disabled={currentBatchBackAcc === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleBackAcc.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} equipped={item.equipped} equipment={item.equipment}   />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchBackAcc("right")}
                disabled={(currentBatchBackAcc + 1) * batchSize >= backAccessoriesArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Body Accessories Carousel */}
          <h4 className="font whiteFont item-title">Body Accessories</h4>
          {bodyAccessoriesArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchBodyAcc("left")}
                disabled={currentBatchBodyAcc === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleBodyAcc.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} equipped={item.equipped}  equipment={item.equipment} />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchBodyAcc("right")}
                disabled={(currentBatchBodyAcc + 1) * batchSize >= bodyAccessoriesArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Head Accessories Carousel */}
          <h4 className="font whiteFont item-title">Head Accessories</h4>
          {headAccessoriesArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchHeadAcc("left")}
                disabled={currentBatchHeadAcc === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleHeadAcc.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} equipped={item.equipped} equipment={item.equipment}  />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchHeadAcc("right")}
                disabled={(currentBatchHeadAcc + 1) * batchSize >= headAccessoriesArr.length}
              >
                &gt;
              </button>
            </div>
          ) : (<p className="no-items">You dont own any of these.</p>)}
          {/* Eyewear Carousel */}
          <h4 className="font whiteFont item-title">Eyewear</h4>
          {eyewearArr.length > 0 ? (
            <div className="carousel-container">
              <button
                className="carousel-arrow left"
                onClick={() => loadNextBatchEyewear("left")}
                disabled={currentBatchEyewear === 0}
              >
                &lt;
              </button>
              <div className="inventory-carousel">
                {visibleEyewear.map(item => (
                  <div key={item.id} className="inventory-card">
                    <div
                      className="inventory-card-content"
                      onClick={() => setModalContent(<ManageItemModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost} equipped={item.equipped}  equipment={item.equipment} />)}
                    >
                      <img src={item.itemImg} alt={item.name} className="inventory-image" />
                      <h5 className="inventory-name">{item.name}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow right"
                onClick={() => loadNextBatchEyewear("right")}
                disabled={(currentBatchEyewear + 1) * batchSize >= eyewearArr.length}
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

export default EquipmentPage;
