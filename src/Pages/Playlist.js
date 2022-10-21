import React, { createContext, useContext, useEffect, useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import IconButton from "@mui/material/IconButton";
import { BsPauseCircleFill, BsPlay } from "react-icons/bs";
import SongList from "./Data";
import "./playlist.css";
import "./audio.css";
import { useDispatch, useSelector } from "react-redux";
import { audioActions } from "../Redux/Features/audioSlice";
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import "../Components/footer.css"
import { changing2_true_Func, changing2_false_Func } from '../Redux/changeIconState/changeIconApiCall';



import { DataContext } from "../Context/DataProvider";


// export const ContextIconsPlay = createContext();
// export const AudioContext = React.createContext();

const Playlist = ({ value }) => {
  //  context 
  const { iconss, setIconsToggle } = useContext(DataContext)
  // const [toggleicons, settoggleIcons] = useState(iconss);


  const dispatch = useDispatch();

  const matchedIcons = useSelector((state) => state.audio.currentAudio);


  // const matched = JSON.stringify(matchedIcons)

  const matched = JSON.parse(JSON.stringify(matchedIcons[0].id));


  const [songList, setSongsList] = useState(SongList);
  const [icons, setIcons] = useState(false);


  const sendAudio = (id) => {
    const i = songList.find((song) => song.id == id);

    dispatch(audioActions(i));
  };

  // play and pause icons change
  // const playAndPauseIconSongs =(songsId,state)=>{
  //   dispatch(audioActions(songsId,state))
  // }

  // chnageIcons status

  const changeStatus = () => {
    // settoggleIcons(!toggleicons)
    // const toggle = () => setIsOpen(!isOpen );
    setIconsToggle(!iconss);

    if (iconss == false) {
      dispatch(changing2_true_Func());
    } else if (iconss == true) {
      dispatch(changing2_false_Func());
    }

  }

  const ply_value = useSelector((state) => state.icns.ply);

  const [ply_state, set_ply_state] = useState(null);

  useEffect(() => {
    set_ply_state(ply_value);
  }, [ply_value])


  return (
    <>
      <div className="w-[80vw] w426 lg:w-[80vw]  relative mdplaylist playlistAudio bg-[#f6f6f6] flex justify-center items-center">
        <div className="flex flex-col gap-3 playlistw90vw overflow-auto playlisth lg:h-[500px] md:h-[400px] h-[380px] lg:w-[80vw] md:w-[70vw]">
          {songList.map((songs, i) => {
            return (
              <>
                <div
                  key={i}
                  className=" w-full flex lg:px-5  cursor-pointer justify-center "
                  // onClick={() => { sendAudio(songs.id); playAndPauseIconSongs(songs.id);}}
                  onClick={() => {
                    sendAudio(songs.id);
                    changeStatus()
                  }}
                >
                  <div className="w-[20vw] flex playlistw lg:w-[10vw] md:w-[10vw] playlist20vw  pr-[10px]  justify-center items-center center bg-[#8080802e]">
                    <IconButton
                      className=""
                      // className="circlePlaylist w-[30px] h-[30px]"
                      color="primary"
                      aria-label="add to shopping cart"
                    >
                      {/* {matched == songs.id ? (
                          <BsPauseCircleFill />
                        ) : (
                          <PlayCircleOutlineIcon />
                        )} */}
                      {ply_state && (matched == songs.id) ? (
                        <BsPauseCircleFill className="circle"/>

                      ) : (
                        <PlayCircleOutlineIcon />

                      )}
                    </IconButton>
                  </div>
                  {/*  */}
                  <div className="w-[70vw] playlist70vw relative lg:w-[70vw] bg-[#8080802e]">
                    <p className="font-bold text-[12px] lg:pl-[15px] lg:p-1">
                      {songs.title}
                    </p>
                    <p className="text-[10px] lg:p-1 lg:pl-[15px] ">
                      {songs.artistName}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Playlist;

// export {AudioProvider}


