//Action Types
const LOAD_AVATAR_HEADS = "avatars/LOAD_AVATAR_HEADS";
const LOAD_AVATAR_EYES = "avatars/LOAD_AVATAR_EYES";
const LOAD_AVATAR_MOUTHS = "avatars/LOAD_AVATAR_MOUTHS";
const LOAD_AVATAR_ANTENNAS = "avatars/LOAD_AVATAR_ANTENNAS";
const LOAD_AVATAR_NECKS = "avatars/LOAD_AVATAR_NECKS";
const LOAD_AVATAR_EARS = "avatars/LOAD_AVATAR_EARS";
const LOAD_AVATAR_NOSES = "avatars/LOAD_AVATAR_NOSES";
const LOAD_AVATAR_BACKGROUNDS = "avatars/LOAD_AVATAR_BACKGROUNDS";


//Action Creators
const loadAvatarHeads = (heads) => {
    return {
        type: LOAD_AVATAR_HEADS,
        payload: heads
    }
};

const loadAvatarEyes = (eyes) => {
    return {
        type: LOAD_AVATAR_EYES,
        payload: eyes
    }
};

const loadAvatarMouths = (mouths) => {
    return {
        type: LOAD_AVATAR_MOUTHS,
        payload: mouths
    }
};

const loadAvatarAntennas = (antennas) => {
    return {
        type: LOAD_AVATAR_ANTENNAS,
        payload: antennas
    }
};

const loadAvatarNecks = (necks) => {
    return {
        type: LOAD_AVATAR_NECKS,
        payload: necks
    }
};

const loadAvatarEars = (ears) => {
    return {
        type: LOAD_AVATAR_EARS,
        payload: ears
    }
};

const loadAvatarNoses = (noses) => {
    return {
        type: LOAD_AVATAR_NOSES,
        payload: noses
    }
};

const loadAvatarBackgrounds = (backgrounds) => {
    return {
        type: LOAD_AVATAR_BACKGROUNDS,
        payload: backgrounds
    }
};



//Thunks
export const getAvatarHeads = () => async (dispatch) => {
    const response = await fetch("/api/heads");

    if (response.ok) {
        const heads = await response.json();
        dispatch(loadAvatarHeads(heads));
    }
};

export const getAvatarEyes = () => async (dispatch) => {
    const response = await fetch("/api/eyes");

    if (response.ok) {
        const eyes = await response.json();
        dispatch(loadAvatarEyes(eyes));
    }
};

export const getAvatarMouths = () => async (dispatch) => {
    const response = await fetch("/api/mouths");

    if (response.ok) {
        const mouths = await response.json();
        dispatch(loadAvatarMouths(mouths));
    }
};

export const getAvatarAntennas = () => async (dispatch) => {
    const response = await fetch("/api/antennas");

    if (response.ok) {
        const antennas = await response.json();
        dispatch(loadAvatarAntennas(antennas));
    }
};

export const getAvatarNecks = () => async (dispatch) => {
    const response = await fetch("/api/necks");

    if (response.ok) {
        const necks = await response.json();
        dispatch(loadAvatarNecks(necks));
    }
};

export const getAvatarEars = () => async (dispatch) => {
    const response = await fetch("/api/ears");

    if (response.ok) {
        const ears = await response.json();
        dispatch(loadAvatarEars(ears));
    }
};

export const getAvatarNoses = () => async (dispatch) => {
    const response = await fetch("/api/noses");

    if (response.ok) {
        const noses = await response.json();
        dispatch(loadAvatarNoses(noses));
    }
};

export const getAvatarBackgrounds = () => async (dispatch) => {
    const response = await fetch("/api/background");

    if (response.ok) {
        const backgrounds = await response.json();
        dispatch(loadAvatarBackgrounds(backgrounds));
    }
};



//Reducer
const initialState = {
    heads:{},
    eyes:{},
    mouths:{},
    antennas:{},
    necks:{},
    ears:{},
    noses:{},
    backgrounds:{}
};

const avatarPartsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_AVATAR_HEADS: {
            const newState = { ...state, heads: {}};
            const headsArr = Object.values(action.payload);
            headsArr.forEach(head => newState.heads[head.id] = head);
            return newState;
        }
        case LOAD_AVATAR_EYES: {
            const newState = { ...state, eyes: {}};
            const eyesArr = Object.values(action.payload);
            eyesArr.forEach(eye => newState.eyes[eye.id] = eye);
            return newState;
        }
        case LOAD_AVATAR_MOUTHS: {
            const newState = { ...state, mouths: {}};
            const mouthsArr = Object.values(action.payload);
            mouthsArr.forEach(mouth => newState.mouths[mouth.id] = mouth);
            return newState;
        }
        case LOAD_AVATAR_ANTENNAS: {
            const newState = { ...state, antennas: {}};
            const antennasArr = Object.values(action.payload);
            antennasArr.forEach(antenna => newState.antennas[antenna.id] = antenna);
            return newState;
        }
        case LOAD_AVATAR_NECKS: {
            const newState = { ...state, necks: {}};
            const necksArr = Object.values(action.payload);
            necksArr.forEach(neck => newState.necks[neck.id] = neck);
            return newState;
        }
        case LOAD_AVATAR_EARS: {
            const newState = { ...state, ears: {}};
            const earsArr = Object.values(action.payload);
            earsArr.forEach(ear => newState.ears[ear.id] = ear);
            return newState;
        }
        case LOAD_AVATAR_NOSES: {
            const newState = { ...state, noses: {}};
            const nosesArr = Object.values(action.payload);
            nosesArr.forEach(nose => newState.noses[nose.id] = nose);
            return newState;
        }
        case LOAD_AVATAR_BACKGROUNDS: {
            const newState = { ...state, backgrounds: {}};
            const backgroundsArr = Object.values(action.payload);
            backgroundsArr.forEach(background => newState.backgrounds[background.id] = background);
            return newState;
        }
        default:
            return state;
    }
}

export default avatarPartsReducer;
