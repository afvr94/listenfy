import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { FC, useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { formatTime } from "../lib/formatters";
import { useStoreActions } from "../lib/store";
import { CustomSong } from "../types";

const Player: FC<{
  activeSongs: CustomSong[];
  activeSong: CustomSong | null;
}> = ({ activeSongs, activeSong }) => {
  const setActiveSong = useStoreActions((store) => store.changeActiveSong);
  const audioRef = useRef<ReactHowler | null>(null);
  const repeatRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [index, setIndex] = useState(
    !activeSong?.id
      ? 0
      : activeSongs.findIndex((song) => song.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    let timerId = 0;

    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(audioRef?.current?.seek() || 0);
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);

      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    setActiveSong(activeSongs[index]);
  }, [activeSongs, index, setActiveSong]);

  useEffect(() => {
    repeatRef.current = isRepeat;
  }, [isRepeat]);

  const handleSetIsPlaying = (value: boolean) => {
    setIsPlaying(value);
  };

  const onShuffle = () => {
    setIsShuffle((prevState) => !prevState);
  };

  const onRepeat = () => {
    setIsRepeat((prevState) => !prevState);
  };

  const onPrevSong = () => {
    setIndex((prevState) => {
      return prevState > 0 ? prevState - 1 : activeSongs.length - 1;
    });
  };

  const onNextSong = () => {
    setIndex((prevState) => {
      if (isShuffle) {
        const next = Math.floor(Math.random() * activeSongs.length);

        if (next === prevState) {
          onNextSong();
          return prevState;
        }
        return next;
      }
      return prevState === activeSongs.length - 1 ? 0 : prevState + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      audioRef?.current?.seek(0);
      return;
    }
    onNextSong();
  };

  const onLoad = () => {
    const songDuration = audioRef?.current?.duration();
    setDuration(songDuration || 0);
  };

  const onSeek = (value: number[]) => {
    setSeek(Number(value[0]));
    audioRef?.current?.seek(value[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={isPlaying}
          src={activeSong?.url || ""}
          ref={audioRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center>
        <ButtonGroup color="gray.600">
          <IconButton
            icon={<MdShuffle />}
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={isShuffle ? "white" : "gray.600"}
            onClick={onShuffle}
          />
          <IconButton
            icon={<MdSkipPrevious />}
            outline="none"
            variant="link"
            aria-label="previous"
            fontSize="24px"
            onClick={onPrevSong}
          />
          {isPlaying ? (
            <IconButton
              icon={<MdOutlinePauseCircleFilled />}
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              onClick={() => handleSetIsPlaying(false)}
            />
          ) : (
            <IconButton
              icon={<MdOutlinePlayCircleFilled />}
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              onClick={() => handleSetIsPlaying(true)}
            />
          )}
          <IconButton
            icon={<MdSkipNext />}
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            onClick={onNextSong}
          />
          <IconButton
            icon={<MdOutlineRepeat />}
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            color={isRepeat ? "white" : "gray.600"}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? Number(duration.toFixed(2)) : 0}
              id="player-range"
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
