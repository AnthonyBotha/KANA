// import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAvatarAntennas, getAvatarBackgrounds, getAvatarEars, getAvatarEyes, getAvatarHeads, getAvatarMouths, getAvatarNecks, getAvatarNoses } from '../../redux/avatarpart';
import "./AvatarModal.css"



function AvatarModal() {
  const dispatch = useDispatch();
  const [avatarParts, setAvatarParts] = useState({});
  const [selectedPart, setSelectedPart] = useState("head");

  const headSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681230/robot_pzzvjx.png";
  const eyesSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681228/eyes_dfwlgi.png";
  const noseSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681229/nose_s6txb4.png";
  const mouthSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681228/mouth_bbipu0.png";
  const earsSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681228/ear_t2hbru.png";
  const antennaSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681227/antenna_sexrkd.png";
  const neckSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681229/neck_srubta.png";
  const backgroundSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681228/background_kf7kq5.png";
  // const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getAvatarAntennas());
    dispatch(getAvatarBackgrounds());
    dispatch(getAvatarEars());
    dispatch(getAvatarEyes());
    dispatch(getAvatarHeads());
    dispatch(getAvatarMouths());
    dispatch(getAvatarNecks());
    dispatch(getAvatarNoses());
  }, [dispatch]);


  //helper function to get a random element from an array
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const antennas = useSelector(state => state.avatarParts.antennas);

  const backgrounds = useSelector(state => state.avatarParts.backgrounds);

  const ears = useSelector(state => state.avatarParts.ears);

  const eyes = useSelector(state => state.avatarParts.eyes);

  const heads = useSelector(state => state.avatarParts.heads);

  const mouths = useSelector(state => state.avatarParts.mouths);

  const necks = useSelector(state => state.avatarParts.necks);

  const noses = useSelector(state => state.avatarParts.noses);



  // const handleSubmit = async (e) => {
  //   e.preventDefault();


  // const serverResponse = await dispatch(
  //   // Search for server things
  // );

  // if (serverResponse) {
  //   setErrors(serverResponse);
  // } else {
  //   closeModal();
  // }



  const generateAvatar = () => {
    setAvatarParts({
      background: getRandomElement(Object.values(backgrounds)).imgUrl,
      antenna: getRandomElement(Object.values(antennas)).imgUrl,
      head: getRandomElement(Object.values(heads)).imgUrl,
      eyes: getRandomElement(Object.values(eyes)).imgUrl,
      ears: getRandomElement(Object.values(ears)).imgUrl,
      nose: getRandomElement(Object.values(noses)).imgUrl,
      mouth: getRandomElement(Object.values(mouths)).imgUrl,
      neck: getRandomElement(Object.values(necks)).imgUrl,
    })
  }

  const displayParts = () => {
    switch (selectedPart) {
      case "head":
        return heads;
      case "eyes":
        return eyes;
      case "nose":
        return noses;
      case "mouth":
        return mouths;
      case "ears":
        return ears;
      case "antenna":
        return antennas;
      case "neck":
        return necks;
      case "background":
        return backgrounds;
      default:
        return [];
    }
  };


  return (
    <div className="modal">
      <div className="avatar-container">
        <img src={avatarParts.background} className="avatar-background" />
        <img src={avatarParts.antenna} className="avatar-antenna" />
        <img src={avatarParts.head} className="avatar-head" />
        <img src={avatarParts.eyes} className="avatar-eyes" />
        <img src={avatarParts.ears} className="avatar-ears" />
        <img src={avatarParts.nose} className="avatar-nose" />
        <img src={avatarParts.mouth} className="avatar-mouth" />
        <img src={avatarParts.neck} className="avatar-neck" />
      </div>
      <button className="auto-gen-button" onClick={generateAvatar}>Generate New Avatar</button>
      <div className="selection-menu">
        <div className="menu">
          <div className={`selection-item ${selectedPart === "head" ? "selected":""}`} onClick={() => {setSelectedPart("head")}}>
            <img src={headSelectionUrl} className="menu-head" alt="Head" />
            <h2>Head</h2>
          </div>
          <div className={`selection-item ${selectedPart === "eyes" ? "selected":""}`} onClick={() => setSelectedPart("eyes")}>
            <img src={eyesSelectionUrl} className="menu-eyes" alt="Eyes" />
            <h2>Eyes</h2>
          </div>
          <div className={`selection-item ${selectedPart === "nose" ? "selected":""}`} onClick={() => setSelectedPart("nose")}>
            <img src={noseSelectionUrl} className="menu-nose" alt="Nose" />
            <h2>Nose</h2>
          </div>
          <div className={`selection-item ${selectedPart === "mouth" ? "selected":""}`} onClick={() => setSelectedPart("mouth")}>
            <img src={mouthSelectionUrl} className="menu-mouth" alt="Mouth" />
            <h2>Mouth</h2>
          </div>
          <div className={`selection-item ${selectedPart === "ears" ? "selected":""}`} onClick={() => setSelectedPart("ears")}>
            <img src={earsSelectionUrl} className="menu-ears" alt="Ears" />
            <h2>Ears</h2>
          </div>
          <div className={`selection-item ${selectedPart === "antenna" ? "selected":""}`} onClick={() => setSelectedPart("antenna")}>
            <img src={antennaSelectionUrl} className="menu-antenna" alt="Antenna" />
            <h2>Antenna</h2>
          </div>
          <div className={`selection-item ${selectedPart === "neck" ? "selected":""}`} onClick={() => setSelectedPart("neck")}>
            <img src={neckSelectionUrl} className="menu-neck" alt="Neck" />
            <h2>Neck</h2>
          </div>
          <div className={`selection-item ${selectedPart === "background" ? "selected":""}`} onClick={() => setSelectedPart("background")}>
            <img src={backgroundSelectionUrl} className="menu-background" alt="Background" />
            <h2>Background</h2>
          </div>
        </div>
        <div className="parts-list">
          {Object.keys(displayParts()).map(part => (
            <div key={part} className="part-item">
              <img src={displayParts()[part]?.imgUrl} alt={part} />
            </div>
          ))}

        </div>
        
      </div>
      <button className="save-button">Save</button>
    </div>
  )
}

export default AvatarModal;