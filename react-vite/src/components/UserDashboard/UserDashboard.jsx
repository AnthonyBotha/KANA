import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getAvatarAntennas, getAvatarBackgrounds, getAvatarEars, getAvatarEyes, getAvatarHeads, getAvatarMouths, getAvatarNecks, getAvatarNoses } from "../../redux/avatarpart";

import "./UserDashboard.css";

function UserDashboard() {
  const dispatch = useDispatch();
  
  const sessionUser = useSelector(state => state.session.user);
  const avatar = useSelector(state => state.session.user.avatar);

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

  //All avatar parts
  const antennas = useSelector(state => state.avatarParts.antennas);
  const backgrounds = useSelector(state => state.avatarParts.backgrounds);
  const ears = useSelector(state => state.avatarParts.ears);
  const eyes = useSelector(state => state.avatarParts.eyes);
  const heads = useSelector(state => state.avatarParts.heads);
  const mouths = useSelector(state => state.avatarParts.mouths);
  const necks = useSelector(state => state.avatarParts.necks);
  const noses = useSelector(state => state.avatarParts.noses);

  //Current user avatar items
  const antenna = avatar.antennaId;
  const background = avatar.backgroundId;
  const ear = avatar.earId;
  const eye = avatar.eyeId;
  const head = avatar.headId;
  const mouth = avatar.mouthId;
  const neck = avatar.neckId;
  const nose = avatar.noseId;

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
            <img src={getPartImageUrl("antenna", antenna)} className="avatar-antenna" />
            <img src={getPartImageUrl("background", background)} className="avatar-background" />
            <img src={getPartImageUrl("ear", ear)} className="avatar-ear" />
            <img src={getPartImageUrl("eye", eye)} className="avatar-eye" />
            <img src={getPartImageUrl("head", head)} className="avatar-head" />
            <img src={getPartImageUrl("mouth", mouth)} className="avatar-mouth" />
            <img src={getPartImageUrl("neck", neck)} className="avatar-neck" />
            <img src={getPartImageUrl("nose", nose)} className="avatar-nose" />
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
    </div>
  )
}

export default UserDashboard;