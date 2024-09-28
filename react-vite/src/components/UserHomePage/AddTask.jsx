import { useState, useEffect, useRef } from "react";
import { useModal } from "../../context/Modal";
import CreateRewardModal from "../Rewards/CreateRewardModal";
import CreateTaskModal from "../CreateTaskModal";
import "./AddTask.css"

function AddTask(){
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const { setModalContent} = useModal()

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    // const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenuOnClickOutside = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)){
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenuOnClickOutside);

        return () => document.removeEventListener("click", closeMenuOnClickOutside)
    }, [showMenu]);

    return (
        <div className="add-task-container">
            <button className="add-task-button" onClick={toggleMenu}>
                Add Task
            </button>
            {showMenu && (
                <ul className="task-dropdown" ref={ulRef}>
                    <li className="task-option"  onClick={() => {
                            setModalContent(<CreateTaskModal taskType={'Habit'}/>)
                            setShowMenu(false)
                        }}>Add Habit</li>
                    <li className="task-option"
                        onClick={() => {
                            setModalContent(<CreateTaskModal taskType={'Daily'}/>)
                            setShowMenu(false)
                        }}
                    >Add Daily
                    </li>
                    <li className="task-option"
                        onClick={() => {
                            setModalContent(<CreateTaskModal taskType={'Todo'}/>)
                            setShowMenu(false)
                        }}
                    >Add To Do</li>
                    <li className="task-option" onClick={() => setModalContent(<CreateRewardModal />)}>Add Reward</li>
                </ul>
            )}
        </div>
    );
}

export default AddTask;
