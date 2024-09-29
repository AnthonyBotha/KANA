// import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';
import { getAvatarAntennas, getAvatarBackgrounds, getAvatarEars, getAvatarEyes, getAvatarHeads, getAvatarMouths, getAvatarNecks, getAvatarNoses } from '../../redux/avatarpart';
import { getAvatar, createNewAvatar, deleteExistingAvatar, updateExistingAvatar } from '../../redux/avatar';

import "./AvatarModal.css"


function AvatarModal() {
  const dispatch = useDispatch();

  const [avatarParts, setAvatarParts] = useState({});
  const [selectedPart, setSelectedPart] = useState("head");
  const [activePartItem, setActivePartItem] = useState(null);
  const [errorFetchingAvatar, setErrorFetchingAvatar] = useState(false);

  const user = useSelector(state => state.session.user);
  const avatar = useSelector(state => state.avatar);


  const [userAvatar] = Object.values(avatar).filter(avatar => avatar.userId === user.id);


  const avatarDefaultUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726881553/user-avatar_clr2no.png";
  const headSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681230/robot_pzzvjx.png";
  const eyesSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681228/eyes_dfwlgi.png";
  const noseSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681229/nose_s6txb4.png";
  const mouthSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681228/mouth_bbipu0.png";
  const earsSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681228/ear_t2hbru.png";
  const antennaSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681227/antenna_sexrkd.png";
  const neckSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681229/neck_srubta.png";
  const backgroundSelectionUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1726681228/background_kf7kq5.png";
  const { closeModal } = useModal();

  useEffect(() => {
    const fetchAvatar = async () => {
      const response = await dispatch(getAvatar());

      if (!response.ok) {
        setErrorFetchingAvatar(true);
      }
    }
    fetchAvatar();
  }, [dispatch])

  useEffect(() => {

    dispatch(getAvatarAntennas());
    dispatch(getAvatarBackgrounds());
    dispatch(getAvatarEars());
    dispatch(getAvatarEyes());
    dispatch(getAvatarHeads());
    dispatch(getAvatarMouths());
    dispatch(getAvatarNecks());
    dispatch(getAvatarNoses());

    // dispatch(getAvatar());
  }, [dispatch]);



  // console.log("Avatar:", Object.values(avatar))
  // // console.log("User Avatar:",avatar[user] )
  // // const userAvatar = Object.values(avatar).filter(avatar => avatar.userId === )
  // console.log("User:",user);
  // console.log("AvatarId:",user.avatar.id)

  useEffect(() => {
    if (userAvatar && Object.keys(userAvatar).length > 0) {
      setAvatarParts(avatar[userAvatar.id]);
      setErrorFetchingAvatar(false);
    }
  }, [avatar, userAvatar])

  //Helper function to get a random element from an array
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const antennas = useSelector(state => state.avatarParts.antennas);
  const antennasArr = Object.values(antennas);

  const backgrounds = useSelector(state => state.avatarParts.backgrounds);
  const backgroundsArr = Object.values(backgrounds);

  const ears = useSelector(state => state.avatarParts.ears);
  const earsArr = Object.values(ears);

  const eyes = useSelector(state => state.avatarParts.eyes);
  const eyesArr = Object.values(eyes);

  const heads = useSelector(state => state.avatarParts.heads);
  const headsArr = Object.values(heads);

  const mouths = useSelector(state => state.avatarParts.mouths);
  const mouthsArr = Object.values(mouths);

  const necks = useSelector(state => state.avatarParts.necks);
  const necksArr = Object.values(necks);

  const noses = useSelector(state => state.avatarParts.noses);
  const nosesArr = Object.values(noses);



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
    setErrorFetchingAvatar(false);
    setAvatarParts({
      backgroundId: getRandomElement(Object.values(backgrounds)).id,
      antennaId: getRandomElement(Object.values(antennas)).id,
      headId: getRandomElement(Object.values(heads)).id,
      eyeId: getRandomElement(Object.values(eyes)).id,
      earId: getRandomElement(Object.values(ears)).id,
      noseId: getRandomElement(Object.values(noses)).id,
      mouthId: getRandomElement(Object.values(mouths)).id,
      neckId: getRandomElement(Object.values(necks)).id,
      userId: user.id
    })
  }

  // const displayParts = useMemo(() => {
  //   switch (selectedPart) {
  //     case "head": {
  //       return headsArr;
  //     }

  //     case "eye": {
  //       return eyesArr;
  //     }
  //     case "nose": {
  //       return nosesArr;
  //     }
  //     case "mouth": {
  //       return mouthsArr;
  //     }
  //     case "ear": {
  //       return earsArr;
  //     }
  //     case "antenna": {
  //       return antennasArr;
  //     }
  //     case "neck": {
  //       return necksArr;
  //     }
  //     case "background": {
  //       return backgroundsArr;
  //     }
  //     default:
  //       return [];
  //   }
  // }, [selectedPart, headsArr, eyesArr, nosesArr, mouthsArr, earsArr, antennasArr, necksArr, backgroundsArr]);

  // console.log("Display Parts:", displayParts());
  // console.log("Display Parts Keys:", Object.keys(displayParts()));
  // console.log("Display Parts Values:", Object.values(displayParts()));

  const handlePartItemClick = (partItem) => {
    setActivePartItem(partItem); //Set active part item
    setAvatarParts(prev => ({
      ...prev,
      [`${selectedPart}Id`]: partItem.id
    }));
  };


  const handleSaveAvatar = () => {
    if (userAvatar && Object.keys(userAvatar).length > 0) {
      dispatch(updateExistingAvatar(parseInt(userAvatar.id), avatarParts))
      closeModal();

    } else {

      dispatch(createNewAvatar(avatarParts))
      closeModal();
    }
  }

  const handleDeleteAvatar = () => {
    if (Object.keys(userAvatar).length > 0) {
      dispatch(deleteExistingAvatar(parseInt(userAvatar.id)));


      setErrorFetchingAvatar(true);
      closeModal();

    }
  }

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
    <div className="avatar-landing-page">
      <div className="avatar-landing-page-header">
        <div className="welcome-text">
          <h2>Welcome, {user.username}</h2>
          <h4>Level {user.level}</h4>
        </div>
        {userAvatar && Object.keys(userAvatar).length > 0 && (
          <h4 className="delete-avatar" onClick={handleDeleteAvatar}>Delete Avatar</h4>
        )}
      </div>
      <div className="avatar-container">
        {errorFetchingAvatar ? (
          <>
            <img src={avatarDefaultUrl} className="default-avatar" />
          </>
        ) : (
          <>
            <img src={getPartImageUrl("background", avatarParts.backgroundId)} className="avatar-background" />
            <img src={getPartImageUrl("antenna", avatarParts.antennaId)} className="avatar-antenna" />
            <img src={getPartImageUrl("head", avatarParts.headId)} className="avatar-head" />
            <img src={getPartImageUrl("eyes", avatarParts.eyeId)} className="avatar-eyes" />
            <img src={getPartImageUrl("ears", avatarParts.earId)} className="avatar-ears" />
            <img src={getPartImageUrl("nose", avatarParts.noseId)} className="avatar-nose" />
            <img src={getPartImageUrl("mouth", avatarParts.mouthId)} className="avatar-mouth" />
            <img src={getPartImageUrl("neck", avatarParts.neckId)} className="avatar-neck" />
          </>
        )}
      </div>
      <h4 className="auto-gen-avatar" onClick={generateAvatar}>Generate New Avatar</h4>
      <div className="selection-menu">
        <div className="menu">
          <div className={`selection-item ${selectedPart === "head" ? "selected" : ""}`} onClick={() => { setSelectedPart("head") }}>
            <img src={headSelectionUrl} className="menu-head" alt="Head" />
            <h2>Head</h2>
          </div>
          <div onClick={() => setSelectedPart("eye")} className={`selection-item ${selectedPart === "eye" ? "selected" : ""}`} >
            <img src={eyesSelectionUrl} className="menu-eyes" alt="Eyes" />
            <h2>Eyes</h2>
          </div>

          <div className={`selection-item ${selectedPart === "nose" ? "selected" : ""}`} onClick={() => setSelectedPart("nose")}>
            <img src={noseSelectionUrl} className="menu-nose" alt="Nose" />
            <h2>Nose</h2>
          </div>

          <div className={`selection-item ${selectedPart === "mouth" ? "selected" : ""}`} onClick={() => setSelectedPart("mouth")}>
            <img src={mouthSelectionUrl} className="menu-mouth" alt="Mouth" />
            <h2>Mouth</h2>
          </div>

          <div className={`selection-item ${selectedPart === "ear" ? "selected" : ""}`} onClick={() => setSelectedPart("ear")}>
            <img src={earsSelectionUrl} className="menu-ears" alt="Ears" />
            <h2>Ears</h2>
          </div>

          <div className={`selection-item ${selectedPart === "antenna" ? "selected" : ""}`} onClick={() => setSelectedPart("antenna")}>
            <img src={antennaSelectionUrl} className="menu-antenna" alt="Antenna" />
            <h2>Antenna</h2>
          </div>

          <div className={`selection-item ${selectedPart === "neck" ? "selected" : ""}`} onClick={() => setSelectedPart("neck")}>
            <img src={neckSelectionUrl} className="menu-neck" alt="Neck" />
            <h2>Neck</h2>
          </div>

          <div className={`selection-item ${selectedPart === "background" ? "selected" : ""}`} onClick={() => setSelectedPart("background")}>
            <img src={backgroundSelectionUrl} className="menu-background" alt="Background" />
            <h2>Background</h2>
          </div>

        </div>

        {/* Display Head Options */}
        {selectedPart === "head" && (
          <div className="parts-list">
            {headsArr.map(part => (
              <div key={part.id}
                className={`part-item ${activePartItem === part ? "active-part-item" : ""}`}
                onClick={() => handlePartItemClick(part)}>
                <img src={part?.imgUrl} alt={part} />
              </div>
            ))}

          </div>
        )}

        {/* Display Eye Options */}
        {selectedPart === "eye" && (
          <div className="parts-list">
            {eyesArr.map(part => (
              <div key={part.id}
                className={`part-item ${activePartItem === part ? "active-part-item" : ""}`}
                onClick={() => handlePartItemClick(part)}>
                <img src={part?.imgUrl} alt={part} />
              </div>
            ))}

          </div>

        )}

        {/* Display Nose Options */}
        {selectedPart === "nose" && (
          <div className="parts-list">
            {nosesArr.map(part => (
              <div key={part.id}
                className={`part-item ${activePartItem === part ? "active-part-item" : ""}`}
                onClick={() => handlePartItemClick(part)}>
                <img src={part?.imgUrl} alt={part} />
              </div>
            ))}

          </div>
        )}

        {/* Display Mouth Options */}
        {selectedPart === "mouth" && (
          <div className="parts-list">
            {mouthsArr.map(part => (
              <div key={part.id}
                className={`part-item ${activePartItem === part ? "active-part-item" : ""}`}
                onClick={() => handlePartItemClick(part)}>
                <img src={part?.imgUrl} alt={part} />
              </div>
            ))}

          </div>
        )}

        {/* Display Ear Options */}
        {selectedPart === "ear" && (
          <div className="parts-list">
            {earsArr.map(part => (
              <div key={part.id}
                className={`part-item ${activePartItem === part ? "active-part-item" : ""}`}
                onClick={() => handlePartItemClick(part)}>
                <img src={part?.imgUrl} alt={part} />
              </div>
            ))}

          </div>
        )}

        {/* Display Antenna Options */}
        {selectedPart === "antenna" && (
          <div className="parts-list">
            {antennasArr.map(part => (
              <div key={part.id}
                className={`part-item ${activePartItem === part ? "active-part-item" : ""}`}
                onClick={() => handlePartItemClick(part)}>
                <img src={part?.imgUrl} alt={part} />
              </div>
            ))}

          </div>
        )}

        {/* Display Neck Options */}
        {selectedPart === "neck" && (
          <div className="parts-list">
            {necksArr.map(part => (
              <div key={part.id}
                className={`part-item ${activePartItem === part ? "active-part-item" : ""}`}
                onClick={() => handlePartItemClick(part)}>
                <img src={part?.imgUrl} alt={part} />
              </div>
            ))}

          </div>
        )}

        {/* Display Background Options */}
        {selectedPart === "background" && (
          <div className="parts-list">
            {backgroundsArr.map(part => (
              <div key={part.id}
                className={`part-item ${activePartItem === part ? "active-part-item" : ""}`}
                onClick={() => handlePartItemClick(part)}>
                <img src={part?.imgUrl} alt={part} />
              </div>
            ))}

          </div>
        )}

      </div>
      <button className="save-button" onClick={handleSaveAvatar}>Save</button>
    </div>
  )
}

export default AvatarModal;
