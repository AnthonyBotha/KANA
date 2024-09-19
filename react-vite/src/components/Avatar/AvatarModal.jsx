// import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAvatarAntennas, getAvatarBackgrounds, getAvatarEars, getAvatarEyes, getAvatarHeads, getAvatarMouths, getAvatarNecks, getAvatarNoses } from '../../redux/avatarpart';
import { getAvatar, createNewAvatar, deleteExistingAvatar, updateExistingAvatar  } from '../../redux/avatar';
import "./AvatarModal.css"


function AvatarModal() {
  const dispatch = useDispatch();
  const [avatarParts, setAvatarParts] = useState({});
  const [selectedPart, setSelectedPart] = useState("head");
  const [activePartItem, setActivePartItem] = useState(null);
  

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

    dispatch(getAvatar());
  }, [dispatch]);

  // useEffect(() => {
  //   if (avatar) {
  //     setAvatarParts({
        
  //     })
  //   }
  // })


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

  const user = useSelector(state => state.session.user);

  const avatar = useSelector(state => state.avatar)

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
      background_id: getRandomElement(Object.values(backgrounds)).id,
      antenna_id: getRandomElement(Object.values(antennas)).id,
      head_id: getRandomElement(Object.values(heads)).id,
      eyes_id: getRandomElement(Object.values(eyes)).id,
      ears_id: getRandomElement(Object.values(ears)).id,
      nose_id: getRandomElement(Object.values(noses)).id,
      mouth_id: getRandomElement(Object.values(mouths)).id,
      neck_id: getRandomElement(Object.values(necks)).id,
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

  const handlePartItemClick = (partItem) => {
    setActivePartItem(partItem); //Set active part item
    setAvatarParts(prev => ({
      ...prev,
      [`${selectedPart}_id`]: partItem.id
    }));
  };

  const handleSaveAvatar = () => {
    console.log("Avatar Parts:",avatarParts);
    if (Object.values(avatar).length > 0) {
      dispatch(updateExistingAvatar(avatar.id,avatarParts));
    } else {
      dispatch(createNewAvatar(avatarParts));
    }
  }

  const handleDeleteAvatar = () => {
    dispatch(deleteExistingAvatar(avatar.id));
  };

  // Mapping part IDs to image Urls for display
  const getPartImageUrl = (partType, partId) => {
    const parts = {
      background: backgrounds,
      antenna: antennas,
      head: heads,
      eyes: eyes,
      ears: ears,
      nose: noses,
      mouth: mouths,
      neck: necks
    };

    const partArray = Object.values(parts[partType] || {});
    const part = partArray.find(part => part.id === partId);

    //Return image Url if found, else return empty string
    return part ? part.imgUrl : "";
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="welcome-text">Welcome, {user.username}</h2>
        {avatar && (
          <h4 className="delete-avatar" onClick={handleDeleteAvatar}>Delete Avatar</h4>
        )}
      </div>
      <div className="avatar-container">
        <img src={getPartImageUrl("background",avatarParts.background_id)} className="avatar-background" />
        <img src={getPartImageUrl("antenna",avatarParts.antenna_id)} className="avatar-antenna" />
        <img src={getPartImageUrl("head",avatarParts.head_id)} className="avatar-head" />
        <img src={getPartImageUrl("eyes",avatarParts.eyes_id)} className="avatar-eyes" />
        <img src={getPartImageUrl("ears",avatarParts.ears_id)} className="avatar-ears" />
        <img src={getPartImageUrl("nose",avatarParts.nose_id)} className="avatar-nose" />
        <img src={getPartImageUrl("mouth",avatarParts.mouth_id)} className="avatar-mouth" />
        <img src={getPartImageUrl("neck",avatarParts.neck_id)} className="avatar-neck" />
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
            <div key={part}
              className={`part-item ${activePartItem === displayParts()[part] ? "active-part-item" : ""}`}
              onClick={() => handlePartItemClick(displayParts()[part])}>
              <img src={displayParts()[part]?.imgUrl} alt={part} />
            </div>
          ))}

        </div>
        
      </div>
      <button className="save-button" onClick={handleSaveAvatar}>Save</button>
    </div>
  )
}

export default AvatarModal;