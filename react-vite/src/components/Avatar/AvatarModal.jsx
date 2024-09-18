// import { useModal } from '../../context/Modal';
import { useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAvatarAntennas, getAvatarBackgrounds, getAvatarEars, getAvatarEyes, getAvatarHeads, getAvatarMouths, getAvatarNecks, getAvatarNoses } from '../../redux/avatarpart';
import "./AvatarModal.css"



function AvatarModal() {
  const dispatch = useDispatch();
  const [avatarParts, setAvatarParts] = useState({});
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
      <button className="auto-gen-button" onClick={generateAvatar}>Generate</button>
    </div>
  )
}

export default AvatarModal;