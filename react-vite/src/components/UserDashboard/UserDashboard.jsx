import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAvatar } from "../../redux/avatar";
import { getAvatarAntennas, getAvatarBackgrounds, getAvatarEars, getAvatarEyes, getAvatarHeads, getAvatarMouths, getAvatarNecks, getAvatarNoses } from "../../redux/avatarpart";

import "./UserDashboard.css";
import EquipedItems from "./EquipedItems";

function UserDashboard() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const avatar = useSelector(state => state.avatar);

  const [userAvatar] = Object.values(avatar).filter(avatar => avatar.userId === sessionUser.id);

  const avatarDefaultUrl = "https://res.cloudinary.com/dmg8yuivs/image/upload/v1727241517/user_inui1g.png";



  useEffect(() => {
    dispatch(getAvatar())
    dispatch(getAvatarAntennas());
    dispatch(getAvatarBackgrounds());
    dispatch(getAvatarEars());
    dispatch(getAvatarEyes());
    dispatch(getAvatarHeads());
    dispatch(getAvatarMouths());
    dispatch(getAvatarNecks());
    dispatch(getAvatarNoses());
  }, [dispatch]);



  //All avatar parts
  const antennas = useSelector(state => state.avatarParts.antennas);
  const backgrounds = useSelector(state => state.avatarParts.backgrounds);
  const ears = useSelector(state => state.avatarParts.ears);
  const eyes = useSelector(state => state.avatarParts.eyes);
  const heads = useSelector(state => state.avatarParts.heads);
  const mouths = useSelector(state => state.avatarParts.mouths);
  const necks = useSelector(state => state.avatarParts.necks);
  const noses = useSelector(state => state.avatarParts.noses);

  //Get part images
  const getPartImageUrl = (partType, partId) => {
    const parts = {
      antenna: antennas,
      background: backgrounds,
      ear: ears,
      eye: eyes,
      head: heads,
      mouth: mouths,
      neck: necks,
      nose: noses
    };

    const partArray = Object.values(parts[partType] || {});
    const part = partArray.find(part => part.id === partId)

    return part ? part.imgUrl : "";
  }


  return (
    <div>
      {/* user dashboard */}
      <div className="displayFlex leftPageBorder rightPageBorder spaceBetween topPadding">
        {/* Avatar */}

        <div className="avatar-container littleRightMargin lightDropShadow">
          {userAvatar && Object.values(userAvatar).length > 0 ? (
            <>
              <img src={getPartImageUrl("antenna", userAvatar.antennaId)} className="avatar-antenna" />
              <img src={getPartImageUrl("background", userAvatar.backgroundId)} className="avatar-background" />
              <img src={getPartImageUrl("ear", userAvatar.earId)} className="avatar-ear" />
              <img src={getPartImageUrl("eye", userAvatar.eyeId)} className="avatar-eye" />
              <img src={getPartImageUrl("head", userAvatar.headId)} className="avatar-head" />
              <img src={getPartImageUrl("mouth", userAvatar.mouthId)} className="avatar-mouth" />
              <img src={getPartImageUrl("neck", userAvatar.neckId)} className="avatar-neck" />
              <img src={getPartImageUrl("nose", userAvatar.noseId)} className="avatar-nose" />
            </>

          ) : (

          <>
            <img src={avatarDefaultUrl} className="default-avatar" />
          </>

          )}

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
          <p className="whiteFont"><EquipedItems sessionUser={sessionUser}/></p>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;
