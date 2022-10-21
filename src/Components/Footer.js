import React, { useContext, useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
// import { AudioContext } from "../Pages/Playlist";
import { AudioContext } from "../App";
import { audioActions } from "../Redux/Features/audioSlice";
import "./footer.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { BsPlayCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import { changing_true_Func, changing_false_Func, changing2_true_Func, changing2_false_Func } from '../Redux/changeIconState/changeIconApiCall'

const Footer = ({ changePlay }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.audio.currentAudio);
  // const selectorId =useSelector((state)=> state.audio.currentAudioId)
  const AllAudios = useSelector((state) => state.audio.audios);
  // const [url, setUrl] = useState(selector[0].fileUrl)

  // const [index, setIndex] =useState(0)
  const [current, setCurrent] = useState(selector[0]);

  const sendAudio = (id) => {
    const i = AllAudios.find((song) => id == song.id);
    dispatch(audioActions(i));
  };

  const previousSong = () => {
    const previousSong = AllAudios.find(
      (audio) => Number(audio.id) === Number(selector[0].id) - 1
    );
    sendAudio(previousSong.id);
  };

  const ended = () => {
    // setIndex(index + 1)
    const nextAudio = AllAudios.find(
      (audio) => Number(audio.id) === Number(selector[0].id) + 1
    );
    sendAudio(nextAudio.id);
  };

  const onPlayFunc = (idofplay) => {
    dispatch(changing_true_Func())
    // dispatch(changing2_true_Func())
    dispatch(changing2_true_Func())

    changePlay(true)
    // dispatch(audioActions(idofplay));
  };
  const onPauseFunc = (idofpause) => {
    dispatch(changing_false_Func())
    // dispatch(changing_false_Func())
    dispatch(changing2_false_Func())

    changePlay(false)
    // dispatch(audioActions( idofpause));
  };

  // const [playState, setplaystate] = useState(false);

  // togglePlaystate function
  const togglePlaystate = () => {
    // setplaystate(!playState);
  };

  // const audio = useContext(AudioContext);


  const playAll = (id) => {
    // const playallBtnAudio = AllAudios.find(
    //   (audio) => Number(audio.id) === Number(selector[0].id) +1
    // );
    // sendAudio(playallBtnAudio.id);

    const i = AllAudios.find((song) => id == song.id);
    dispatch(audioActions(i));
  };

  const plyFromPlaylist = useSelector((state) => state.icns.plyFromPlaylist);
  const ply_value = useSelector((state) => state.icns.ply);

  const playerRef = useRef();

  useEffect(() => {
    console.log(plyFromPlaylist, ply_value)
    if (plyFromPlaylist == true && ply_value == false) {
      playerRef.current.audio.current.play();
    } else if (plyFromPlaylist == false && ply_value == true) {
      playerRef.current.audio.current.pause();
    }
  }, [plyFromPlaylist])

  return (
    <>
      {/* play all icons */}
      <Tooltip title="Play All" >
        <div className="playallBtn rounded-full fixed right-[27px] w-[50px] h-[50px] bg-white bottom-[152px] z-50  ">
          <BsPlayCircleFill
            className="text-[#0069FF] fixed  circle cursor-pointer w-[50px] h-[50px] bottom-[152px] right-[27px]"
            onClick={() => {
              playAll(1);
            }}
          ></BsPlayCircleFill>
        </div>
      </Tooltip>
      {/* play all icons */}

      <div className=" h-[12vh] absolute bottom-0 w-full footermain  ">
        <div className="h-[12vh] lg:h-[12vh] lg:relative footer  relative z-30  md:relative songs">
          <div className="playlist">
            <AudioPlayer
              ref={playerRef}
              style={{ padding: "0px 15px", height: "12vh" }}
              src={selector[0].fileUrl}
              onPlay={(e) => {
                onPlayFunc(selector[0].id);
                togglePlaystate();
              }}
              // onPause={() => (onPauseFunc(selector[0].id ) ; func2();}}
              onEnded={ended}
              onPause={() => {
                onPauseFunc(selector[0].id);
                togglePlaystate();
              }}
              showSkipControls={true}
              onClickPrevious={previousSong}
              onClickNext={ended}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
