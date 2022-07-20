import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';

import MusicList from '../../../assets/data/MusicList.json';
// 后台可播放
// Sound.setCategory('Playback');
const basePath = "http://jaymusic.gitee.io/jaymusic";


const Home = () => {
  // 搜索value
  const [searchValue, setSearchValue] = useState('');
  // 列表填充项
  const [filteredMusicList, setFilteredMusicList] = useState(MusicList);
  // 是否在播放
  const [isPlay, setIsPlay] = useState(false);
  // 音频索引
  const index = useRef(0);
  // 当前音乐 Json对象
  const [currentSong, setCurrentSong] = useState(filteredMusicList[index.current]);
  // 当前音频对象
  const [music, setMusic] = useState(null)
  

  useEffect(() => {
    index.current = filteredMusicList.indexOf(currentSong);
  }, [filteredMusicList])

  //   监听搜索框得改变来改变列表展示数据
  useEffect(() => {
    //   过滤筛选原始列表数据，根据输入框输入得值
    const newMusicList = MusicList.filter(
      item => item.title.toLowerCase().includes(searchValue.toLowerCase()),
      // 转小写匹配输入的数据
    );
    setFilteredMusicList(newMusicList); // 更新填充数据
  }, [searchValue]);

  // 监听currentSong 改变音频对象
  useEffect(() => {
    const loadMusic = () => {
      let path = basePath + currentSong.path;
      let sound =  new Sound(path , null, (error) => {
        if(error) {
          console.log('加载失败！', error);
          return;
        }
        // 判断是否播放
        if(isPlay){
          sound.play();
        }
      });
      return sound;
    }
    setMusic(loadMusic())
  },[currentSong])
  
  const pickSong = (item) => {
    // 先停上首歌曲
    music.pause();
    setIsPlay(true);
    // 更行索引 与 音频 Json对象
    index.current = filteredMusicList.indexOf(item);
    setCurrentSong(filteredMusicList[index.current]);
  };

  // 上一首
  const prevSong = () => {
    music.pause();
    index.current  = index.current - 1;
    if(index.current < 0) {
      index.current = filteredMusicList.length - 1;
    }
    setCurrentSong(filteredMusicList[index.current]);
  };

  // 播放
  const playSong = () => {
    setIsPlay(!isPlay);
    music.play();
  }

  // 暂停
  const pauseSong = () => {
    setIsPlay(!isPlay);
    music.pause();
  };

  // 下一首
  const nextSong = () => {
    music.pause();
    index.current  = index.current + 1;
    if(index.current > filteredMusicList.length - 1) {
      index.current = 0;
    }
    setCurrentSong(filteredMusicList[index.current]);
  };


  return (
    <View style={styles.page}>
      <View style={{flex: 1, padding: 15}}>
        <TextInput
          value={searchValue}
          onChangeText={setSearchValue}
          style={styles.searchInput}
          placeholder="Search..."
        />
        <FlatList
          data={filteredMusicList}
          renderItem={({item}) => (
            <Pressable style={ styles.itemMusic } onPress={() => pickSong(item)}>
              <Text style={[styles.item1, { color: item === currentSong ? 'red' : 'black', }]}>{item.title}</Text>
              <Text style={styles.item2}>{item.author}</Text>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      <View style={styles.bottomBox}>
        <Pressable style={{top: 15, right: 40}} onPress={ () => prevSong() }>
          <Ionicons name="play-skip-back-outline" size={30} color={'white'} />
        </Pressable>
        <Pressable onPress={isPlay ? () => pauseSong() : () => playSong()}>
          {isPlay ? (
            <Image
              style={styles.mucsicImg}
              source={{
                uri: currentSong.pic,
              }}></Image>
          ) : (
            <Ionicons
              name="md-play-circle-outline"
              style={{top: 7.5}}
              size={45}
              color={'white'}
            />
          )}
        </Pressable>
        <Pressable style={{top: 15, left: 40}} onPress={() => nextSong()}>
          <Ionicons
            name="play-skip-forward-outline"
            size={30}
            color={'white'}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  itemMusic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item1: {
    fontSize: 16,
    color: 'black',
    marginVertical: 15,
    marginLeft: 10,
  },
  item2: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 16,
    marginRight: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  bottomBox: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    borderRadius: 10,
    backgroundColor: 'black',
    opacity: 0.7,
    justifyContent: 'center',
  },
  mucsicImg: {
    top: 7.5,
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Home;
